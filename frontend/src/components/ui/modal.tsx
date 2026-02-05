import * as React from "react";
import {cn} from "../../lib/utils";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
  cancelText?: string;
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({open, onClose, className, children, ...props}, ref) => {
    // 🔒 Bloquear scroll del fondo
    React.useEffect(() => {
      if (open) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }

      return () => {
        document.body.style.overflow = "";
      };
    }, [open]);

    if (!open) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop rosa */}
        <div
          className="absolute inset-0  backdrop-blur-sm"
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--wedding-rose-dark) 50%, transparent)",
          }}
          onClick={onClose}
        />

        {/* Modal */}
        <div
          ref={ref}
          className={cn(
            `
            relative
            w-[92%] max-w-md
            h-[90dvh]
            overflow-hidden
            rounded-3xl
            bg-white
            border border-rose-100
            shadow-xl
            py-8 px-6
            text-wedding-navy-dark
          `,
            className,
          )}
          {...props}
        >
          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="
    absolute top-6 right-6
    flex items-center justify-center
    w-9 h-9
    rounded-full
    text-[var(--wedding-navy-dark)]
    transition-all duration-200
    hover:scale-105
  "
            style={{
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "color-mix(in srgb, var(--wedding-navy-dark) 15%, transparent)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            ✕
          </button>

          <div className="h-full overflow-y-auto px-2 py-8">{children}</div>
        </div>
      </div>
    );
  },
);

Modal.displayName = "Modal";
