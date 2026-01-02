import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";
import { SuccessTickIcon } from "./SuccessTickIcon";
import { motion } from "framer-motion";
import { PremiumToast } from "./PremiumToast";

type ToasterProps = React.ComponentProps<typeof Sonner>;


const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        duration: 3500,
        classNames: {
          toast:
            "group flex items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-br from-white/95 via-white/90 to-gold/10 dark:from-neutral-900 dark:via-neutral-950 dark:to-gold/10 border border-gold/20 shadow-2xl min-w-[260px] max-w-xs sm:max-w-sm transition-all focus-visible:ring-2 focus-visible:ring-gold/40 outline-none animate-toast-in",
          description: "text-lg font-bold text-navy dark:text-neutral-100 leading-snug",
          actionButton: "hidden",
          cancelButton: "hidden",
        },
        // For a modal-style "Message Sent" popup, use <PremiumToast /> directly in your component.
        // Sonner is for standard toasts only.
      }}
      {...props}
    />
  );
};


// Tailwind CSS for animation (add to your global styles if not present):
// .animate-toast-in { animation: toastIn 0.32s cubic-bezier(0.4,0,0.2,1); }
// @keyframes toastIn { from { opacity: 0; transform: translateY(24px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
// .animate-tick-pop { animation: tickPop 0.38s cubic-bezier(0.4,0,0.2,1); }
// @keyframes tickPop { 0% { transform: scale(0.7); opacity: 0; } 60% { transform: scale(1.15); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }

export { Toaster, toast };
