import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { Button, Input, Layout, Select, Typography, Form } from "antd";

import Header from "../components/Header";
import "../styles/CourseInfo.css";

const { Option } = Select;

const CourseInfo: React.FC<RouteComponentProps> = (props) => {
  const onConfirmClick = () => {
    // Redirect to cards screen
    props.history.push("/DisplayCards");
  };

  const onCancelClick = () => {
    // Redirect back to homepage
    props.history.push("/");
  };

  return (
    <div className="Course-Info">
      <Header />

      <Layout.Content className="Main-Container">
        <Form className="Form-Container" onFinish={onConfirmClick}>
          <Typography className="Create-Chart-Text">Create Chart</Typography>
          <div>
            <div>
              <Typography className="Form-Text">Course Name</Typography>
              <Form.Item
                name="courseNameFormItem"
                rules={[{ required: true, message: "Course Name Required" }]}
              >
                <Input
                  className="Form-Input"
                  name="courseName"
                  placeholder="e.g SOFTENG 761"
                />
              </Form.Item>
            </div>
            <div>
              <Typography className="Form-Text">Your Role in Course</Typography>
              <Form.Item
                name="courseRoleFormItem"
                rules={[{ required: true, message: "Course Role Required" }]}
              >
                <Input
                  className="Form-Input"
                  name="courseRole"
                  placeholder="e.g Course Coordinator"
                />
              </Form.Item>
            </div>
          </div>
          <div className="Select-Form">
            <div>
              <Typography className="Form-Text">Course Age</Typography>
              <Form.Item
                className="Selector"
                name="courseAgeFormItem"
                rules={[{ required: true, message: "Course Age Required" }]}
              >
                <Select placeholder="Select">
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
              </Form.Item>
            </div>
            <div className="Cohort-Size-Label">
              <Typography className="Form-Text">Cohort Size</Typography>
              <Form.Item
                className="Selector"
                name="cohortSizeFormItem"
                rules={[{ required: true, message: "Cohort Size Required" }]}
              >
                <Select placeholder="Select">
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
              </Form.Item>
            </div>
          </div>
          <div className="Button-Container">
            <Form.Item className="Confirm-Button">
              <Button type="primary" htmlType="submit" className="Nav-Button">
                <Typography className="Button-Font">Confirm</Typography>
              </Button>
            </Form.Item>
            <Button
              type="primary"
              className="Nav-Button"
              onClick={onCancelClick}
            >
              <Typography className="Button-Font">Cancel</Typography>
            </Button>
          </div>
        </Form>
      </Layout.Content>
    </div>
  );
};

export default withRouter(CourseInfo);
