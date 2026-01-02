import * as React from "react";
import { PremiumToast } from "../components/ui/PremiumToast";
import { Button } from "../components/ui/button";

export default function PremiumToastDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Button
        onClick={() => setOpen(true)}
        className="px-6 py-3 rounded-xl bg-navy text-white font-semibold shadow-lg hover:bg-navy/90 transition"
      >
        Show Premium "Message Sent" Toast
      </Button>
      <PremiumToast
        open={open}
        title="Message Sent"
        description="Your message was delivered successfully."
        onClose={() => setOpen(false)}
        duration={3500}
      />
    </div>
  );
}
