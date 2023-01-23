import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import DashboardHeader from '../../components/dashboardHeader/DashboardHeader';
import AddUser from '../../components/user/addUser/AddUser';
import User from '../../components/user/User';
import IUser from '../../interfaces';
import { GET_USERS } from '../../requests/queries';

function Users() {
  const [alertAddUser, setAlertAddUser] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const { data } = useQuery(GET_USERS);

  useEffect(() => {
    setUsers(data?.getUsers);
  }, [data]);

  return (
    <div className="dashboard-content">
      <DashboardHeader
        btnText="New User"
        onClick={() => setAlertAddUser(true)}
      />
      {alertAddUser && (
        <AddUser setAlertAddUser={setAlertAddUser} setUsers={setUsers} />
      )}
      <div className="dashboard-content-container">
        <div className="dashboard-content-header">
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
