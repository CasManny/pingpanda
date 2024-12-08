"use client"
import { SignIn } from "@clerk/nextjs"
import { useSearchParams } from "next/navigation"
const Signinpage = () => {
  const searchParams = useSearchParams()
  const intent = searchParams.get("intent")

  return (
    <SignIn
      forceRedirectUrl={intent ? `/dashboard?intent=${intent}` : "/dashboard"}
    />
  )
}

export default Signinpage
