import React, { forwardRef, useState, useRef, useImperativeHandle } from "react";
import { cn } from "../../utils/cn";
import { useFormField } from "../../context/FormFieldContext";

export type InputType =
  | "text"
  | "textinput"
  | "password"
  | "email"
  | "phone"
  | "tel"
  | "number"
  | "search"
  | "url"
  | "date"
  | "time"
  | "textarea";

export type InputSize = "xs" | "sm" | "md" | "lg";
export type InputState = "default" | "warning" | "error";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> {
  type?: InputType;
  inputSize?: InputSize;
  size?: InputSize;
  state?: InputState;
  error?: boolean | string;
  warning?: boolean | string;
  label?: React.ReactNode;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
  stepper?: boolean;
  multiline?: boolean;
  rows?: number;
  highlighted?: boolean;
  badgeText?: string;
  containerClassName?: string;
}

// Built-in Icons for Input types
const MailIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0 text-current"
    aria-hidden="true"
  >
    <path
      d="M2.667 3.333h10.666c.734 0 1.334.6 1.334 1.334v7.333c0 .734-.6 1.333-1.334 1.334H2.667A1.333 1.333 0 011.333 12V4.667c0-.734.6-1.334 1.334-1.334z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.667 4.667l-6.667 4.666L1.333 4.667"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0 text-current"
    aria-hidden="true"
  >
    <path
      d="M14.667 11.28v2.053a1.333 1.333 0 01-1.454 1.334 13.193 13.193 0 01-5.753-2.047 12.993 12.993 0 01-4-4 13.193 13.193 0 01-2.047-5.78A1.333 1.333 0 012.74 1.333h2.053a1.333 1.333 0 011.334 1.147 8.56 8.56 0 00.466 1.873 1.333 1.333 0 01-.3 1.407L5.427 6.627a10.667 10.667 0 004 4l.866-.867a1.333 1.333 0 011.407-.3 8.56 8.56 0 001.873.467 1.333 1.333 0 011.147 1.353z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0 text-current"
    aria-hidden="true"
  >
    <path
      d="M7.333 12.667A5.333 5.333 0 107.333 2a5.333 5.333 0 000 10.667zM14 14l-2.9-2.9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LinkIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0 text-current"
    aria-hidden="true"
  >
    <path
      d="M6.667 9.333a3.333 3.333 0 004.713 0l2-2a3.333 3.333 0 00-4.713-4.714l-1.14 1.14M9.333 6.667a3.333 3.333 0 00-4.713 0l-2 2a3.333 3.333 0 004.713 4.714l1.14-1.14"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EyeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0 text-current"
    aria-hidden="true"
  >
    <path
      d="M1.333 8S4 3.333 8 3.333 14.667 8 14.667 8 12 12.667 8 12.667 1.333 8 1.333 8z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0 text-current"
    aria-hidden="true"
  >
    <path
      d="M2 2l12 12M6.5 6.5a2 2 0 002.83 2.83M1.333 8S4 3.333 8 3.333c1.5 0 2.8.4 3.9 1.05M14.667 8S12 12.667 8 12.667c-1.5 0-2.8-.4-3.9-1.05"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ClearIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0 text-current"
    aria-hidden="true"
  >
    <path
      d="M12 4L4 12M4 4l8 8"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const WarningIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0 text-amber-500 dark:text-amber-400"
    aria-hidden="true"
  >
    <path
      d="M8 1.333L1.333 13.333h13.334L8 1.333zM8 6v3.333M8 11.333h.007"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ErrorIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0 text-rose-500 dark:text-rose-400"
    aria-hidden="true"
  >
    <circle cx="8" cy="8" r="6.667" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M8 4.667v4M8 11.333h.01"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      error,
      warning,
      state = "default",
      label,
      helperText,
      leftIcon,
      rightIcon,
      prefix,
      suffix,
      clearable,
      onClear,
      stepper,
      multiline = false,
      rows = 3,
      highlighted = false,
      badgeText,
      inputSize,
      size,
      disabled,
      readOnly,
      required,
      id,
      type = "text",
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref,
  ) => {
    const formField = useFormField();
    const resolvedId = id || formField?.id;
    const resolvedDisabled = disabled ?? formField?.disabled;

    // Resolve state, error, warning
    const rawError = error ?? formField?.error;
    const resolvedError =
      Boolean(rawError)
        ? rawError
        : state === "error"
          ? helperText || true
          : undefined;

    const resolvedWarning =
      Boolean(warning)
        ? warning
        : state === "warning"
          ? helperText || true
          : undefined;

    const effectiveSize: InputSize = inputSize || size || "md";

    // Value tracking for clearable button
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState<string>(
      defaultValue !== undefined ? String(defaultValue) : "",
    );
    const currentValue = isControlled ? String(value ?? "") : internalValue;
    const hasValue = currentValue.length > 0;

    // Password visibility toggle
    const [showPassword, setShowPassword] = useState(false);

    // Inner element ref
    const innerRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
    useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);

    // Type normalization
    const isTextarea = type === "textarea" || multiline;
    const isPassword = type === "password";
    const isSearch = type === "search";
    const isEmail = type === "email";
    const isPhone = type === "phone" || type === "tel";
    const isNumber = type === "number";
    const isUrl = type === "url";
    const isDate = type === "date";
    const isTime = type === "time";

    // Effective input HTML type
    const effectiveType = isPassword
      ? showPassword
        ? "text"
        : "password"
      : isPhone
        ? "tel"
        : isSearch
          ? "search"
          : isEmail
            ? "email"
            : isUrl
              ? "url"
              : isNumber
                ? "number"
                : isDate
                  ? "date"
                  : isTime
                    ? "time"
                    : type === "textinput"
                      ? "text"
                      : type;

    // Automatic default leftIcon based on type if not explicitly set and no prefix
    let resolvedLeftIcon = leftIcon;
    if (resolvedLeftIcon === undefined && !prefix) {
      if (isEmail) {
        resolvedLeftIcon = <MailIcon />;
      } else if (isPhone) {
        resolvedLeftIcon = <PhoneIcon />;
      } else if (isSearch) {
        resolvedLeftIcon = <SearchIcon />;
      } else if (isUrl) {
        resolvedLeftIcon = <LinkIcon />;
      }
    }

    // Clearable handling
    const isClearable =
      !resolvedDisabled &&
      !readOnly &&
      (clearable ?? (isSearch && hasValue));

    const handleClear = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isControlled) {
        setInternalValue("");
      }
      onClear?.();
      if (innerRef.current) {
        innerRef.current.value = "";
        const event = new Event("input", { bubbles: true });
        innerRef.current.dispatchEvent(event);
        innerRef.current.focus();
      }
    };

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e as React.ChangeEvent<HTMLInputElement>);
    };

    // Number stepper actions
    const handleStep = (direction: "up" | "down") => {
      if (
        innerRef.current &&
        innerRef.current instanceof HTMLInputElement &&
        innerRef.current.type === "number"
      ) {
        if (direction === "up") {
          innerRef.current.stepUp();
        } else {
          innerRef.current.stepDown();
        }
        if (!isControlled) {
          setInternalValue(innerRef.current.value);
        }
        const event = new Event("input", { bubbles: true });
        innerRef.current.dispatchEvent(event);
        onChange?.({
          target: innerRef.current,
        } as unknown as React.ChangeEvent<HTMLInputElement>);
      }
    };

    // Sizing
    const sizeClasses: Record<InputSize, string> = {
      xs: "text-xs py-1 px-2.5 rounded-md h-7",
      sm: "text-xs py-1.5 px-3 rounded-lg h-8",
      md: "text-sm py-2 px-3.5 rounded-xl h-10",
      lg: "text-base py-2.5 px-4 rounded-xl h-12",
    };

    const textareaSizeClasses: Record<InputSize, string> = {
      xs: "text-xs py-1.5 px-2.5 rounded-md",
      sm: "text-xs py-2 px-3 rounded-lg",
      md: "text-sm py-2.5 px-3.5 rounded-xl",
      lg: "text-base py-3 px-4 rounded-xl",
    };

    // Calculate left padding
    const hasLeftIcon = Boolean(resolvedLeftIcon);
    const leftPaddingClass = hasLeftIcon
      ? effectiveSize === "xs"
        ? "pl-7"
        : effectiveSize === "sm"
          ? "pl-8"
          : effectiveSize === "lg"
            ? "pl-11"
            : "pl-10"
      : "";

    // Count right side actions for padding
    let rightActionCount = 0;
    if (isClearable && hasValue) rightActionCount += 1;
    if (isPassword) rightActionCount += 1;
    if (resolvedError || resolvedWarning) rightActionCount += 1;
    if (stepper && isNumber) rightActionCount += 1;
    if (rightIcon) rightActionCount += 1;

    const rightPaddingClass =
      rightActionCount >= 3
        ? "pr-24"
        : rightActionCount === 2
          ? effectiveSize === "xs"
            ? "pr-14"
            : effectiveSize === "sm"
              ? "pr-16"
              : effectiveSize === "lg"
                ? "pr-20"
                : "pr-18"
          : rightActionCount === 1
            ? effectiveSize === "xs"
              ? "pr-7"
              : effectiveSize === "sm"
                ? "pr-8"
                : effectiveSize === "lg"
                  ? "pr-11"
                  : "pr-10"
            : "";

    // Status / Validation borders & focus ring
    const borderStateClass = resolvedError
      ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 dark:border-rose-500 dark:focus:ring-rose-950/50"
      : resolvedWarning
        ? "border-amber-500 focus:border-amber-600 focus:ring-2 focus:ring-amber-200 dark:border-amber-500 dark:focus:ring-amber-950/50"
        : "border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:border-blue-500 dark:focus:ring-blue-500/20";

    const commonFieldClasses = cn(
      "w-full transition-colors duration-150 font-sans",
      "bg-white dark:bg-slate-800 text-slate-900 dark:text-white",
      "placeholder:text-slate-400 dark:placeholder:text-slate-500",
      "focus:outline-none focus:ring-offset-0",
      "disabled:bg-slate-50 dark:disabled:bg-slate-800/50 disabled:text-slate-400 dark:disabled:text-slate-500 disabled:cursor-not-allowed",
      readOnly && "bg-slate-50/70 dark:bg-slate-800/70 cursor-default",
      borderStateClass,
    );

    // Right action element
    const rightActionContent = (
      <div className="absolute inset-y-0 right-0 z-10 flex items-center pr-3 gap-1.5 text-slate-400">
        {/* Clear Button */}
        {isClearable && hasValue && (
          <button
            type="button"
            onClick={handleClear}
            tabIndex={-1}
            aria-label="Hapus teks"
            className="p-1 rounded-md transition-colors text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none"
          >
            <ClearIcon />
          </button>
        )}

        {/* Password Eye Toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1}
            aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
            className="p-1 rounded-md transition-colors text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}

        {/* Number Stepper Controls */}
        {stepper && isNumber && !resolvedDisabled && !readOnly && (
          <div className="flex flex-col border border-slate-200 dark:border-slate-700 rounded overflow-hidden">
            <button
              type="button"
              onClick={() => handleStep("up")}
              tabIndex={-1}
              aria-label="Tambah angka"
              className="px-1.5 py-0.5 text-[9px] leading-none hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
            >
              ▲
            </button>
            <button
              type="button"
              onClick={() => handleStep("down")}
              tabIndex={-1}
              aria-label="Kurangi angka"
              className="px-1.5 py-0.5 text-[9px] leading-none border-t border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
            >
              ▼
            </button>
          </div>
        )}

        {/* Status indicator icons */}
        {resolvedError ? (
          <ErrorIcon />
        ) : resolvedWarning ? (
          <WarningIcon />
        ) : null}

        {/* Custom right icon */}
        {rightIcon}
      </div>
    );

    // Input or Textarea rendering
    const inputControl = isTextarea ? (
      <div className="relative w-full">
        <textarea
          ref={innerRef as React.Ref<HTMLTextAreaElement>}
          id={resolvedId}
          rows={rows}
          disabled={resolvedDisabled}
          readOnly={readOnly}
          required={required}
          value={isControlled ? value : undefined}
          defaultValue={!isControlled ? defaultValue : undefined}
          onChange={handleChange}
          aria-invalid={Boolean(resolvedError)}
          aria-describedby={
            resolvedId && (resolvedError || helperText)
              ? `${resolvedId}-desc`
              : undefined
          }
          className={cn(
            commonFieldClasses,
            textareaSizeClasses[effectiveSize],
            "border resize-y",
            className,
          )}
          {...(props as unknown as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
        {rightActionCount > 0 && (
          <div className="absolute top-2.5 right-3 z-10 flex items-center gap-1.5 text-slate-400">
            {resolvedError ? <ErrorIcon /> : resolvedWarning ? <WarningIcon /> : null}
            {rightIcon}
          </div>
        )}
      </div>
    ) : prefix || suffix ? (
      // When Prefix or Suffix exists, wrap in an integrated compound container
      <div
        className={cn(
          "relative flex items-stretch w-full transition-colors duration-150 border rounded-xl overflow-hidden bg-white dark:bg-slate-800",
          borderStateClass,
          resolvedDisabled && "opacity-60 cursor-not-allowed bg-slate-50 dark:bg-slate-800/50",
        )}
      >
        {prefix && (
          <div className="flex items-center px-3 border-r border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 text-xs font-medium select-none shrink-0">
            {prefix}
          </div>
        )}

        <div className="relative flex-1 flex items-center">
          {hasLeftIcon && (
            <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-3 pointer-events-none text-slate-400">
              {resolvedLeftIcon}
            </div>
          )}

          <input
            ref={innerRef as React.Ref<HTMLInputElement>}
            id={resolvedId}
            type={effectiveType}
            disabled={resolvedDisabled}
            readOnly={readOnly}
            required={required}
            value={isControlled ? value : undefined}
            defaultValue={!isControlled ? defaultValue : undefined}
            onChange={handleChange}
            aria-invalid={Boolean(resolvedError)}
            aria-describedby={
              resolvedId && (resolvedError || helperText)
                ? `${resolvedId}-desc`
                : undefined
            }
            className={cn(
              "w-full bg-transparent text-slate-900 dark:text-white border-0 outline-none focus:outline-none focus:ring-0",
              "placeholder:text-slate-400 dark:placeholder:text-slate-500 font-sans",
              sizeClasses[effectiveSize],
              "border-none",
              leftPaddingClass,
              rightPaddingClass,
              className,
            )}
            {...props}
          />

          {rightActionCount > 0 && rightActionContent}
        </div>

        {suffix && (
          <div className="flex items-center px-3 border-l border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 text-xs font-medium select-none shrink-0">
            {suffix}
          </div>
        )}
      </div>
    ) : (
      // Standard input with left/right icons
      <div className="relative w-full">
        {hasLeftIcon && (
          <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-3 pointer-events-none text-slate-400">
            {resolvedLeftIcon}
          </div>
        )}

        <input
          ref={innerRef as React.Ref<HTMLInputElement>}
          id={resolvedId}
          type={effectiveType}
          disabled={resolvedDisabled}
          readOnly={readOnly}
          required={required}
          value={isControlled ? value : undefined}
          defaultValue={!isControlled ? defaultValue : undefined}
          onChange={handleChange}
          aria-invalid={Boolean(resolvedError)}
          aria-describedby={
            resolvedId && (resolvedError || helperText)
              ? `${resolvedId}-desc`
              : undefined
          }
          className={cn(
            commonFieldClasses,
            "border",
            sizeClasses[effectiveSize],
            leftPaddingClass,
            rightPaddingClass,
            className,
          )}
          {...props}
        />

        {rightActionCount > 0 && rightActionContent}
      </div>
    );

    // Helper / Error / Warning message display
    const showMessage =
      (helperText ||
        typeof resolvedError === "string" ||
        typeof resolvedWarning === "string") &&
      !formField?.id; // If FormField is wrapping this, FormField handles displaying message

    const messageText =
      typeof resolvedError === "string"
        ? resolvedError
        : typeof resolvedWarning === "string"
          ? resolvedWarning
          : helperText;

    const mainContent = (
      <div className={cn("flex flex-col w-full gap-1.5", containerClassName)}>
        {/* Label (rendered if provided and not already rendered by parent FormField) */}
        {label && !formField?.id && (
          <label
            htmlFor={resolvedId}
            className="block text-xs font-semibold text-slate-700 dark:text-white select-none"
          >
            {label}
            {required && (
              <span className="ml-1 text-rose-500 font-bold" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        {inputControl}

        {/* Helper, Warning, or Error text */}
        {showMessage && messageText && (
          <span
            id={resolvedId ? `${resolvedId}-desc` : undefined}
            className={cn(
              "text-xs mt-0.5",
              resolvedError
                ? "text-rose-500 dark:text-rose-400"
                : resolvedWarning
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-slate-500 dark:text-slate-400",
            )}
          >
            {messageText}
          </span>
        )}
      </div>
    );

    // Highlighted card container wrapper (for questionnaire, step forms)
    if (highlighted) {
      return (
        <div className="flex items-start w-full gap-4 p-4 border rounded-xl bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700">
          {badgeText && (
            <div className="flex items-center justify-center text-xs font-semibold border rounded-full w-9 h-9 shrink-0 bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-white">
              {badgeText}
            </div>
          )}
          <div className="flex-1">{mainContent}</div>
        </div>
      );
    }

    return mainContent;
  },
);

Input.displayName = "Input";
