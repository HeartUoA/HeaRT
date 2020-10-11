import React, { useState, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import md5 from "md5";
import { useCookies } from "react-cookie";

import { Button, Input, Typography } from "antd";

import { API_DOMAIN } from "../config";
import Header from "../components/Header";
import "../styles/Login.css";

const USERNAME_EMPTY = "Please enter your username.";
const PASSWORD_EMPTY = "Please enter your password.";
const INCORRECT_LOGIN = "Username and/or password is incorrect.";

const Login: React.FC<RouteComponentProps> = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["accessToken"]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (cookies["accessToken"]) {
      props.history.push("/Dashboard");
    }
  }, [cookies]);

  const onConfirmClick = async (): Promise<void> => {
    if (username && password) {
      const hashedPassword = md5(password);
      const response = await fetch(
        `${API_DOMAIN}users/authenticate/${username}`,
        {
          method: "POST",
          body: JSON.stringify({ passwordHash: hashedPassword }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const res = await response.json().catch((e) => setError(INCORRECT_LOGIN));
      if (res && res.accessToken) {
        setCookie("accessToken", res.accessToken);
        setError("");
        props.history.push("/Dashboard");
      } else {
        setError(INCORRECT_LOGIN);
      }
    } else {
      if (!username) {
        setError(USERNAME_EMPTY);
      } else {
        setError(PASSWORD_EMPTY);
      }
    }
  };

  const onSignupClick = () => {
    props.history.push("/SignUp");
  };

  const handleKeypress = (key: string) => {
    if (key === "Enter") {
      onConfirmClick();
    }
  };

  return (
    <div className="Login">
      <Header />
      <div className="Login-Content">
        <div className="Login-Panel">
          <Typography className="Login-Header-Text">Login</Typography>
          <Typography className="Create-Account-Text">
            Don't have an account?
            <span className="Link-Text" onClick={onSignupClick}>
              Sign up here!
            </span>
          </Typography>
          <div className="Login-Input-Container">
            <div>
              <Typography className="Login-Label-Text">Username</Typography>
              <Input
                className={`Login-Input ${
                  (error === USERNAME_EMPTY || error === INCORRECT_LOGIN) &&
                  "Error"
                }`}
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={(e) => handleKeypress(e.key)}
              />
            </div>
            <div>
              <Typography className="Login-Label-Text">Password</Typography>
              <Input
                className={`Login-Input ${
                  (error === PASSWORD_EMPTY || error === INCORRECT_LOGIN) &&
                  "Error"
                }`}
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => handleKeypress(e.key)}
              />
            </div>
          </div>
          <Button
            type="primary"
            className="Login-Button"
            onClick={onConfirmClick}
          >
            Login
          </Button>
          {error ? (
            <Typography className="Error-Message-Text">{error}</Typography>
          ) : (
            <div style={{ height: 40 }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
