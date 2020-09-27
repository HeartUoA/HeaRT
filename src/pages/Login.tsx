import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import { Button, Input, Typography } from "antd";

import Header from "../components/Header";
import "../styles/Login.css";

const Login: React.FC = (props) => {
  let [ username, setUsername ] = useState("");
  let [ password, setPassword ] = useState("");

  const onConfirmClick = () => {
    // TODO: Write code here to try logging in (if successful - dashboard, if error then display error)
    const response = fetch(`https://localhost:9000/api/users/authenticate/${username}`, {
      method: "POST",
      body: JSON.stringify({passwordHash: password}),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    response.then(res => console.log(res.json())).catch(e => console.log(e));
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
              <Input className="Login-Input" name="usernameEmail" value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <div>
              <Typography className="Login-Label-Text">Password</Typography>
              <Input className="Login-Input" name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
          </div>
          <Button
            type="primary"
            className="Login-Button"
            onClick={onConfirmClick}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
