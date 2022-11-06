import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const PageHeading = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  return (
    <h1 className="font-semibold tracking-wide text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
      <Link
        href={{ pathname: router.pathname, query: { slug: router.query.slug } }}
      >
        {children}
      </Link>
    </h1>
  )
}
