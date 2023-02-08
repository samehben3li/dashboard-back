import React, { Dispatch, SetStateAction, useState } from 'react';
import { IUser } from '../../interfaces';
import DoneIcon from '../../assets/icons/DoneIcon';
import CancelIcon from '../../assets/icons/CancelIcon';
import DeleteUserWrapper from './DeleteUserWrapper';
import UpdateUserWrapper from './UpdateUserWrapper';
import Actions from '../Actions';

interface IProps {
  user: IUser;
  index: number;
  setUsers: Dispatch<SetStateAction<IUser[]>>;
}

function UserItem({ user, setUsers, index }: IProps) {
  const [alertDelete, setAlertDelete] = useState(false);
  const [alertUpdate, setAlertUpdate] = useState(false);

  return (
    <tr>
      <td>
        {alertDelete && (
          <DeleteUserWrapper
            username={user.username as string}
            id={user.id as string}
            setAlertDelete={setAlertDelete}
            setUsers={setUsers}
          />
        )}
        {alertUpdate && (
          <UpdateUserWrapper setAlertUpdate={setAlertUpdate} user={user} />
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
        <div>{user.isAdmin ? <DoneIcon /> : <CancelIcon />}</div>
      </td>
      <Actions
        updateAction={() => setAlertUpdate(true)}
        deleteAction={() => setAlertDelete(true)}
      />
    </tr>
  );
}

export default UserItem;
