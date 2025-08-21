import { Badge } from "@/components/shadcn/badge";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/shadcn/form";
import { Label } from "@/components/shadcn/label";
import { cn } from "@/utils/helpers";
import * as Popover from "@radix-ui/react-popover";
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import * as React from "react";
import { useCallback, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

export interface MultiSelectRef {
  close: () => void;
}

interface MultiSelectProps<T extends FieldValues> extends Omit<SelectPrimitive.SelectProps, "value" | "onValueChange"> {
  label?: string;
  control?: Control<any, any>;
  name?: FieldPath<T>;
  placeholder?: string;
  className?: string;
  onChange?: (value: string[]) => void;
  labelClassName?: string;
  containerClassName?: string;
  size?: "sm" | "default";
  options: {
    label: string;
    value: string;
    [key: string]: string | number;
  }[];
  prefixIcon?: React.ReactNode;
  maxDisplay?: number;
  value?: string[];
  hasError?: boolean;
  inputRef?: React.Ref<any>;
  showBadges?: boolean;
  title?: string;
  footer?: React.ReactNode;
}

const MultiSelect = React.forwardRef(
  <T extends FieldValues>(
    props: MultiSelectProps<T>,
    ref: React.Ref<MultiSelectRef> // 🔥 Expose this to the parent
  ) => {
    const { label, control, name, containerClassName, className, labelClassName, required, ...rest } = props;

    const IsRequired = useMemo(() => (required ? <p className="text-destructive pl-0.5">*</p> : null), [required]);

    return (
      <>
        {control && name ? (
          <FormField
            control={control}
            name={name as FieldPath<T>}
            render={({ field, fieldState }) => (
              <FormItem className={cn("gap-0", containerClassName)}>
                {label && (
                  <FormLabel className={cn("gap-0 mb-1.5 px-0.5 text-sm font-medium flex items-center", labelClassName)}>
                    {label}
                    {IsRequired}
                  </FormLabel>
                )}
                <FormControl className={cn("my-0", className)}>
                  <MultiSelectComponent
                    {...rest}
                    {...field}
                    value={field.value || []}
                    onChange={field.onChange}
                    name={field.name}
                    inputRef={field.ref}
                    ref={ref} // 🔥 Pass the ref to inner component
                    className={cn("cursor-pointer", className)}
                    hasError={!!fieldState.error}
                  />
                </FormControl>
                <FormMessage className="mt-0.5 font-serif text-[11px] italic px-0.5" />
              </FormItem>
            )}
          />
        ) : (
          <div className={cn(containerClassName)}>
            {label && (
              <Label className={cn("px-0.5 text-sm font-medium flex items-center mb-0.5 gap-0", labelClassName)}>
                {label}
                {IsRequired}
              </Label>
            )}
            <MultiSelectComponent {...rest} ref={ref} className={cn("cursor-pointer ", className)} />
          </div>
        )}
      </>
    );
  }
);
export default MultiSelect;

const MultiSelectComponent = React.forwardRef<MultiSelectRef, MultiSelectProps<FieldValues>>(
  (
    {
      options,
      placeholder = "Select options",
      onChange,
      className,
      prefixIcon,
      value = [],
      maxDisplay = 2,
      hasError,
      inputRef,
      showBadges,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [triggerWidth, setTriggerWidth] = useState<number | null>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    useImperativeHandle(ref, () => ({
      close: () => setOpen(false),
    }));

    // ResizeObserver to watch trigger width changes
    useLayoutEffect(() => {
      const updateWidth = () => {
        if (triggerRef.current) {
          setTriggerWidth(triggerRef.current.offsetWidth);
        }
      };

      updateWidth(); // Set initial width

      const observer = new ResizeObserver(updateWidth);
      if (triggerRef.current) observer.observe(triggerRef.current);

      return () => observer.disconnect();
    }, []);

    const toggleValue = useCallback(
      (selectedValue: string) => {
        const updated = value.includes(selectedValue) ? value.filter((v) => v !== selectedValue) : [...value, selectedValue];
        onChange?.(updated);
      },
      [value, onChange]
    );

    const selectedLabels = useMemo(() => value.map((v) => options.find((o) => o.value === v)?.label).filter(Boolean), [value, options]);

    return (
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <button
            ref={triggerRef}
            type="button"
            className={cn(
              "border-input data-[placeholder]:text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground shadcn-form-input",
              "focus-visible:border-ring focus-visible:ring-ring/50 flex w-full items-center justify-between gap-2 shadcn-input-select border px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px]",
              "disabled:cursor-not-allowed disabled:opacity-50 *:line-clamp-1 *:flex *:items-center *:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
              hasError && "border-destructive ring-destructive/20",
              className
            )}
            aria-invalid={hasError ? "true" : undefined}
          >
            <div className="flex flex-row flex-wrap items-center gap-1">
              {prefixIcon}

              {showBadges && selectedLabels?.length ? (
                <>
                  {selectedLabels.slice(0, maxDisplay).map((label, i) => (
                    <Badge key={value[i]} className="flex items-center gap-1 pr-">
                      {label}
                    </Badge>
                  ))}
                  {selectedLabels.length > maxDisplay && (
                    <Badge className="bg-muted text-muted-foreground">+{selectedLabels.length - maxDisplay}</Badge>
                  )}
                </>
              ) : (
                <>
                  <span className="text-foreground">{placeholder}</span>
                </>
              )}
            </div>
            <ChevronDownIcon className="size-4 opacity-50" />
          </button>
        </Popover.Trigger>

        <Popover.Content
          align="start"
          side="bottom"
          sideOffset={4}
          style={{ width: triggerWidth ?? "auto" }}
          className={cn(
            "bg-background rounded-[10px] shadow-xl text-popover-foreground border border-border max-h-60 overflow-y-auto z-50 p-1",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          )}
        >
          {options.map((option) => {
            const isSelected = value.includes(option.value);
            return (
              <div
                key={option.value}
                onClick={() => toggleValue(option.value)}
                className={cn(
                  "cursor-pointer relative flex w-full items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none select-none",
                  "hover:bg-accent hover:text-accent-foreground",
                  isSelected && "bg-accent text-accent-foreground"
                )}
              >
                <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
                  {isSelected && <CheckIcon className="size-4 text-primary" />}
                </span>
                {option.label}
              </div>
            );
          })}

          {props.footer}
        </Popover.Content>
      </Popover.Root>
    );
  }
);
