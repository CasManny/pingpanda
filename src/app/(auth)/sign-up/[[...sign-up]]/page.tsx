import { SignUp } from "@clerk/nextjs"

const SignupPage = () => {
  return (
    <SignUp fallbackRedirectUrl={"/welcome"} forceRedirectUrl={"/welcome"} />
  )
}

export default SignupPage
