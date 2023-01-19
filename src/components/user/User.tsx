import { useState } from 'react';
import IUser from '../../interfaces';
import DoneIcon from '../../assets/icons/done.svg';
import CancelIcon from '../../assets/icons/cancel.svg';
import DeleteUserWrapper from './deleteUserWrapper/DeleteUserWrapper';

interface IProps {
  user: IUser;
  index: number;
}

function User({ user, index }: IProps) {
  const [alertDelete, setAlertDelete] = useState(false);

  return (
    <tr>
      <td>
        {alertDelete && (
          <DeleteUserWrapper
            username={user.username}
            id={user.id}
            setAlertDelete={setAlertDelete}
          />
        )}
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
        <div className="icon-container update">
          <i className="fa-solid fa-pen-to-square icon icon-update" />
        </div>
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
