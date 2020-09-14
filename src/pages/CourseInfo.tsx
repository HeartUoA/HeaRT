import React from "react";

import { Button, Dropdown, Input, Layout, Menu, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";

import Header from "../components/Header";
import "../styles/CourseInfo.css";

const CourseInfo: React.FC = () => {
  const onConfirmClick = () => {
    // TODO: Write code here to redirect to cards screen
  };

  const onCancelClick = () => {
    // TODO: Write code here to redirect back to homepage
  };

  const courseAgeDropdown = (
    <Menu>
      <Menu.Item>New Course</Menu.Item>
      <Menu.Item>3 years or less</Menu.Item>
      <Menu.Item>More than 3 years</Menu.Item>
    </Menu>
  );

  const cohortSizeDropdown = (
    <Menu>
      <Menu.Item>
        <Typography className="Right-Menu-Item">Less than 20</Typography>
      </Menu.Item>
      <Menu.Item>
        <Typography className="Right-Menu-Item">20-49</Typography>
      </Menu.Item>
      <Menu.Item>
        <Typography className="Right-Menu-Item">50-100</Typography>
      </Menu.Item>
      <Menu.Item>
        <Typography className="Right-Menu-Item">More than 100</Typography>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="Course-Info">
      <Header />

      <Layout.Content className="Main-Container">
        <Typography className="Create-Chart-Text">Create Chart</Typography>
        <div className="Form-Container">
          <div>
            <div>
              <Typography className="Form-Text">Course Name</Typography>
              <Input
                className="Form-Input"
                name="courseName"
                placeholder="e.g SOFTENG 761"
              />
            </div>
            <div>
              <Typography className="Form-Text">Your Role in Course</Typography>
              <Input
                className="Form-Input"
                name="courseRole"
                placeholder="e.g Course Coordinator"
              />
            </div>
          </div>
          <div className="Dropdown-Form">
            <div>
              <Typography className="Form-Text">Course Age</Typography>
              <Dropdown overlay={courseAgeDropdown} placement="bottomLeft">
                <Button className="Dropdown-Button">
                  <Typography className="Form-Input Dropdown-Text">
                    Select{" "}
                  </Typography>
                  <DownOutlined className="Down-Arrow-Right" />
                </Button>
              </Dropdown>
            </div>
            <div className="Cohort-Size-Label">
              <Typography className="Form-Text">Cohort Size</Typography>
              <Dropdown overlay={cohortSizeDropdown} placement="bottomRight">
                <Button className="Dropdown-Button">
                  <Typography className="Form-Input Dropdown-Text">
                    Select
                  </Typography>
                  <DownOutlined className="Down-Arrow-Left" />
                </Button>
              </Dropdown>
            </div>
          </div>
        </div>
        <div className="Button-Container">
          <Button
            type="primary"
            className="Navigation-Button"
            onClick={onConfirmClick}
          >
            <Typography className="Button-Text">Confirm</Typography>
          </Button>
          <Button
            type="primary"
            className="Navigation-Button Cancel-Button"
            onClick={onCancelClick}
          >
            <Typography className="Button-Text">Cancel</Typography>
          </Button>
        </div>
      </Layout.Content>
    </div>
  );
};

export default CourseInfo;
