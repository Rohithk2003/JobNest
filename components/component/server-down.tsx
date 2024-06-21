
import { Button } from "@/components/ui/button"

export function ServerDown() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <div className="bg-red-100 p-4 rounded-lg flex items-center gap-4 dark:bg-red-900/20">
        <TriangleAlertIcon className="h-8 w-8 text-red-500 dark:text-red-400" />
        <div className="space-y-1">
          <h3 className="font-semibold text-red-700 dark:text-red-400">Failed to load data</h3>
          <p className="text-sm text-red-500 dark:text-red-300">
            The server appears to be down. Please try again later.
          </p>
        </div>
      </div>
      <Button className="px-4 py-2" variant="outline">
        Retry
      </Button>
    </div>
  )
}

function TriangleAlertIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  )
}
