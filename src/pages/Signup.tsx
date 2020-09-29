import React, { useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { useCookies } from "react-cookie";
import md5 from "md5";

import { API_DOMAIN } from "../config";

import { Button, Input, Layout, Divider, Typography } from "antd";

import Header from "../components/Header";
import "../styles/Signup.css";

const PASSWORD_MATCH = "Password should match.";

const Signup: React.FC<RouteComponentProps> = (props) => {
  const [cookies, setCookie] = useCookies(["accessToken"]);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [fullName, setFullname] = useState("");
  const [institution, setInstitution] = useState("");
  const [dept, setDept] = useState("");
  const [position, setPosition] = useState("");

  const [error, setError] = useState("");

  const onCreateClick = async (): Promise<void> => {
    // TODO
  };

  return (
    <div className="Account">
      <Header />

      <Layout.Content className="Account-Content">
        <div className="Account-Panel">
          <Typography className="Account-Title">Sign up</Typography>

          <div>
            <Typography className="Account-Label-Text">
              Email address
            </Typography>
            <Input
              className="Account-Input"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <Typography className="Account-Label-Text">Username</Typography>
            <Input
              className="Account-Input"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <Typography className="Account-Label-Text">Password</Typography>
            <Input
              className="Account-Input"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <Typography className="Account-Label-Text">
              Re-type password
            </Typography>
            <Input
              className="Account-Input"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {confirmPassword !== password ? (
            <Typography className="Error-Message-Text">
              {PASSWORD_MATCH}
            </Typography>
          ) : (
            <div style={{ height: 40 }} />
          )}

          <Divider></Divider>

          <div>
            <Typography className="Account-Label-Text">Full name</Typography>
            <Input
              className="Account-Input"
              name="fullName"
              value={fullName}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>

          <div>
            <Typography className="Account-Label-Text">
              Educational institution
            </Typography>
            <Input
              className="Account-Input"
              name="username"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
            />
          </div>

          <div>
            <Typography className="Account-Label-Text">Department</Typography>
            <Input
              className="Account-Input"
              name="dept"
              value={dept}
              onChange={(e) => setDept(e.target.value)}
            />
          </div>

          <div>
            <Typography className="Account-Label-Text">
              Position/Role
            </Typography>
            <Input
              className="Account-Input"
              name="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>

          <Button
            type="primary"
            className="Account-Button"
            onClick={onCreateClick}
          >
            Create account
          </Button>

          {error ? (
            <Typography className="Error-Message-Text">{error}</Typography>
          ) : (
            <div style={{ height: 40 }} />
          )}
        </div>
      </Layout.Content>
    </div>
  );
};

export default withRouter(Signup);
