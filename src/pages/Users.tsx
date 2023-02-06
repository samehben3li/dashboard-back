import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import DashboardHeader from '../components/DashboardHeader';
import AddUser from '../components/User/AddUserWrapper';
import { UserItem } from '../components/User';
import { IUser } from '../interfaces';
import { GET_USERS } from '../requests/queries';
import Table from '../components/Table';
import { theadsOfUsers } from '../utils/constants';
import Content from '../components/Content';
import Error from '../components/Error';

function Users() {
  const [alertAddUser, setAlertAddUser] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [err, setErr] = useState({ status: false, message: '' });
  const { data, error } = useQuery(GET_USERS);

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
      {err.status && <Error message={err.message} />}
      <Table theads={theadsOfUsers}>
        {users?.map((user, index) => (
          <UserItem
            key={user.id}
            user={user}
            setUsers={setUsers}
            index={index}
          />
        ))}
      </Table>
    </Content>
  );
}

export default Users;
