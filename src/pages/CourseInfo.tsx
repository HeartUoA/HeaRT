import React from "react";

import { Button, Input, Layout, Menu, Select, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";

import Header from "../components/Header";
import "../styles/CourseInfo.css";

const { Option } = Select;

const CourseInfo: React.FC = () => {
  const onConfirmClick = () => {
    // TODO: Write code here to redirect to cards screen
  };

  const onCancelClick = () => {
    // TODO: Write code here to redirect back to homepage
  };

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
          <div className="Select-Form">
            <div>
              <Typography className="Form-Text">Course Age</Typography>
              <Select className="Selector" placeholder="Select">
                <Option value="new">
                  <span className="Selection-Text">New course</span>
                </Option>
                <Option value="three">
                  <span className="Selection-Text">3 years or less</span>
                </Option>
                <Option value="more">
                  <span className="Selection-Text">More than 3 years</span>
                </Option>
              </Select>
            </div>
            <div className="Cohort-Size-Label">
              <Typography className="Form-Text">Cohort Size</Typography>
              <Select className="Selector" placeholder="Select">
                <Option value="less">
                  <span className="Selection-Text Selection-Text-Right">
                    Less than 20
                  </span>
                </Option>
                <Option value="twenty">
                  <span className="Selection-Text Selection-Text-Right">
                    20-49
                  </span>
                </Option>
                <Option value="fifty">
                  <span className="Selection-Text Selection-Text-Right">
                    50-100
                  </span>
                </Option>
                <Option value="hundred">
                  <span className="Selection-Text Selection-Text-Right">
                    More than 100
                  </span>
                </Option>
              </Select>
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
