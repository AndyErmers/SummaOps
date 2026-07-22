// Twilio WhatsApp webhook -> Sonilux AI bot.
//
// Flow: Twilio posts an incoming WhatsApp message here -> we look up (or
// create) the customer + conversation in Supabase -> ask Claude Haiku to
// draft a reply using the product catalog + conversation history as context
// -> send the reply back through Twilio -> log both messages.
//
// Required secrets (set via Supabase dashboard -> Edge Functions -> Secrets):
//   TWILIO_ACCOUNT_SID
//   TWILIO_AUTH_TOKEN
//   TWILIO_WHATSAPP_FROM      e.g. "+14155238886" (Twilio sandbox number, no "whatsapp:" prefix)
//   ANTHROPIC_API_KEY
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are injected automatically.

import { createClient } from "npm:@supabase/supabase-js@2";

const TWILIO_ACCOUNT_SID = Deno.env.get("TWILIO_ACCOUNT_SID")!;
const TWILIO_AUTH_TOKEN = Deno.env.get("TWILIO_AUTH_TOKEN")!;
const TWILIO_WHATSAPP_FROM = Deno.env.get("TWILIO_WHATSAPP_FROM")!;
const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const MODEL = "claude-haiku-4-5-20251001";
const MAX_HISTORY_MESSAGES = 20;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

function stripWhatsappPrefix(value: string) {
  return value.replace(/^whatsapp:/i, "");
}

async function verifyTwilioSignature(req: Request, rawBody: string): Promise<boolean> {
  const signature = req.headers.get("X-Twilio-Signature");
  if (!signature) return false;

  const params = new URLSearchParams(rawBody);
  const sortedKeys = [...params.keys()].sort();
  let data = req.url;
  for (const key of sortedKeys) {
    data += key + params.get(key);
  }

  const keyData = new TextEncoder().encode(TWILIO_AUTH_TOKEN);
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-1" },
    false,
    ["sign"],
  );
  const mac = await crypto.subtle.sign("HMAC", cryptoKey, new TextEncoder().encode(data));
  const expected = btoa(String.fromCharCode(...new Uint8Array(mac)));

  return expected === signature;
}

async function fetchActiveProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("name, short_description, price_per_day, stock_quantity, product_categories(name)")
    .eq("is_active", true)
    .order("name");

  if (error) {
    console.error("[whatsapp-webhook] products query failed:", error);
    return [];
  }
  return data ?? [];
}

function buildSystemPrompt(products: Awaited<ReturnType<typeof fetchActiveProducts>>) {
  const catalogLines = products
    .map((p) => {
      const category = (p as any).product_categories?.name ?? "Overig";
      return `- ${p.name} (${category}): ${p.short_description ?? ""} — €${p.price_per_day}/dag, voorraad: ${p.stock_quantity}`;
    })
    .join("\n");

  return `Je bent de WhatsApp-assistent van Sonilux, een verhuurbedrijf voor LED-verlichting, statafels en eventmateriaal in Limburg, Nederland.

Beschikbare producten (alleen actief/op voorraad):
${catalogLines}

Regels:
- Antwoord kort, vriendelijk en to-the-point, in het Nederlands, passend bij WhatsApp (geen lange lappen tekst).
- Beantwoord vragen over producten, prijzen, beschikbaarheid en het huurproces op basis van bovenstaande lijst.
- Verzin nooit prijzen of producten die niet in de lijst staan.
- Je maakt zelf GEEN offerte of boeking aan. Als een klant concreet iets wil huren of boeken, verwijs ze vriendelijk naar het offerteformulier op de website, of zeg dat een medewerker het verder oppakt.
- Als je het antwoord niet zeker weet, geef dat eerlijk aan en bied aan dat een medewerker terugkomt.`;
}

async function callClaude(systemPrompt: string, history: { direction: string; content: string | null }[]) {
  const messages = history
    .filter((m) => m.content)
    .map((m) => ({
      role: m.direction === "inbound" ? "user" : "assistant",
      content: m.content as string,
    }));

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 400,
      system: systemPrompt,
      messages,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Anthropic API error ${res.status}: ${text}`);
  }

  const json = await res.json();
  const textBlock = json.content?.find((b: any) => b.type === "text");
  return textBlock?.text?.trim() || "Bedankt voor je bericht! Een medewerker neemt zo snel mogelijk contact met je op.";
}

async function sendWhatsappReply(to: string, body: string) {
  const auth = btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`);
  const params = new URLSearchParams({
    From: `whatsapp:${TWILIO_WHATSAPP_FROM}`,
    To: `whatsapp:${to}`,
    Body: body,
  });

  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
    {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        authorization: `Basic ${auth}`,
      },
      body: params,
    },
  );

  const json = await res.json();
  if (!res.ok) {
    console.error("[whatsapp-webhook] Twilio send failed:", json);
    throw new Error(`Twilio send failed: ${json.message ?? res.status}`);
  }
  return json.sid as string;
}

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const rawBody = await req.text();

  const validSignature = await verifyTwilioSignature(req, rawBody);
  if (!validSignature) {
    console.error("[whatsapp-webhook] Invalid Twilio signature");
    return new Response("Invalid signature", { status: 403 });
  }

  const params = new URLSearchParams(rawBody);
  const from = params.get("From");
  const body = params.get("Body");
  const profileName = params.get("ProfileName");

  if (!from || !body) {
    return new Response("Missing From/Body", { status: 400 });
  }

  const phone = stripWhatsappPrefix(from);

  try {
    let { data: customer } = await supabase
      .from("customers")
      .select("id")
      .or(`whatsapp_number.eq.${phone},phone.eq.${phone}`)
      .limit(1)
      .maybeSingle();

    if (!customer) {
      const { data: newCustomer, error } = await supabase
        .from("customers")
        .insert({
          name: profileName || phone,
          phone,
          whatsapp_number: phone,
          source: "whatsapp",
        })
        .select("id")
        .single();
      if (error) throw error;
      customer = newCustomer;
    }

    let { data: conversation } = await supabase
      .from("conversations")
      .select("id, status")
      .eq("whatsapp_number", phone)
      .neq("status", "gesloten")
      .order("last_message_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!conversation) {
      const { data: newConversation, error } = await supabase
        .from("conversations")
        .insert({ customer_id: customer.id, whatsapp_number: phone, status: "open" })
        .select("id, status")
        .single();
      if (error) throw error;
      conversation = newConversation;
    }

    await supabase.from("messages").insert({
      conversation_id: conversation.id,
      direction: "inbound",
      sender_type: "klant",
      content: body,
    });

    // A human took over this conversation: log the message but stay quiet.
    if (conversation.status === "wacht_op_mens") {
      await supabase
        .from("conversations")
        .update({ last_message_at: new Date().toISOString() })
        .eq("id", conversation.id);
      return new Response("OK (waiting for human)", { status: 200 });
    }

    const { data: history } = await supabase
      .from("messages")
      .select("direction, content")
      .eq("conversation_id", conversation.id)
      .order("created_at", { ascending: false })
      .limit(MAX_HISTORY_MESSAGES);

    const orderedHistory = (history ?? []).reverse();
    const products = await fetchActiveProducts();
    const systemPrompt = buildSystemPrompt(products);
    const reply = await callClaude(systemPrompt, orderedHistory);
    const messageSid = await sendWhatsappReply(phone, reply);

    await supabase.from("messages").insert({
      conversation_id: conversation.id,
      direction: "outbound",
      sender_type: "bot",
      content: reply,
      whatsapp_message_id: messageSid,
    });

    await supabase
      .from("conversations")
      .update({ last_message_at: new Date().toISOString() })
      .eq("id", conversation.id);

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("[whatsapp-webhook] Unhandled error:", err);
    return new Response("Internal error", { status: 500 });
  }
});
