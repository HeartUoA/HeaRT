import React, { useEffect, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { useCookies } from "react-cookie";
import md5 from "md5";

import { API_DOMAIN } from "../config";

import { Button, Input, Layout, Divider, Typography } from "antd";

import Header from "../components/Header";
import "../styles/Signup.css";

const ALL_FIELDS_SET = "All fields must be filled before proceeding.";
const PASSWORD_MATCH = "Passwords should match.";
const UNAVAILABLE_USERNAME = "Username is taken. Please enter a new one.";

// Users can create a new account on this page. It has error-checking in place to notify the user of any invalid details.
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

  // If the user is already logged in, redirect to their Dashboard
  useEffect(() => {
    if (cookies["accessToken"]) {
      props.history.push("/Dashboard");
    }
  }, [cookies]);

  // Create a new user account if all the conditions are met
  const onCreateClick = async (): Promise<void> => {
    if (password !== confirmPassword) {
      setError(PASSWORD_MATCH); // Passwords do not match
      return;
    } else if (
      !username ||
      !password ||
      !password ||
      !fullName ||
      !institution ||
      !dept ||
      !position
    ) {
      setError(ALL_FIELDS_SET); // All required fields are not set
      return;
    }

    const hashedPassword = md5(password); // Hash the password before passing it over the network for security purposes
    const user = {
      username: username,
      name: fullName,
      createdAt: Date.now(),
      institution: institution,
      department: dept,
      position: position,
      email: email,
      passwordHash: hashedPassword,
    };

    // POST request to create new user
    const responseSignup = await fetch(`${API_DOMAIN}users/`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (responseSignup.status === 409) {
      // Duplicate username error
      setError(UNAVAILABLE_USERNAME);
      return;
    } else if (responseSignup.status !== 200) {
      return;
    }

    // If creation of user is successful then automatically log them into their account
    const responseLogin = await fetch(
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

    // Redirect user to Dashboard after successfully authenticating
    const res = await responseLogin.json().catch((e) => setError(e));
    if (res && res.accessToken) {
      setCookie("accessToken", res.accessToken);
      setError("");
      props.history.push("/Dashboard");
    }
  };

  // Redirect to Login page
  const onLoginClick = () => {
    props.history.push("/Login");
  };

  return (
    <div className="Account">
      <Header />

      <Layout.Content className="Account-Content">
        <div className="Account-Panel">
          <Typography className="Account-Title">Sign up</Typography>
          <Typography className="Create-Account-Text">
            Already a member?
            <span className="Link-Text" onClick={onLoginClick}>
              Log in!
            </span>
          </Typography>

          <Typography className="Account-Sub-Label">Login details</Typography>

          <div>
            <Typography className="Account-Label-Text">
              Email address
            </Typography>
            <Input
              className={`Account-Input ${
                error === ALL_FIELDS_SET && !email && "Error"
              }`}
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <Typography className="Account-Label-Text">Username</Typography>
            <Input
              className={`Account-Input ${
                ((error === ALL_FIELDS_SET && !username) ||
                  error === UNAVAILABLE_USERNAME) &&
                "Error"
              }`}
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <Typography className="Account-Label-Text">Password</Typography>
            <Input
              className={`Account-Input ${
                error === ALL_FIELDS_SET && !password && "Error"
              }`}
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
              className={`Account-Input ${
                ((error === ALL_FIELDS_SET && !confirmPassword) ||
                  password !== confirmPassword) &&
                "Error"
              }`}
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <Divider></Divider>

          <Typography className="Account-Sub-Label">
            General information
          </Typography>

          <div>
            <Typography className="Account-Label-Text">Full name</Typography>
            <Input
              className={`Account-Input ${
                error === ALL_FIELDS_SET && !fullName && "Error"
              }`}
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
              className={`Account-Input ${
                error === ALL_FIELDS_SET && !institution && "Error"
              }`}
              name="username"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
            />
          </div>

          <div>
            <Typography className="Account-Label-Text">Department</Typography>
            <Input
              className={`Account-Input ${
                error === ALL_FIELDS_SET && !dept && "Error"
              }`}
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
              className={`Account-Input ${
                error === ALL_FIELDS_SET && !position && "Error"
              }`}
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

          {error || password !== confirmPassword ? (
            <Typography className="Error-Message-Text">
              {!error ? PASSWORD_MATCH : error}
            </Typography>
          ) : (
            <div style={{ height: 40 }} />
          )}
        </div>
      </Layout.Content>
    </div>
  );
};

export default withRouter(Signup);
