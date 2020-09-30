import { Slider, Switch } from 'antd';
import React from 'react';
import { useCookies } from 'react-cookie';
import { RouteComponentProps } from 'react-router-dom';
import "../styles/PrintDimension.css";


const PrintDimension: React.FC = () => {

    return (
      <>
        <span className="printDimensionText">Pedagogical Dimension:</span>
        <span className="printTitleText">Nature & purpose of learning tasks</span>
        <span className="printContinuumText">Continuum:</span>
        <div className="ContiuumStatements">
            <span className="printSliderText">Academic/Abstract</span>
            <span className="printSliderText">Authentic/experimental</span>
        </div>
        <Slider className="printSlider" range defaultValue={[0, 100]} disabled={true} />
        <span className="printStatementText">Statement reflects 'Academic/abstract' purpose</span>
      </>
    );
  
}

export default PrintDimension;