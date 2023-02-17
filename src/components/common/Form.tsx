import React, { Dispatch, FormEvent, ReactNode, SetStateAction } from 'react';
import { IError } from '../../interfaces';
import Buttons from './Buttons/Buttons';
import Error from './Error';

interface IPropsForm {
  children: ReactNode;
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  setOpenedAlert: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  action: string;
  error: IError;
}

function Form({ children, error, onSubmit, ...btnProps }: IPropsForm) {
  return (
    <form onSubmit={onSubmit}>
      {error.status && <Error message={error.message} />}
      {children}
      <Buttons isSubmit onClick={undefined} {...btnProps} />
    </form>
  );
}

export default Form;
