import { Dispatch, SetStateAction } from 'react';
import IUser from '../../interfaces';
import DoneIcon from '../../assets/icons/done.svg';
import CancelIcon from '../../assets/icons/cancel.svg';

interface IProps {
  user: IUser;
  index: number;
  setUsers: Dispatch<SetStateAction<[IUser] | []>>;
}

function User({ user, index, setUsers }: IProps) {
  return (
    <tr>
      <td>
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
        <div className="icon-container delete">
          <i className="fa-sharp fa-solid fa-trash icon icon-delete" />
        </div>
      </td>
    </tr>
  );
}

export default User;
