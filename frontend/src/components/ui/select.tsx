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
      <select
        ref={selectRef}
        className={cn(
          "flex h-10 w-full rounded-md px-3 py-2 pr-10 text-base md:text-sm",
          "bg-white text-[var(--wedding-navy-dark)]",
          "border border-gray-300",
          "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
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
    );
  },
);

Select.displayName = "Select";

export {Select};
