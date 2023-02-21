import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import AddUser from '../components/User/AddUserWrapper';
import { UserItem } from '../components/User';
import { IError, IUser } from '../interfaces';
import { GET_USERS } from '../requests/queries';
import { theadsOfUsers } from '../utils/constants';
import { Container, DashboardHeader } from '../components/common';

interface IPropsContainer {
  err: IError;
  users: IUser[];
  setUsers: Dispatch<SetStateAction<IUser[]>>;
}

function UsersContainer({ users, setUsers, err }: IPropsContainer) {
  const [alertAddUser, setAlertAddUser] = useState(false);
  return (
    <Container
      title="titles.USERS_LIST"
      dashboardHeader={
        <DashboardHeader
          btnText="header.NEW_USER"
          setOpenedAlert={setAlertAddUser}
        />
      }
      theads={theadsOfUsers}
      error={err}
    >
      {alertAddUser && (
        <AddUser setAlertAddUser={setAlertAddUser} setUsers={setUsers} />
      )}
      {users?.map((user, index) => (
        <UserItem key={user.id} user={user} setUsers={setUsers} index={index} />
      ))}
    </Container>
  );
}

function Users() {
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

  return <UsersContainer users={users} setUsers={setUsers} err={err} />;
}

export default Users;
