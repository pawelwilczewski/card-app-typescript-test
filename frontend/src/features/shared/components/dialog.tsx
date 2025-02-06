import PrimitiveButton from "@/features/shared/components/primitive-button";
import { ReactElement, ReactNode, cloneElement, forwardRef, useEffect, useRef } from "react";
import { BiX } from "react-icons/bi";

type DialogProps = {
  children: ReactNode;
  trigger: ReactElement;
  title: string;
};

const Dialog = forwardRef<HTMLDialogElement, DialogProps>(({ children, trigger, title }, ref) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (ref) {
      if (typeof ref === "function") {
        ref(dialogRef.current);
      } else {
        ref.current = dialogRef.current;
      }
    }
  }, [ref]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === "Escape" && dialogRef.current?.open) {
        dialogRef.current.close();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return (): void => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleTriggerClick = (): void => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const handleCloseClick = (): void => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return (
    <>
      {cloneElement(trigger, {
        onClick: handleTriggerClick,
      })}

      <dialog ref={dialogRef} className="text-foreground rounded-lg shadow-lg border mx-auto bg-background">
        <div className="flex justify-between items-center mb-4">
          <h2 id="dialog-title" className="text-xl font-semibold">
            {title}
          </h2>
          <PrimitiveButton onClick={handleCloseClick} variant="ghost" size="small" aria-label="Close">
            <BiX size="1.5rem" />
          </PrimitiveButton>
        </div>

        <div className="overflow-y-auto max-h-[70vh] p-1">{children}</div>
      </dialog>
    </>
  );
});

Dialog.displayName = "Dialog";

export default Dialog;
