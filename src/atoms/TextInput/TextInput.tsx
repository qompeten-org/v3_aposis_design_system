import { forwardRef } from 'react';
import { Input, InputProps } from '../Input/Input';

export interface TextInputProps extends InputProps {}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
    return <Input ref={ref} {...props} />;
  }
);

TextInput.displayName = 'TextInput';