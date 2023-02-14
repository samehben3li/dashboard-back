import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { IUser } from '../../interfaces';
import { ADD_USER } from '../../requests/mutations';

interface IProps {
  setAlertAddUser: Dispatch<SetStateAction<boolean>>;
  setUsers: Dispatch<SetStateAction<IUser[]>>;
}

function AddUserWrapper({ setAlertAddUser, setUsers }: IProps) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ status: false, message: '' });
  const [createUser, { loading }] = useMutation(ADD_USER);
  const { t } = useTranslation();

  const handleAddUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError({ status: false, message: '' });
    try {
      const response = await createUser({
        variables: {
          username,
          email,
          password,
        },
      });
      if (response?.data?.createUser) {
        setUsers(prev => [...prev, response?.data?.createUser]);
        setAlertAddUser(false);
      }
    } catch ({ message }) {
      setError({
        status: true,
        message: (message as string) || 'SOMETHING_WENT_WRONG',
      });
    }
  };

  return (
    <div className="alert-container">
      <div className="alert-wrapper">
        <span className="alert-title">{t('titles.NEW_USER_INFO')}</span>
        <div className="hr" />
        <form onSubmit={handleAddUser}>
          {error.status && (
            <span className="error">{t(`errors.${error.message}`)}</span>
          )}
          <div className="field">
            <span>{t('login.USERNAME')} : </span>
            <input
              type="text"
              name="username"
              placeholder={`${t('login.USERNAME')}`}
              onChange={e => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="field">
            <span>{t('login.EMAIL')} : </span>
            <input
              type="text"
              name="email"
              placeholder={`${t('login.EMAIL')}`}
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="field">
            <span>{t('login.PASSWORD')} : </span>
            <input
              type="password"
              name="password"
              placeholder={`${t('login.PASSWORD')}`}
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="btns">
            <button
              type="button"
              className="btn btn-cancel full-width"
              onClick={() => setAlertAddUser(false)}
            >
              {t('actions.CANCEL')}
            </button>
            <button
              type="submit"
              className="btn btn-add full-width"
              disabled={loading}
            >
              {t('actions.CREATE')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUserWrapper;
