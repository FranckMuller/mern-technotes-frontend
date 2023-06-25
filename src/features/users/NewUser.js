import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewUserMutation } from "./users-api";
import { ROLES } from "config/roles";

import styles from "./styles/new-user.module.scss";

const USER_REGEX = /^[A-z0-9]{3,20}$/;
const PWD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const NewUserForm = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(["Employee"]);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, navigate]);

  const onChangeUsername = (e) => setUsername(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);

  const onChangeRoles = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoles(values);
  };

  const canSave =
    [validUsername, validPassword, roles.length].every(Boolean) && !isLoading;

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewUser({ username, password, roles });
    }
  };

  const options = Object.values(ROLES).map((role) => (
    <option key={role} value={role}>
      {role}
    </option>
  ));

  const errClass = isError ? "errmsg" : "offscreen";
  const validUsernameClass = !validUsername ? "incomplete-input" : "";
  const validPasswordClass = !validPassword ? "incomplete-input" : "";
  const validRolesClass = !Boolean(roles.length) ? "incomplete-input" : "";

  return (
    <div className={styles["new-user"]}>
      <form onSubmit={onSubmitForm}>
        <h2 className={styles["title"]}>New User</h2>

        <div className={styles["form-control"]}>
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

        <div className={styles["form-control"]}>
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

        <div className={styles["form-control"]}>
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

        <div className={styles["button-wrapper"]}>
          <button
            className={styles["save-button"]}
            title="Save"
            disabled={!canSave}
          >
            Save
          </button>
          <p className={"errClass"}>{error?.data?.message}</p>
        </div>
      </form>
    </div>
  );
};

export default NewUserForm;
