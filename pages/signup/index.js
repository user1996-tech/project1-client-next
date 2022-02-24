import React, { useState } from "react";
// import "./SignUpScreen.css";
import styles from "../../styles/SignUpScreen.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { signUp } from "../../public/global";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/router";

const SignUpScreen = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameValid, setUsernameValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  //   const navigate = useNavigate();
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username === "") {
      setUsernameValid(true);
      setErrorMessage("Fill out all fields");
    }
    if (password === "") {
      setPasswordValid(true);
      setErrorMessage("Fill out all fields");
    }

    if (password !== "" && username !== "") {
      setUsername("");
      setPassword("");

      const response = await signUp(username, password);
      if (response === "error") {
        setErrorMessage("Username has already been taken, choose another!");
      } else {
        setErrorMessage("");
        // navigate("/");
        router.push("/");
      }
    }
  };
  return (
    <div className={styles.signUpScreen}>
      <h1 className={styles.title}>Sign Up</h1>

      <div className={styles.errorMessageContainer}>{errorMessage}</div>
      <form className={styles.form}>
        <TextField
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
            if (usernameValid) {
              setUsernameValid(false);
            }
          }}
          variant="filled"
          label="Username"
          focused
          sx={{ input: { color: "white" } }}
          InputLabelProps={{
            className: "textfield__label",
          }}
          error={usernameValid}
        />
        <TextField
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            if (passwordValid) {
              setPasswordValid(false);
            }
          }}
          variant="filled"
          label="Password"
          sx={{ input: { color: "white" } }}
          InputLabelProps={{
            className: "textfield__label",
          }}
          error={passwordValid}
        />
        <Button
          type="submit"
          variant="contained"
          onClick={handleSubmit}
          className={styles.button}
        >
          Sign Up
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="error"
          className={styles.button}
          onClick={() => {
            // navigate("/");
            router.push("/");
          }}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default SignUpScreen;
