import { cn } from "@/utils/helpers";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import React from "react";
import Button from "./Button";
interface DialogProps extends DialogPrimitive.DialogProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  headerClassName?: string;
  rightButtonLabel?: string;
  leftButtonLabel?: string;
  onClickRightButton?: () => void;
  onClickLeftButton?: () => void;
  onClose?: () => void;
}

const Dialog: React.FC<DialogProps> = ({
  children,
  title,
  description,
  className,
  headerClassName,
  rightButtonLabel,
  leftButtonLabel,
  onClickRightButton,
  onClickLeftButton,
  onClose,
  ...props
}) => {
  return (
    <DialogPrimitive.Root {...props} onOpenChange={onClose}>
      <DialogOverlay />
      <DialogContent className={cn("w-fit h-fit min-w-[400px]  max-h-[90vh] overflow-y-auto", className)}>
        <DialogHeader className={cn(title ? "" : "hidden", headerClassName)}>
          <DialogTitle className="">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2  max-h-[70vh] overflow-y-auto">{children}</div>
        <DialogFooter className="">
          {leftButtonLabel && (
            <DialogClose asChild>
              <Button type="button" variant="secondary" onClick={onClickLeftButton}>
                {leftButtonLabel}
              </Button>
            </DialogClose>
          )}

          {rightButtonLabel && (
            <Button type="button" variant="default" onClick={onClickRightButton}>
              {rightButtonLabel}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </DialogPrimitive.Root>
  );
};

export default Dialog;

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="dialog-header" className={cn("flex flex-col gap-0 text-center sm:text-left p-4", className)} {...props} />;
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="dialog-footer" className={cn("flex gap-2 justify-end p-4", className)} {...props} />;
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return <DialogPrimitive.Title data-slot="dialog-title" className={cn("text-lg leading-none font-semibold", className)} {...props} />;
}

function DialogDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return <DialogPrimitive.Description data-slot="dialog-description" className={cn("text-muted-foreground text-sm", className)} {...props} />;
}

function DialogOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  );
}

function DialogPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogContent({ className, children, ...props }: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-0 rounded-lg border p-0 shadow-lg duration-200 ",
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer">
          <XIcon />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}
