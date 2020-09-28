import React, { useState, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import md5 from "md5";
import { useCookies } from "react-cookie";

import { Button, Input, Typography } from "antd";

import { API_DOMAIN } from "../config";
import Header from "../components/Header";
import "../styles/Login.css";

const Login: React.FC<RouteComponentProps> = (props) => {
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ cookies, setCookie ] = useCookies(['accessToken']);
  const [ error, setError ] = useState(false);

  useEffect(() => {
    if (cookies['accessToken']) {
      props.history.push("/Dashboard");
    }
  }, []);

  const onConfirmClick = async (): Promise<void> => {
    const hashedPassword = md5(password);
    const response = await fetch(`${API_DOMAIN}users/authenticate/${username}`, {
      method: "POST",
      body: JSON.stringify({ passwordHash : hashedPassword }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    const res = await response.json();
    if (res && res.accessToken) {
      setCookie('accessToken', res.accessToken);
      setError(false);
      props.history.push("/Dashboard");
    } else {
      setError(!error);
    }
  };

  const onSignupClick = () => {
    // TODO: Write code here to redirect back to create account page
    // props.history.push("URL-HERE")
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
              <Typography className="Login-Label-Text">
                Username or email
              </Typography>
              <Input className={`Login-Input ${error && "Error"}`} name="usernameEmail" value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <div>
              <Typography className="Login-Label-Text">Password</Typography>
              <Input className={`Login-Input ${error && "Error"}`} name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
          </div>
          <Button
            type="primary"
            className="Login-Button"
            onClick={onConfirmClick}
          >
            Login
          </Button>
          {error ?
            <Typography className="Error-Message-Text">
              Username and/or password is incorrect.
            </Typography>
            : <div style={{height: 40}} />
            }
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
