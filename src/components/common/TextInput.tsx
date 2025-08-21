import { cn } from "@/utils/helpers";
import { Label } from "@radix-ui/react-label";
import React, { type ComponentProps, Fragment, useCallback } from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../shadcn/form";
interface TextInputProps<T extends FieldValues> extends ComponentProps<"input"> {
  label?: string;
  error?: string;
  control?: Control<T, FieldPath<T>>;
  name?: FieldPath<T>;
  labelClassName?: string;
  inputClassName?: string;
  required?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onStartIconClick?: () => void;
  onEndIconClick?: () => void;
}

const TextInput = <T extends FieldValues>({
  label,
  control,
  name,
  labelClassName,
  inputClassName,
  className,
  type,
  required,
  ...props
}: TextInputProps<T>) => {
  const IsRequired = useCallback(() => (required ? <p className="text-destructive font-bold pl-0.5"> *</p> : null), [required]);

  return (
    <Fragment>
      {control ? (
        <FormField
          control={control}
          name={name as FieldPath<T>}
          render={({ field }) => (
            <FormItem className={cn("gap-0", className)}>
              {label && (
                <FormLabel className={cn("mb-1.5 pl-0.5 text-sm font-medium flex flex-row gap-0", labelClassName)}>
                  {label}
                  <IsRequired />
                </FormLabel>
              )}
              <FormControl className="my-0">
                <ShadcnTextInput className={inputClassName} type={type} {...props} {...field} />
              </FormControl>
              {/* <FormDescription>This is your public display name.</FormDescription> */}
              <FormMessage className="mt-0.5 font-serif text-[11px] italic px-0.5" />
            </FormItem>
          )}
        />
      ) : (
        <div className={cn("", className)}>
          {label && (
            <Label className={cn("mb-1.5 px-0.5 text-sm font-medium flex flex-row ", labelClassName)}>
              {label} <IsRequired />
            </Label>
          )}
          <ShadcnTextInput className={inputClassName} type={type} {...props} />
        </div>
      )}
    </Fragment>
  );
};

export default TextInput;

interface InternalInputProps extends ComponentProps<"input"> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onStartIconClick?: () => void;
  onEndIconClick?: () => void;
}

const ShadcnTextInput: React.FC<InternalInputProps> = ({ className, startIcon, endIcon, onStartIconClick, onEndIconClick, type, ...props }) => {
  return (
    <div className="relative w-full">
      {startIcon && (
        <div onClick={onStartIconClick} className="absolute left-3 top-1/2 -translate-y-1/2  text-foreground cursor-pointer">
          {startIcon}
        </div>
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground  placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-transparent border-input flex w-full min-w-0 border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          "shadcn-form-input",
          startIcon && "pl-10",
          endIcon && "pr-10",
          className
        )}
        {...props}
      />
      {endIcon && (
        <div onClick={onEndIconClick} className="absolute right-3 top-1/2 -translate-y-1/2  cursor-pointer">
          {endIcon}
        </div>
      )}
    </div>
  );
};
