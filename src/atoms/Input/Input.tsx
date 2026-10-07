import React, { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { useFormField } from "../../context/FormFieldContext";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  warning?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  inputSize?: "xs" | "sm" | "md" | "lg";
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      error,
      warning,
      leftIcon,
      rightIcon,
      inputSize = "md",
      disabled,
      id,
      type = "text",
      ...props
    },
    ref,
  ) => {
    const formField = useFormField();
    const resolvedId = id || formField?.id;
    const resolvedError = error || formField?.error;
    const resolvedDisabled = disabled ?? formField?.disabled;
    const sizeClasses = {
      xs: "text-xs py-0.5 px-2.5 rounded-md h-6",
      sm: "text-xs py-1.5 px-3 rounded-lg h-8",
      md: "text-sm py-2.5 px-3.5 rounded-xl h-10",
      lg: "text-base py-3 px-4 rounded-xl h-12",
    };

    return (
      <div className={cn("relative w-full", containerClassName)}>
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-3 pointer-events-auto text-slate-400">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          id={resolvedId}
          type={type}
          disabled={resolvedDisabled}
          aria-invalid={Boolean(resolvedError)}
          aria-describedby={
            formField?.id && formField.error
              ? `${formField.id}-error`
              : undefined
          }
          className={cn(
            // 1. Background & Text Color (Support Light & Dark Mode)
            "w-full transition-colors duration-150",
            "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100",
            "placeholder:text-slate-400 dark:placeholder:text-slate-500",
            "focus:outline-none focus:ring-2 focus:ring-offset-0",

            // 2. Disabled State (Support Light & Dark Mode)
            "disabled:bg-slate-50 dark:disabled:bg-slate-800/50 disabled:text-slate-400 dark:disabled:text-slate-500 disabled:cursor-not-allowed",

            // 3. Validation Borders & Focus Rings
            resolvedError
              ? "border-rose-400 focus:border-rose-500 focus:ring-rose-200 dark:border-rose-500 dark:focus:ring-rose-950/50"
              : warning
                ? "border-amber-500 focus:border-amber-600 focus:ring-amber-200 dark:border-amber-500 dark:focus:ring-amber-950/50"
                : "border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 focus:border-aposis-500 focus:ring-aposis-200 dark:focus:ring-blue-500/20",

            // 4. Sizing & Icon Padding
            sizeClasses[inputSize],
            leftIcon &&
              (inputSize === "xs"
                ? "pl-7"
                : inputSize === "sm"
                  ? "pl-8"
                  : inputSize === "lg"
                    ? "pl-11"
                    : "pl-10"),
            rightIcon &&
              (inputSize === "xs"
                ? "pr-7"
                : inputSize === "sm"
                  ? "pr-8"
                  : inputSize === "lg"
                    ? "pr-11"
                    : "pr-10"),
            className,
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 z-10 flex items-center pr-3 text-slate-400">
            {rightIcon}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
