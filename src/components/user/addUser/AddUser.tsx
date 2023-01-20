import { Dispatch, SetStateAction } from 'react';
import '../style.css';

interface IProps {
  setAlertAddUser: Dispatch<SetStateAction<boolean>>;
}

function AddUser({ setAlertAddUser }: IProps) {
  return (
    <div className="alert-container">
      <div className="alert-wrapper">
        <span className="alert-title">Information of new user</span>
        <div className="hr" />
        <form className="add-user-form">
          <div className="field">
            <span>username : </span>
            <input type="text" name="username" placeholder="username" />
          </div>
          <div className="field">
            <span>email : </span>
            <input type="text" name="email" placeholder="email" />
          </div>
          <div className="field">
            <span>password : </span>
            <input type="password" name="password" placeholder="password" />
          </div>
          <div className="btns">
            <button
              type="button"
              className="btn btn-cancel"
              onClick={() => setAlertAddUser(false)}
            >
              Cancel
            </button>
            <input type="submit" className="btn btn-add" value="Add" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
