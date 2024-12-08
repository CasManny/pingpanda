"use client"
import { client } from "@/app/lib/client"
import Card from "@/components/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMutation } from "@tanstack/react-query"
import Link from "next/link"
import { useState } from "react"

const AccountSettings = ({
  discordId: initialDiscordId,
}: {
  discordId: string
}) => {
  const [discordId, setDiscordId] = useState(initialDiscordId)

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const res = await client.project.setDiscordId.$post({ discordId })
      return await res.json()
    },
  })
  return (
    <Card className="max-w-xl w-full space-y-4">
      <div className="">
        <Label>DiscordId</Label>
        <Input
          className="mt-1"
          value={discordId}
          onChange={(e) => setDiscordId(e.target.value)}
          placeholder="Enter your discord id"
        />
        <p className="mt-2 text-sm/6 text-gray-600">
          Don't know how to find your DiscordId
          <Link href={"#"} className="text-brand-600 hover:text-brand-500">
            Learn how to obtain it here
          </Link>
        </p>
      </div>
      <div className="pt-4">
        <Button onClick={() => mutate()} disabled={isPending}>
          {isPending ? "Saving..." : "save changes"}
        </Button>
      </div>
    </Card>
  )
}

export default AccountSettings
