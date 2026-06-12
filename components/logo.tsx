import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

const LOGO = {
  src: "/sonilux-logo.png",
  width: 310,
  height: 272,
  alt: "Sonilux Verhuur",
} as const

type LogoProps = {
  className?: string
  size?: "header" | "footer"
}

export function Logo({ className, size = "header" }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex shrink-0 transition-opacity hover:opacity-90",
        className,
      )}
      aria-label="Sonilux home"
    >
      <Image
        src={LOGO.src}
        alt={LOGO.alt}
        width={LOGO.width}
        height={LOGO.height}
        priority={size === "header"}
        className={cn(
          "w-auto object-contain mix-blend-screen",
          size === "header" ? "h-16 sm:h-[4.25rem]" : "h-20 sm:h-24",
        )}
      />
    </Link>
  )
}
