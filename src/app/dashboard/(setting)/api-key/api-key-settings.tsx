"use client"
import Card from "@/components/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckIcon, Clipboard } from "lucide-react"
import React, { useState } from "react"

const ApiKeySettings = ({ apiKey }: { apiKey: string }) => {
  const [copySuccess, setCopySuccess] = useState(false)

  const copyKey = () => {
    navigator.clipboard.writeText(apiKey)
    setCopySuccess(true)
    setTimeout(() => {
      setCopySuccess(false)
    }, 2000)
  }
  return (
    <Card className="max-w-xl w-full">
      <div className="">
        <Label>Your Api Key</Label>
        <div className="mt-1 relative">
          <Input type="password" value={apiKey} readOnly />
          <div className="absolute space-x-0.5 inset-y-0 right-0  flex items-center">
            <Button
              onClick={copyKey}
              variant={"ghost"}
              className="p-1 w-10 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {copySuccess ? (
                <CheckIcon className="size-4 text-brand-900" />
              ) : (
                <Clipboard className="size-4 text-brand-900" />
              )}
            </Button>
          </div>
        </div>
        <p className="mt-2 text-sm/6 text-gray-600">
          keep your secret secret and do not share with others
        </p>
      </div>
    </Card>
  )
}

export default ApiKeySettings
