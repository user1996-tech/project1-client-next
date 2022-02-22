import React, { useState, useRef, useEffect } from "react";
// import "./LoginScreen.css";
import styles from "../styles/LoginScreen.module.css";
// import "../styles/LoginScreen.css";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/router";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { login, checkLoggedIn } from "../public/global";

const LoginScreen = () => {
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
      const response = await login(username, password);
      if (response === "error") {
        setErrorMessage("Wrong username and password combination");
        setUsername("");
        setPassword("");
      } else {
        setErrorMessage("");

        document.cookie = `username=${response.username}; expires=Thu, 01 Jan 2023 00:00:01 GMT;`;
        document.cookie = `id=${response.id}; expires=Thu, 01 Jan 2023 00:00:01 GMT;`;

        // navigate(`/dashboard`);
        router.push("/DashboardScreen");
      }
    }
  };

  useEffect(() => {
    // checkLoggedIn(router);
  }, []);

  return (
    <div className={styles.loginScreen}>
      <h1 className={styles.title}>Login</h1>

      <div className={styles.errorMessageContainer}>{errorMessage}</div>
      <form className={styles.form}>
        <TextField
          name="username"
          variant="filled"
          label="Username"
          focused
          sx={{ input: { color: "white" } }}
          InputLabelProps={{
            className: styles.textfield_label,
          }}
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
            if (usernameValid) {
              setUsernameValid(false);
            }
          }}
          error={usernameValid}
        />
        <TextField
          name="password"
          variant="filled"
          label="Password"
          sx={{ input: { color: "white" } }}
          InputLabelProps={{
            className: styles.textfield_label,
          }}
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            if (passwordValid) {
              setPasswordValid(false);
            }
          }}
          error={passwordValid}
        />
        <Button
          type="submit"
          variant="contained"
          onClick={handleSubmit}
          className={styles.button}
        >
          Login
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="warning"
          onClick={() => {
            // navigate("/signup");
            router.push("/signup");
          }}
          className={styles.button}
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default LoginScreen;
