import Button from "@/components/common/Button";
import { cn } from "@/utils/helpers";
import React, { type ReactNode } from "react";
import { Drawer as DrawerPrimitive } from "vaul";

type DrawerPosition = "left" | "right" | "top" | "bottom";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  direction?: DrawerPosition;
  className?: string;
  title?: string | React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ open, onClose, children, direction = "right", className, title }) => {
  const getPositionClasses = (direction: DrawerPosition) => {
    switch (direction) {
      case "left":
        return "left-0 top-0 bottom-0";
      case "right":
        return "right-0 top-0 bottom-0";
      case "top":
        return "top-0 left-0 right-0";
      case "bottom":
        return "bottom-0 left-0 right-0";
      default:
        return "right-0 top-0 bottom-0"; // default to right if not specified
    }
  };

  return (
    <DrawerPrimitive.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()} direction={direction}>
      <DrawerPrimitive.Portal>
        <DrawerPrimitive.Overlay className="fixed inset-0 bg-black/40" />
        <DrawerPrimitive.Content
          className={cn("min-w-[200px] absolute overflow-y-auto overflow-x-hidden", getPositionClasses(direction), className)}
          style={{ "--initial-transform": "calc(100% + 8px)" } as React.CSSProperties}
        >
          <div className="flex flex-row items-center justify-between p-2 px-4 text-foreground font-medium">
            {title}
            <Button size="sm" variant="ghost" className="px-2.5 py-1 h-fit" onClick={onClose}>
              X
            </Button>
          </div>

          {children}
          <DrawerPrimitive.Description className="sr-only"></DrawerPrimitive.Description>
          <DrawerPrimitive.Title className="sr-only"></DrawerPrimitive.Title>
        </DrawerPrimitive.Content>
      </DrawerPrimitive.Portal>
    </DrawerPrimitive.Root>
  );
};

export default Drawer;
