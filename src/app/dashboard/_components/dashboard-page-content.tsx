"use client"
import { client } from "@/app/lib/client"
import LoadingSpinner from "@/components/loading-spinner"
import { Button, buttonVariants } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { format, formatDistanceToNow } from "date-fns"
import { ArrowRight, BarChart, Clock, Database, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const DashboardPageContent = () => {
  const queryClient = new QueryClient()
  const [deletingCategory, setDeletingCategory] = useState<string | null>(null)
  const { data: categories, isPending: isEventCategoriesLoading } = useQuery({
    queryKey: ["user-event-categories"],
    queryFn: async () => {
      const res = await client.category.getEventCategories.$get()
      const { categories } = await res.json()
      return categories
    },
  })
  const { mutate: deleteCategory, isPending: isDeletingCategory } = useMutation({
    mutationFn: async (name: string) => {
      await client.category.deleteCategory.$post({ name })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-event-categories"] })
      setDeletingCategory(null)
    },
  })

  if (isEventCategoriesLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <LoadingSpinner />
      </div>
    )
  }

  if (!categories || categories.length === 0) {
    return <div className="">empty state</div>
  }
  return (
    <>
      <ul className="grid max-w-6xl grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {categories.map((category) => (
          <li
            className="relative group z-10 transition-all duration-200 hover:-translate-y-0.5"
            key={category.id}
          >
            <div className="absolute z-0 inset-px rounded-lg bg-white" />
            <div className="absolute pointer-events-none z-0 inset-px rounded-lg shadow-sm transition-all duration-300 group-hover:shadow-md ring-1 ring-black/5" />
            <div className="relative p-6 z-10">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="size-12 rounded-full"
                  style={{
                    backgroundColor: category.color
                      ? `#${category.color.toString(16).padStart(6, "0")}`
                      : "#F3F4F6",
                  }}
                />
                <div className="">
                  <h3 className="text-lg/7 font-medium tracking-tight text-gray-950">
                    {category.emoji || "🦅"}
                    {category.name}
                  </h3>
                  <p className="text-sm/6 text-gray-600">
                    {format(category.createdAt, "MMM d, yyyy")}
                  </p>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="text-sm/5 text-gray-600 flex items-center">
                  <Clock className="size-4 mr-2 text-brand-500" />
                  <span className="font-medium">Last ping:</span>
                  <span className="ml-1">
                    {category.lastPing
                      ? formatDistanceToNow(category.lastPing) + "ago"
                      : "Never"}
                  </span>
                </div>
                <div className="text-sm/5 text-gray-600 flex items-center">
                  <Database className="size-4 mr-2 text-brand-500" />
                  <span className="font-medium">Unique Fields:</span>
                  <span className="ml-1">{category.uniqueFieldCount || 0}</span>
                </div>
                <div className="text-sm/5 text-gray-600 flex items-center">
                  <BarChart className="size-4 mr-2 text-brand-500" />
                  <span className="font-medium">Events This month</span>
                  <span className="ml-1">{category.eventCounts || 0}</span>
                </div>
              </div>

              <div className="flex items-center mt-4 justify-between">
                <Link
                  href={`/dashboard/category/${category.name}`}
                  className={buttonVariants({
                    variant: "outline",
                    size: "sm",
                    className: "flex items-center gap-2 text-sm",
                  })}
                >
                  View all <ArrowRight className="size-4" />
                </Link>
                <Button
                  variant={"ghost"}
                  size="sm"
                  className="text-gray-500 hover:text-red-500 transition-colors"
                  aria-label={`Delete ${category.name} category`}
                  onClick={() => setDeletingCategory(`${category.name}`)}
                >
                  <Trash2 className="size-5" />
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Modal
        showModal={!!deletingCategory}
        setShowModal={() => setDeletingCategory(null)}
        className="max-w-md p-8"
      >
        <div className="space-y-6">
          <div className="">
            <h2 className="text-lg/7 font-medium tracking-tight text-gray-950">
              Delete Category
            </h2>
            <p className="text-sm/6 text-gray-600">
              Are you sure you want to delete the category{" "}
              <span className="font-bold">"{deletingCategory}"</span>? <br />{" "}
              This action cannot be undone.
            </p>
          </div>
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button
              variant={"outline"}
              onClick={() => setDeletingCategory(null)}
            >
              cancel
            </Button>

            <Button
              onClick={() =>
                deletingCategory && deleteCategory(deletingCategory)
              }
              variant={"destructive"}
              disabled={isDeletingCategory}
            >
              {isDeletingCategory ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default DashboardPageContent
