import React from "react"
import MaxWidthWrapper from "../../components/max-width-wrapper"
import Heading from "../../components/heading"
import { Check } from "lucide-react"
import ShinyButton from "../../components/shiny-button"
import MockDiscordUi from "../../components/mock-discord-ui"
import { AnimatedList, AnimatedListItem } from "@/components/ui/animated-list"
import DiscordMessage from "@/components/discord-message"

const page = () => {
  return (
    <>
      <section className="relative py-24 sm:py-32 bg-brand-25">
        <MaxWidthWrapper className="text-center">
          <div className="relative mx-auto text-center flex flex-col items-center gap-10">
            <div className="">
              <Heading>
                <span>Real Time Saas Insights</span>
                <br />
                <span className="relative bg-gradient-to-r from-brand-700 to-brand-800 bg-clip-text text-transparent">
                  Delivered to your Discord
                </span>
              </Heading>
            </div>
            <p className="text-base/7 text-gray-600 max-w-prose text-center text-pretty">
              Pingpanda is the easiest way to monitor your Saas. Get Instant
              notification for{" "}
              <span className="font-semibold text-gray-700">
                sales, new users, or any other event
              </span>{" "}
              sent directly to your Discord
            </p>
            <ul className="space-y-2 text-base/7 text-gray-600 text-left flex-col items-center sm:items-start">
              {[
                "Real Time Discord alerts for critical events",
                "Buy ones, use forever",
                "Track sales, new users, or any other event",
              ].map((item, index) => (
                <li key={index} className="flex gap-1.5 items-center text-left">
                  <Check className="size-5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="w-full max-w-80">
              <ShinyButton
                href="/sign-up"
                className="relative z-10 h-14 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl"
              >
                Start for free Today
              </ShinyButton>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
      <section className="relative bg-brand-25 pb-4">
        <div className="absolute inset-x-0 bottom-24 top-24 bg-brand-700" />
        <div className="relative mx-auto">
          <MaxWidthWrapper>
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-xl lg:p-4">
              <MockDiscordUi>
                <AnimatedList>
                  <DiscordMessage
                    avatarSrc="/brand-asset-profile-picture.png"
                    avatarAlt="pingpanda avatar"
                    username="PingPanda"
                    timestamp="Today at 12:35PM"
                    badgeText="Sign Up"
                    badgeColor="#43B581"
                    title="👨🏾‍💻 New user signed up"
                    content={{
                      name: "Mateo ortiz",
                      email: "mateortiz@gmail.com",
                    }}
                  />
                  <DiscordMessage
                    avatarSrc="/brand-asset-profile-picture.png"
                    avatarAlt="pingpanda avatar"
                    username="PingPanda"
                    timestamp="Today at 12:35PM"
                    badgeText="Revenue"
                    badgeColor="#FAA61A"
                    title="👨🏾 Payment recieved"
                    content={{
                      amount: "$49.99",
                      email: "ormendix@gmail.com",
                      plan: "Pro",
                    }}
                  />
                  <DiscordMessage
                    avatarSrc="/brand-asset-profile-picture.png"
                    avatarAlt="pingpanda avatar"
                    username="PingPanda"
                    timestamp="Today at 5:11AM"
                    badgeText="Milestone"
                    badgeColor="#5865F2"
                    title="🦂 Revenue milestone achieved"
                    content={{
                      recurringRevenue: "$49.99",
                      email: "ormendix@gmail.com",
                      growth: "+8.2%",
                    }}
                  />
                </AnimatedList>
              </MockDiscordUi>
            </div>
          </MaxWidthWrapper>
        </div>
      </section>
      <section className="relative py-24 sm:py-32 bg-brand-25">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-20">
          <div className="">
            <h2 className="text-center text-base/7 font-semibold text-brand-600">Intuitive monitoring</h2>
          </div>
        </MaxWidthWrapper>
      </section>
      <section></section>
    </>
  )
}

export default page
