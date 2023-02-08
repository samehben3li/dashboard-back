import { useMutation } from '@apollo/client';
import { Dispatch, FormEvent, SetStateAction } from 'react';
import { IError, IUser } from '../interfaces';
import { LOGIN } from '../requests/mutations';
import useAuth from './useAuth';

const useLogin = (setError: Dispatch<SetStateAction<IError>>) => {
  const [login, { loading }] = useMutation(LOGIN);
  const { authLogin } = useAuth();
  const handleLogin = async (
    e: FormEvent<HTMLFormElement>,
    credentials: IUser,
  ) => {
    e.preventDefault();
    setError({ status: false, message: '' });
    try {
      const mutationResponse = await login({
        variables: {
          ...credentials,
        },
      });
      if (mutationResponse?.data?.login?.user?.isAdmin) {
        authLogin(mutationResponse?.data?.login?.accessToken);
      }
      setError({ status: true, message: 'NOT_AUTHORIZED' });
    } catch ({ message }) {
      setError({
        status: true,
        message: message as string | 'INCORRECT_CREDENTIALS',
      });
    }
  };
  return {
    handleLogin,
    loading,
  };
};

export default useLogin;
