import React, { useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { withRouter, RouteComponentProps } from "react-router-dom";
import ReactToPrint from "react-to-print";
import { useReactToPrint } from "react-to-print";
import { Button } from "antd";
import Header from "../components/Header";
import Dimension from "../components/PrintDimension";
import "../styles/PrintCards.css";
import "../styles/Footer.css";
import { API_DOMAIN } from "../config";

import charts from "../dummyData/charts";

const chartID = "";

class ComponentToPrint extends React.Component {
  render() {
    const allDimensions = charts[0].dimensions;
    return (
      <div>
        {allDimensions.map((currElement, index) => (
          <>
            <div className="PrintingCards">
              <span className="Print-Card-Text">
                {index % 2
                  ? allDimensions[index].rightCard.statement
                  : allDimensions[index].leftCard.statement}
              </span>
            </div>
            <div className="PrintingCards">
              <Dimension dimensionVallue={index} />
            </div>
            <div className="PrintingCards">
              <span className="Print-Card-Text">
                {index % 2
                  ? allDimensions[index].leftCard.statement
                  : allDimensions[index].rightCard.statement}
              </span>
            </div>
            <div className="PrintingCards">
              <Dimension dimensionVallue={index} />
            </div>
          </>
        ))}
      </div>
    );
  }
}

const PrintCards: React.FC<RouteComponentProps> = (props) => {
  const [cookies] = useCookies(["accessToken"]);

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    if (!cookies["accessToken"]) {
      props.history.push("/Login");
    }

    //Set up later to get data not from dummy
    fetch(`${API_DOMAIN}dimensions/forchart/${chartID}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        //Get data and set it to Dimensions
      })
      .catch((e) => console.log(e));
  }, [cookies]);

  const onBackClick = async (): Promise<void> => {
    props.history.push("/Dashboard");
  };

  return (
    <div className="PrintCards">
      <div className="Header">
        <Header />
      </div>
      <div className="PrintCardsContainer">
        <div className="PrintCardsContent">
          <ComponentToPrint ref={componentRef} />
        </div>
      </div>
      <div className="Footer">
        <Button type="primary" className="Footer-Button" onClick={onBackClick}>
          Back
        </Button>
        <Button type="primary" className="Footer-Button">
          <ReactToPrint
            trigger={() => {
              // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
              // to the root node of the returned component as it will be overwritten.
              return <a href="#">Print</a>;
            }}
            content={() => componentRef.current}
          />
        </Button>
      </div>
    </div>
  );
};

export default withRouter(PrintCards);
