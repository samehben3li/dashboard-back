function AddUser() {
  return (
    <div className="add-user-container">
      <div className="add-user-wrapper">
        <span className="add-user-title">Information of new user</span>
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
          <div className="add-user-btns">
            <div className="add-user-btn">Cancel</div>
            <input
              type="submit"
              className="add-user-btn btn-submit"
              value="Add"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
