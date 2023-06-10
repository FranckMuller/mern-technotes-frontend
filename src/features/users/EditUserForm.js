import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApi";
import { ROLES } from "config/roles";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const EditUserForm = ({ user }) => {
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(user.roles);
  const [active, setActive] = useState(user.active);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onChangeUsername = (e) => setUsername(e.target.value);
  const onChangePassword = (e) => setPassword(e.farget.value);
  const onChangeActive = () => setActive((prev) => !prev);

  const onChangeRoles = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoles(values);
  };

  const onSubmitForm = async () => {
    if (password) {
      await updateUser({ id: user.id, username, password, roles, active });
    } else {
      await updateUser({ id: user.id, username, roles, active });
    }
  };

  const onDeleteUser = async () => {
    await deleteUser({ id: user.id });
  };

  let canSave;
  if (password) {
    canSave =
      [validPassword, validUsername, roles.length].every(Boolean) && !isLoading;
  } else {
    canSave = [validUsername, roles.length].every(Boolean) && !isLoading;
  }

  const options = Object.values(ROLES).map((role) => (
    <option key={role} value={role}>
      {role}
    </option>
  ));

  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validUsernameClass = !validUsername ? "form-input--incomplete" : "";
  const validPasswordClass =
    password && !validPassword ? "form-input--incomplete" : "";
  const validRolesClass = !Boolean(roles.length)
    ? "form-input--incomplete"
    : "";

  const errContent = (error?.data?.message || delError?.data?.message) ?? "";

  return (
    <>
      <p className={"errClass"}>{error?.data?.message}</p>

      <form onSubmit={onSubmitForm}>
        <h2>Edit User</h2>

        <div>
          <label htmlFor="username">Username: [3-20 letters]</label>
          <input
            className={validUsernameClass}
            name="username"
            id="username"
            autoComplete="off"
            value={username}
            onChange={onChangeUsername}
          />
        </div>

        <div>
          <label htmlFor="password">Password: [4-12 chars incl. !@#$%]</label>
          <input
            className={validPasswordClass}
            name="password"
            id="password"
            autoComplete="off"
            value={password}
            onChange={onChangePassword}
          />
        </div>

        <div>
          <label htmlFor="roles">Assigned Roles:</label>
          <select
            className={validRolesClass}
            name="roles"
            id="roles"
            multiple={true}
            size="3"
            value={roles}
            onChange={onChangeRoles}
          >
            {options}
          </select>
        </div>

        <div>
          <label htmlFor="user-active">Active:</label>
          <input
            type="checkbox"
            id="useractive"
            name="user-active"
            checked={active}
            onChange={onChangeActive}
          />
        </div>

        <button title="Save" disabled={!canSave}>
          Save
        </button>
        
        <button title="delete" type='button' disabled={canSave} onClick={onDeleteUser}>delete</button>
      </form>
    </>
  );
};

export default EditUserForm;
