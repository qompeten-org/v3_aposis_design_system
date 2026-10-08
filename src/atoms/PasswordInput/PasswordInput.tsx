import { forwardRef } from 'react';
import { Input, InputProps } from '../Input/Input';

export interface PasswordInputProps extends Omit<InputProps, 'type'> {}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (props, ref) => {
    return <Input ref={ref} type="password" {...props} />;
  }
);

PasswordInput.displayName = 'PasswordInput';