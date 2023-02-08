import React, { ChangeEvent, ReactNode, RefObject } from 'react';

interface IProps {
  id: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  children: ReactNode;
  ref: RefObject<HTMLInputElement> | undefined;
}

function InputFile({ id, children, ...props }: IProps) {
  return (
    <label htmlFor={id}>
      {children}
      <input
        type="file"
        className="hidden"
        accept="image/png, image/svg+xml, image/jpeg, image/jpg"
        id={id}
        {...props}
      />
    </label>
  );
}

export default InputFile;
