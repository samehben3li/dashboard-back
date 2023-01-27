import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { IUser } from '../../interfaces';
import { UPDATE_USER } from '../../requests/mutations';

interface IProps {
  setAlertUpdate: Dispatch<SetStateAction<boolean>>;
  user: IUser;
}

function UpdateUserWrapper({ setAlertUpdate, user }: IProps) {
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ status: false, message: '' });
  const [updateUserMutation, { loading }] = useMutation(UPDATE_USER);
  const { t } = useTranslation();

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError({ status: false, message: '' });
    try {
      await updateUserMutation({
        variables: {
          id: user.id,
          username,
          email,
          password,
        },
      });
      setAlertUpdate(false);
    } catch (err) {
      // i will add error handler after merging pr of backend (rendring new error)
      setError({ status: true, message: 'SOMETHING_WENT_WRONG' });
    }
  };

  return (
    <div className="alert-container">
      <div className="alert-wrapper">
        <div className="alert-title">{`${t('titles.UPDATE_USER')}`}</div>
        <div className="hr" />
        <form onSubmit={handleUpdate}>
          {error.status && (
            <span className="error">{`${t(`errors.${error.message}`)}`}</span>
          )}
          <div className="field">
            <span>{`${t('login.USERNAME')}`} : </span>
            <input
              type="text"
              name="username"
              placeholder={`${t('login.USERNAME')}`}
              onChange={e => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="field">
            <span>{`${t('login.EMAIL')}`} : </span>
            <input
              type="text"
              name="email"
              placeholder={`${t('login.EMAIL')}`}
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="field">
            <span>{`${t('login.PASSWORD')}`} : </span>
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
              onClick={() => setAlertUpdate(false)}
            >
              {`${t('actions.CANCEL')}`}
            </button>
            <button
              type="submit"
              className="btn btn-add full-width"
              disabled={loading}
            >
              {`${t('actions.UPDATE')}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateUserWrapper;
