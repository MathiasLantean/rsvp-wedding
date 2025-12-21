import * as React from 'react';
import { Search } from 'lucide-react';

import { cn } from '../../lib/utils';

interface InputProps extends React.ComponentProps<'input'> {
  variant?: 'default' | 'search';
  onSearch?: (value: string) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = 'default', onSearch, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => inputRef.current!);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && variant === 'search' && onSearch) {
        onSearch(inputRef.current?.value || '');
      }
    };

    const handleSearchClick = () => {
      if (onSearch) {
        onSearch(inputRef.current?.value || '');
      }
    };

    if (variant === 'search') {
      return (
        <div className="relative w-full">
          <input
            type={type}
            className={cn(
              'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
              className
            )}
            ref={inputRef}
            onKeyDown={handleKeyDown}
            {...props}
          />
          <button
            type="button"
            onClick={handleSearchClick}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-foreground hover:text-foreground/80 transition-colors"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className
        )}
        ref={inputRef}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
