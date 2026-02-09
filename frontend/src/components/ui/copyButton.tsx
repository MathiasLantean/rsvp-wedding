import {useState} from "react";
import {Copy, Check} from "lucide-react";
import {cn} from "../../lib/utils";

interface CopyButtonProps {
  value: string;
  className?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({value, className}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copiar"
      className={cn(
        `
        flex items-center justify-center
        w-7 h-7
        rounded-full

        text-[var(--wedding-navy-dark)]
        opacity-70

        transition-all duration-200
        hover:opacity-100
        hover:bg-[color-mix(in_srgb,var(--wedding-navy-dark)_8%,transparent)]
        active:scale-90
        `,
        className,
      )}
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-600" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </button>
  );
};
