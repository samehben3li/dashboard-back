import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import DashboardHeader from '../components/DashboardHeader';
import AddUser from '../components/User/AddUserWrapper';
import User from '../components/User/UserItem';
import { IUser } from '../interfaces';
import GET_USERS from '../requests/queries';

function Users() {
  const [alertAddUser, setAlertAddUser] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const { data } = useQuery(GET_USERS);

  useEffect(() => {
    setUsers(data?.getUsers);
  }, [data]);

  return (
    <div className="content">
      <DashboardHeader
        btnText="New User"
        onClick={() => setAlertAddUser(true)}
      />
      {alertAddUser && (
        <AddUser setAlertAddUser={setAlertAddUser} setUsers={setUsers} />
      )}
      <div className="content-container">
        <div className="content-header">
          <h2>Users List</h2>
        </div>

        <table>
          <thead>
            <th>ID</th>
            <th>USERNAME</th>
            <th>EMAIL</th>
            <th>IS ADMIN</th>
            <th>UPDATE</th>
            <th>DELETE</th>
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
