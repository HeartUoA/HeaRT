import React from "react";
import logo from "../assets/images/logo.svg";
import "../styles/CourseInfo.css";

const CourseInfo: React.FC = () => {
  const onConfirmClick = () => {
    // TODO: Write code here to redirect to cards screen
  };

  return (
    <div className="Course-Info">
      <div className="Temp-Header">
        <img src={logo} className="Logo" alt="logo" />
        <p className="Logo-Title">HeaRT</p>
      </div>
      <div className="Main-Container">
        <p className="Create-Chart-Text">Create Chart</p>
        <div className="Form-Container">
          <div>
            <label>
              <p className="Form-Text">Course Name</p>
              <input className="Form-Input" type="text" name="courseName" />
            </label>
            <label>
              <p className="Form-Text">Role in Course</p>
              <input className="Form-Input" type="text" name="courseRole" />
            </label>
          </div>
          <div className="Number-Form">
            <label>
              <p className="Form-Text">Course Age</p>
              <input
                className="Form-Input Number-Input"
                type="number"
                name="courseName"
                value="0"
              />
            </label>
            <label className="Cohort-Size-Label">
              <p className="Form-Text">Cohort Size</p>
              <input
                className="Form-Input Number-Input"
                type="number"
                name="courseName"
                value="0"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
