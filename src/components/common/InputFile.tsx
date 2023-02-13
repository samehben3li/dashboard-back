import React, { ChangeEvent, ReactNode } from 'react';

interface IProps {
  id: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  children: ReactNode;
}

function InputFile({ id, children, onChange }: IProps) {
  return (
    <label htmlFor={id}>
      {children}
      <input
        type="file"
        className="hidden"
        accept="image/png, image/svg+xml, image/jpeg, image/jpg"
        id={id}
        onChange={onChange}
      />
    </label>
  );
}

export default InputFile;
