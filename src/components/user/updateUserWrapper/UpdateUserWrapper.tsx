import { Dispatch, SetStateAction } from 'react';

interface IProps {
  setAlertUpdate: Dispatch<SetStateAction<boolean>>;
}

function UpdateUserWrapper({ setAlertUpdate }: IProps) {
  return (
    <div className="alert-container">
      <div className="alert-wrapper">
        <div className="alert-title">Update user</div>
        <div className="hr" />
        <form className="update-user-form">
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
              onClick={() => setAlertUpdate(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-add" value="Update">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateUserWrapper;
