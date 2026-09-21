import { createContext, useContext } from 'react';
import type { RadioSize, RadioVariant, RadioLabelPosition } from './Radio';

export interface RadioGroupContextValue {
  name?: string;
  value?: string;
  onChange: (value: string) => void;
  size?: RadioSize;
  variant?: RadioVariant;
  labelPosition?: RadioLabelPosition;
  disabled?: boolean;
  required?: boolean;
  isInvalid?: boolean;
}

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export const useRadioGroup = () => useContext(RadioGroupContext);
