import { cn } from "@/utils/helpers";
import { Label } from "@radix-ui/react-label";
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import * as React from "react";
import { useCallback } from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../shadcn/form";

interface SelectProps<T extends FieldValues> extends SelectPrimitive.SelectProps {
  label?: string;
  control?: Control<T, FieldPath<T>>;
  name?: FieldPath<T>;
  placeholder?: string;
  className?: string;
  onChange?: (value: string) => void;
  labelClassName?: string;
  containerClassName?: string;
  size?: "sm" | "default";
  options: {
    label: string;
    value: string;
    [key: string]: string | number;
  }[];
  hasError?: boolean;
  prefixIcon?: React.ReactNode;
}

const Select = <T extends FieldValues>({
  label,
  control,
  name,
  containerClassName,
  className,
  labelClassName,
  required,
  ...props
}: SelectProps<T>) => {
  const IsRequired = useCallback(() => (required ? <p className="text-destructive pl-0.5">*</p> : null), [required]);

  return (
    <React.Fragment>
      {control && name ? (
        <FormField
          control={control}
          name={name as FieldPath<T>}
          render={({ field, fieldState }) => (
            <FormItem className={cn("gap-0", containerClassName)}>
              {label && (
                <FormLabel className={cn("mb-1.5 px-0.5 text-sm font-medium", labelClassName)}>
                  <div className="flex flex-row items-center">
                    {label}
                    <IsRequired />
                  </div>
                </FormLabel>
              )}
              <FormControl className={cn("my-0", className)}>
                <SelectComponent hasError={!!fieldState.error} className={cn("cursor-pointer", className)} {...props} {...field} />
              </FormControl>
              <FormMessage className="mt-0.5 font-serif text-[11px] italic px-0.5" />
            </FormItem>
          )}
        />
      ) : (
        <React.Fragment>
          <div className={cn(containerClassName)}>
            <>
              {label && (
                <Label className={cn("px-0.5 text-sm font-medium flex flex-row items-center mb-0.5", labelClassName)}>
                  {label}
                  <IsRequired />
                </Label>
              )}
              <SelectComponent className={cn("cursor-pointer", className)} {...props} />
            </>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Select;

const SelectComponent: React.FC<SelectProps<FieldValues>> = ({
  options,
  placeholder = "Select an option",
  onChange,
  className,
  hasError,
  prefixIcon,
  ...props
}) => {
  const handleChange = useCallback(
    (checked: string) => {
      if (onChange) {
        onChange(checked);
      }
    },
    [onChange]
  );

  return (
    <ShadcnSelect onValueChange={handleChange} {...props}>
      <SelectTrigger className={cn("cursor-pointer ", className)} hasError={hasError}>
        <div className="flex flex-row flex-wrap items-center gap-1">
          {prefixIcon}

          <SelectValue placeholder={placeholder} />
        </div>
      </SelectTrigger>

      {/* Select Content */}
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </ShadcnSelect>
  );
};

function ShadcnSelect({ ...props }: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectValue({ ...props }: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
  className,
  size = "default",
  children,
  hasError,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default";
  hasError?: boolean;
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      aria-invalid={hasError ? "true" : undefined}
      className={cn(
        "border-input data-[placeholder]:text-input-placeholder [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50  flex w-fit items-center justify-between gap-2 shadcn-input-select border  px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h- data-[size=sm]:h- *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 shadcn-form-input",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({ className, children, position = "popper", ...props }: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "bg-background rounded-[10px] shadow-xl text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto shadcn-input-select border border-border dark:bg-gray-700 ",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1 s bg-background",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectGroup({ ...props }: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectItem({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2 cursor-pointer",
        className
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectScrollUpButton({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn("flex cursor-default items-center justify-center py-1", className)}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn("flex cursor-default items-center justify-center py-1", className)}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}
