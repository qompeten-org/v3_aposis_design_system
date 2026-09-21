import { createContext, useContext } from 'react';

export interface FormFieldContextValue {
  /** ID generated or supplied by FormField for the control element */
  id?: string;
  /** Validation error message string */
  error?: string;
  /** Helper text string */
  helperText?: string;
  /** Whether the field is marked as required */
  required?: boolean;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Computed flag indicating an active error condition */
  isInvalid?: boolean;
}

export const FormFieldContext = createContext<FormFieldContextValue | null>(null);

/**
 * Hook to consume parent FormField context within atom controls (Input, Radio, RadioGroup, Checkbox, etc.)
 */
export const useFormField = (): FormFieldContextValue | null => {
  return useContext(FormFieldContext);
};
