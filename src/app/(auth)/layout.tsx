import Navbar from "../../components/navbar"

interface LandingLayoutProps {
  children: React.ReactNode
}

const AuthLayout = ({ children }: LandingLayoutProps) => {
  return (
    <>
      <Navbar />
      <div className="w-full h-screen flex items-center justify-center">{children}</div>
    </>
  )
}

export default AuthLayout
