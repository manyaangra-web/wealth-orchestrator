import * as React from "react";

export const SuccessTickIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5 text-green-600" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <circle cx="12" cy="12" r="12" fill="#DCFCE7" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 13l3 3 7-7"
      stroke="#22C55E"
    />
  </svg>
);
