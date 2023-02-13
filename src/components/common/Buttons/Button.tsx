import React, { ReactNode } from 'react';

interface IProps {
  isSubmit: boolean | undefined;
  className: string;
  children: ReactNode | string;
  onClick: (() => void) | undefined;
  disabled: boolean | false;
}

function Button({ children, isSubmit, ...props }: IProps) {
  return (
    <button type={isSubmit ? 'submit' : 'button'} {...props}>
      {children}
    </button>
  );
}

export default Button;
