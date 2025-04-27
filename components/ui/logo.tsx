import Link from "next/link"

interface LogoProps {
  size?: "small" | "medium" | "large"
  withTagline?: boolean
}

export default function Logo({ size = "medium", withTagline = false }: LogoProps) {
  const sizeClasses = {
    small: "text-2xl",
    medium: "text-2xl mb-1",
    large: "text-6xl md:text-7xl",
  }

  const mainDomain = process.env.NEXT_PUBLIC_MAIN_DOMAIN || "https://scholarly.world"

  return (
    <h2 className={`flex font-serif ${sizeClasses[size]} font-semibold tracking-tight`} style={{ fontFamily: "var(--font-serif)" }}>
      <Link href={mainDomain}>
        Scholarly
      </Link>
      {withTagline && (
        <Link href="/" className="ml-1">
          <span className="text-muted-foreground">Info</span>
        </Link>
      )}
    </h2>
  )
}