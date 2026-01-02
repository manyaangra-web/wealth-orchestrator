import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SuccessTickIcon } from "./SuccessTickIcon";

interface PremiumToastProps {
  open: boolean;
  title?: string;
  description?: string;
  onClose: () => void;
  duration?: number;
}

export const PremiumToast: React.FC<PremiumToastProps> = ({
  open,
  title = "Message Sent",
  description,
  onClose,
  duration = 3500,
}) => {
  React.useEffect(() => {
    if (!open) return;
    const timeout = setTimeout(onClose, duration);
    return () => clearTimeout(timeout);
  }, [open, duration, onClose]);

  React.useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-[9998] bg-black/10 backdrop-blur-sm transition-opacity"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-hidden="true"
            onClick={onClose}
          />
          {/* Modal Toast */}
          <motion.div
            className="fixed z-[9999] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xs sm:max-w-sm p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col items-center text-center focus:outline-none"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            role="status"
            aria-live="polite"
            tabIndex={-1}
            style={{ outline: "none" }}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 focus:outline-none"
              tabIndex={0}
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M6 6l8 8M14 6l-8 8"/></svg>
            </button>
            <SuccessTickIcon className="w-10 h-10 mb-3 text-green-500" />
            <div className="font-semibold text-lg text-neutral-900 dark:text-neutral-100 mb-1">{title}</div>
            {description && <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">{description}</div>}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
