import * as React from "react";

import {cn} from "../../lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({className, ...props}, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md px-3 py-2 text-sm",
          "bg-white text-[var(--wedding-navy-dark)]",
          "border border-[var(--wedding-navy-light)]",
          "placeholder:text-gray-400",
          "ring-offset-background",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "focus-visible:ring-[var(--wedding-navy-light)]",
          "focus:border-[var(--wedding-navy-light)]",
          "active:border-[var(--wedding-navy-light)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export {Textarea};
