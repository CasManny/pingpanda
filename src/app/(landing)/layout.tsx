import Navbar from "../../components/navbar"

interface LandingLayoutProps {
  children: React.ReactNode
}

const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default LandingLayout
