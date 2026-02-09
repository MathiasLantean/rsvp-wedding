import * as React from "react";
import {cn} from "../../lib/utils";
import {ChevronDown} from "lucide-react";

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onToggle: () => void;
  title: string;
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({open, onToggle, title, className, children, ...props}, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          `
          w-full
          rounded-2xl
          border border-rose-100
          bg-white
          overflow-hidden
          transition-all
        `,
          className,
        )}
        {...props}
      >
        {/* Header */}
        <button
          type="button"
          onClick={onToggle}
          className="
            flex w-full items-center justify-between
            px-4 py-4
            text-left
            text-[var(--wedding-navy-dark)]
            font-medium
            transition-colors
            hover:bg-rose-50
          "
        >
          <span>{title}</span>

          <ChevronDown
            className={cn(
              "h-5 w-5 transition-transform duration-300",
              open && "rotate-180",
            )}
          />
        </button>

        {/* Content */}
        <div
          className={cn(
            `
            grid
            transition-[grid-template-rows,opacity]
            duration-300
            ease-in-out
          `,
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="overflow-hidden px-4 pb-4">{children}</div>
        </div>
      </div>
    );
  },
);

Accordion.displayName = "Accordion";
