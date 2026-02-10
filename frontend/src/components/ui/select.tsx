import * as React from "react";
import {cn} from "../../lib/utils";

export type SelectOption = {
  label: string;
  value: string;
};

interface SelectProps extends Omit<React.ComponentProps<"select">, "onChange"> {
  options: SelectOption[];
  placeholder?: string;
  onValueChange?: (value: string) => void;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({className, options, placeholder, onValueChange, ...props}, ref) => {
    const selectRef = React.useRef<HTMLSelectElement>(null);

    React.useImperativeHandle(ref, () => selectRef.current!);

    return (
      <div className="relative w-full">
        <select
          ref={selectRef}
          className={cn(
            "flex h-10 w-full rounded-md px-3 py-2 pr-10 text-base md:text-sm",
            "bg-white text-[var(--wedding-navy-dark)]",
            "border border-[var(--wedding-navy-light)]",
            "ring-offset-background",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
            "focus-visible:ring-[var(--wedding-navy-light)]",
            "focus:border-[var(--wedding-navy-light)]",
            "active:border-[var(--wedding-navy-light)]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "hover:border-[var(--wedding-navy-light)]",
            "appearance-none",
            className,
          )}
          onChange={(e) => onValueChange?.(e.target.value)}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          <svg
            className="h-4 w-4 text-[var(--wedding-navy-dark)]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.354a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    );
  },
);

Select.displayName = "Select";

export {Select};
