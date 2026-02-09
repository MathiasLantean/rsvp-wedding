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
    transition-[grid-template-rows]
    duration-300
    ease-in-out
  `,
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
        >
          <div
            className={cn(
              "overflow-hidden px-4 transition-[padding] duration-300",
              open ? "pb-4" : "pb-0",
            )}
          >
            {children}
          </div>
        </div>
      </div>
    );
  },
);

Accordion.displayName = "Accordion";
