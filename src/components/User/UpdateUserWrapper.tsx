import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { useMutation } from '@apollo/client';
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
      setError({ status: true, message: 'something went wrong !' });
    }
  };

  return (
    <div className="alert-container">
      <div className="alert-wrapper">
        <div className="alert-title">Update user</div>
        <div className="hr" />
        <form onSubmit={handleUpdate}>
          {error.status && <span className="error">{error.message}</span>}
          <div className="field">
            <span>username : </span>
            <input
              type="text"
              name="username"
              placeholder="username"
              onChange={e => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="field">
            <span>email : </span>
            <input
              type="text"
              name="email"
              placeholder="email"
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="field">
            <span>password : </span>
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="btns">
            <button
              type="button"
              className="btn btn-cancel"
              onClick={() => setAlertUpdate(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-add" disabled={loading}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateUserWrapper;
