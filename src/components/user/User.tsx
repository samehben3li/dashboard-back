import { Dispatch, SetStateAction, useState } from 'react';
import IUser from '../../interfaces';
import DoneIcon from '../../assets/icons/done.svg';
import CancelIcon from '../../assets/icons/cancel.svg';
import DeleteUserWrapper from './deleteUserWrapper/DeleteUserWrapper';
import UpdateUserWrapper from './updateUserWrapper/UpdateUserWrapper';

interface IProps {
  user: IUser;
  index: number;
  setUsers: Dispatch<SetStateAction<IUser[]>>;
}

function User({ user, setUsers, index }: IProps) {
  const [alertDelete, setAlertDelete] = useState(false);
  const [alertUpdate, setAlertUpdate] = useState(false);

  return (
    <tr>
      <td>
        {alertDelete && (
          <DeleteUserWrapper
            username={user.username}
            id={user.id}
            setAlertDelete={setAlertDelete}
            setUsers={setUsers}
          />
        )}
        {alertUpdate && <UpdateUserWrapper setAlertUpdate={setAlertUpdate} />}
        <span>{index + 1}</span>
      </td>
      <td>
        <span>{user.username}</span>
      </td>
      <td>
        <span>{user.email}</span>
      </td>
      <td>
        <div>
          {user.isAdmin ? (
            <img
              src={DoneIcon}
              alt="paid-icon"
              className="dashboard-content-icon"
            />
          ) : (
            <img
              src={CancelIcon}
              alt="canceled-icon"
              className="dashboard-content-icon"
            />
          )}
        </div>
      </td>
      <td>
        <button
          type="button"
          className="icon-container update"
          onClick={() => setAlertUpdate(true)}
        >
          <i className="fa-solid fa-pen-to-square icon icon-update" />
        </button>
      </td>
      <td>
        <button
          type="button"
          className="icon-container delete"
          onClick={() => setAlertDelete(true)}
        >
          <i className="fa-sharp fa-solid fa-trash icon icon-delete" />
        </button>
      </td>
    </tr>
  );
}

export default User;
