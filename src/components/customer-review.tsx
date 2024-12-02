import { Check, Star } from "lucide-react"
import Image from "next/image"
import { Icons } from "./icons"

interface CustomerReviewProps {
  maxStars: number
  review: string
  customerImage: string
  customerName: string
  isCustomerFromTwitter: boolean
  isVerified: boolean
    customerTwitterhandle: string,
}
const CustomerReview = ({
  maxStars,
  review,
  customerImage,
  customerName,
  customerTwitterhandle,
  isVerified,
  isCustomerFromTwitter,
}: CustomerReviewProps) => {
  return (
    <div className="flex flex-auto flex-col gap-4 bg-brand-25 p-6 sm:p-8 lg:p-16 rounded-t-[2rem] lg:rounded-tr-none lg:rounded-l-[2rem]">
      <div className="flex gap-0.5 justify-center lg:justify-start">
        {Array.from({ length: maxStars }, (_, index) => (
          <Star className="size-5 text-brand-600 fill-brand-600" />
        ))}
      </div>
      <p className="text-base sm:text-lg lg:text-lg/8 font-medium tracking-tight text-brand-950 lg:text-left text-pretty">
       {review}
      </p>
      <div className="flex flex-col justify-center lg:justify-start sm:flex-row items-center sm:items-start gap-4 mt-2">
        <Image
          src={customerImage}
          alt="user image"
          className="rounded-full object-cover"
          width={48}
          height={48}
        />
        <div className="flex flex-col items-center sm:items-start">
          <p className="font-semibold flex items-center">
            {customerName}
            {isCustomerFromTwitter && isVerified && (
              <Icons.verificationBadge className="size-4 inline-block ml-1.5" />
            )}
          </p>
          {isCustomerFromTwitter && (
            <p className="text-gray-600 text-sm">{customerTwitterhandle}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default CustomerReview
