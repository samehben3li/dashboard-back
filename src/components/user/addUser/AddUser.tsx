import { useMutation } from '@apollo/client';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import IUser from '../../../interfaces';
import { ADD_USER } from '../../../requests/mutations';
import '../style.css';

interface IProps {
  setAlertAddUser: Dispatch<SetStateAction<boolean>>;
  setUsers: Dispatch<SetStateAction<IUser[]>>;
}

function AddUser({ setAlertAddUser, setUsers }: IProps) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ status: false, message: '' });
  const [createUser, { loading }] = useMutation(ADD_USER);

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
    } catch (err) {
      setError({ status: true, message: 'this information already exist !' });
    }
  };

  return (
    <div className="alert-container">
      <div className="alert-wrapper">
        <span className="alert-title">Information of new user</span>
        <div className="hr" />
        <form className="add-user-form" onSubmit={handleAddUser}>
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
              onClick={() => setAlertAddUser(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-add" disabled={loading}>
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
