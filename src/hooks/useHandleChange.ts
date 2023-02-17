import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { IUser } from '../interfaces';

const useHandleChange = (setState: Dispatch<SetStateAction<IUser>>) => {
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
