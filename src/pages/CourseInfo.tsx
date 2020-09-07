import React from 'react';
import logo from '../assets/images/logo.svg';
import '../styles/CourseInfo.css';

const CourseInfo: React.FC = () => {

  return (
    <div className="Course-Info">
        <div className="Temp-Header">
            <img src={logo} className="Logo" alt="logo"/>
            <p className="Logo-Title">HeaRT</p>
        </div>
        <div className="Main-Container">
            <p className="Create-Chart-Text">Create Chart</p>
        </div>
        
    </div>
  );
};

export default CourseInfo;
