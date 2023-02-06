import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import DashboardHeader from '../components/DashboardHeader';
import AddUser from '../components/User/AddUserWrapper';
import { UserItem } from '../components/User';
import { IUser } from '../interfaces';
import { GET_USERS } from '../requests/queries';
import Table from '../components/Table';
import { theadsOfUsers } from '../utils/constants';
import Content from '../components/Content';

function Users() {
  const [alertAddUser, setAlertAddUser] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [err, setErr] = useState({ status: false, message: '' });
  const { data, error } = useQuery(GET_USERS);
  const { t } = useTranslation();

  useEffect(() => {
    setErr(
      error?.message
        ? { status: true, message: error.message }
        : { status: false, message: '' },
    );
    setUsers(data?.getUsers);
  }, [data, error]);

  return (
    <Content
      title="titles.USERS_LIST"
      dashboardHeader={
        <DashboardHeader
          btnText="header.NEW_USER"
          onClick={() => setAlertAddUser(true)}
        />
      }
    >
      {alertAddUser && (
        <AddUser setAlertAddUser={setAlertAddUser} setUsers={setUsers} />
      )}
      {err.status && (
        <span className="error">{`${t(`errors.${err.message}`)}`}</span>
      )}
      <Table theads={theadsOfUsers}>
        {users?.length > 0
          ? users?.map((user, index) => (
              <UserItem
                key={user.id}
                user={user}
                setUsers={setUsers}
                index={index}
              />
            ))
          : null}
      </Table>
    </Content>
  );
}

export default Users;
