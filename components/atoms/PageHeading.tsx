import Link from 'next/link'

export const PageHeading = ({ children }: { children: React.ReactNode }) => (
  <h1 className="font-semibold tracking-wide text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
    <Link href="#" legacyBehavior>
      {children}
    </Link>
  </h1>
)
