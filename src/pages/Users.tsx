import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import DashboardHeader from '../components/DashboardHeader';
import AddUser from '../components/User/AddUserWrapper';
import User from '../components/User/UserItem';
import { IUser } from '../interfaces';
import GET_USERS from '../requests/queries';

function Users() {
  const [alertAddUser, setAlertAddUser] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const { data } = useQuery(GET_USERS);
  const { t } = useTranslation();

  useEffect(() => {
    setUsers(data?.getUsers);
  }, [data]);

  return (
    <div className="content">
      <DashboardHeader
        btnText={`${t('header.NEW_USER')}`}
        onClick={() => setAlertAddUser(true)}
      />
      {alertAddUser && (
        <AddUser setAlertAddUser={setAlertAddUser} setUsers={setUsers} />
      )}
      <div className="content-container">
        <div className="content-header">
          <h2>{`${t('titles.USERS_LIST')}`}</h2>
        </div>

        <table>
          <thead>
            <th>{`${t('login.ID')}`}</th>
            <th>{`${t('login.USERNAME')}`}</th>
            <th>{`${t('login.EMAIL')}`}</th>
            <th>{`${t('login.IS_ADMIN')}`}</th>
            <th>{`${t('actions.UPDATE')}`}</th>
            <th>{`${t('actions.DELETE')}`}</th>
          </thead>

          {users?.length > 0 ? (
            <tbody>
              {users?.map((user, index) => (
                <User
                  key={user.id}
                  user={user}
                  setUsers={setUsers}
                  index={index}
                />
              ))}
            </tbody>
          ) : null}
        </table>
      </div>
    </div>
  );
}

export default Users;
