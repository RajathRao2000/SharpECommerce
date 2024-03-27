import classes from "./ProfileForm.module.css";
import googleApiKey from "../../keys";
import { useContext, useRef } from "react";
import { Variables } from "../context/Variables";
// import { useHistory } from "react-router";

const ProfileForm = () => {
  const { apiToken } = useContext(Variables);
  const enteredPassword = useRef();
  // const history = useHistory();

  const handleChangePassword = (e) => {
    e.preventDefault();
    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${googleApiKey}`,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: apiToken,
          password: enteredPassword.current.value,
          returnSecureToken: true,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    ).then((res) => {
      // setIsLoading(false);
      if (res.ok) {
        // history.replace("/");
        res.json().then((res) => {
        });
      } else {
        return res.json().then((data) => {
          //show an error modal
          alert(data.error.message);
          console.log(data);
        });
      }
    });
  };

  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={enteredPassword} />
      </div>
      <div className={classes.action}>
        <button onClick={handleChangePassword}>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
