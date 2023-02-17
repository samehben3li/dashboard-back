import React, { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { inputsOfLogin } from '../utils/constants';
import { Button, Error, InputGroup, Logo, Main } from '../components/common';
import { useLogin } from '../hooks';

function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState({ status: false, message: '' });
  const { loading, handleLogin } = useLogin(setError);
  const { t } = useTranslation();

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
        <Button
          isSubmit
          className="btn btn-primary"
          disabled={loading}
          onClick={undefined}
        >
          {loading ? '...' : t('login.LOGIN')}
        </Button>
      </form>
    </Main>
  );
}

export default Login;
