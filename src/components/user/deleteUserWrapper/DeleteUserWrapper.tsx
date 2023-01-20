import { useMutation } from '@apollo/client';
import { Dispatch, SetStateAction, useState } from 'react';
import IUser from '../../../interfaces';
import { DELETE_USER } from '../../../requests/mutations';

interface IProps {
  username: string;
  id: string;
  setAlertDelete: Dispatch<SetStateAction<boolean>>;
  setUsers: Dispatch<SetStateAction<IUser[]>>;
}

function DeleteUserWrapper({ username, id, setAlertDelete, setUsers }: IProps) {
  const [deleteUser, { loading }] = useMutation(DELETE_USER);
  const [error, setError] = useState(false);
  const handleDelete = async () => {
    setError(false);
    try {
      const responseMutation = await deleteUser({
        variables: {
          id,
        },
      });
      if (responseMutation?.data?.deleteUser === 'USER_DELETED') {
        setUsers(prev => prev?.filter(u => u.id !== id));
        setAlertDelete(false);
      }
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="alert-container">
      <div className="alert-wrapper">
        {error && <span className="error">something went wrong</span>}
        <span className="question">do you want to delete {username} ?</span>
        <div className="btns">
          <button
            type="button"
            className="btn btn-cancel"
            onClick={() => setAlertDelete(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-delete"
            onClick={handleDelete}
            disabled={loading}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteUserWrapper;
