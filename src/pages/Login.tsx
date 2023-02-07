import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import Logo from '../components/Logo';
import Error from '../components/Error';
import { inputsOfLogin } from '../utils/constants';
import useLogin from '../hooks/useLogin';
import Main from '../components/Main';

interface IPropsInput {
  type: string;
  name: string;
  className: string;
  placeholder: string;
  setCredentials: Dispatch<SetStateAction<{ email: string; password: string }>>;
  value: string;
}

interface IPropsButton {
  loading: boolean;
}

function InputGroup({ setCredentials, placeholder, ...props }: IPropsInput) {
  const { t } = useTranslation();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="input-group">
      <input
        {...props}
        onChange={handleChange}
        placeholder={`${t(placeholder)}`}
      />
      <div className="input-icon" />
    </div>
  );
}

function ButtonLogin({ loading }: IPropsButton) {
  const { t } = useTranslation();
  return (
    <button type="submit" className="btn btn-primary" disabled={loading}>
      {loading ? '...' : t('login.LOGIN')}
    </button>
  );
}

function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState({ status: false, message: '' });
  const { loading, handleLogin } = useLogin(setError);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) =>
    handleLogin(e, credentials);

  return (
    <Main>
      <Logo />
      <form onSubmit={handleSubmit}>
        {error.status && <Error message={error.message} />}
        {inputsOfLogin.map(input => (
          <InputGroup
            {...input}
            setCredentials={setCredentials}
            value={
              input.name === 'email' ? credentials.email : credentials.password
            }
          />
        ))}
        <ButtonLogin loading={loading} />
      </form>
    </Main>
  );
}

export default Login;
