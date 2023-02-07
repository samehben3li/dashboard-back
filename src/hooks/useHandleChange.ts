import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { ICredentials } from '../interfaces';

const useHandleChange = (setState: Dispatch<SetStateAction<ICredentials>>) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  return handleChange;
};

export default useHandleChange;
