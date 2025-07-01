
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      duration={4000}
      toastOptions={{
        classNames: {
          toast:
            "group toast bg-white/10 backdrop-blur-2xl border border-white/20 text-white shadow-lg rounded-xl p-4",
          description: "text-white/80",
          actionButton:
            "bg-blue-500/20 border-blue-500/30 text-blue-400 hover:bg-blue-500/30 rounded-lg px-3 py-1",
          cancelButton:
            "bg-white/10 border-white/20 text-white/70 hover:bg-white/20 rounded-lg px-3 py-1",
          success: "bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-400/30 text-white shadow-lg shadow-green-500/20",
          error: "bg-red-500/10 border-red-500/30 text-red-100 shadow-lg shadow-red-500/20",
          warning: "bg-orange-500/10 border-orange-500/30 text-orange-100 shadow-lg shadow-orange-500/20",
          info: "bg-blue-500/10 border-blue-500/30 text-blue-100 shadow-lg shadow-blue-500/20",
        },
      }}
      position="top-right"
      {...props}
    />
  )
}

export { Toaster }
export { toast } from "sonner"
