import React, { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { withRouter, RouteComponentProps } from "react-router-dom";
import ReactToPrint from "react-to-print";
import { useReactToPrint } from "react-to-print";
import { Button, Spin } from "antd";
import Header from "../components/Header";
import PrintDimensionCards from "../components/PrintDimensionCards";
import "../styles/PrintCards.css";
import "../styles/Footer.css";
import * as QueryString from "query-string";
import { API_DOMAIN } from "../config";
import {
  Dimension as DimensionType,
  createDimension,
} from "../types/dimension";

const PrintCards: React.FC<RouteComponentProps> = (props) => {
  const [cookies] = useCookies(["accessToken"]);
  const [allDimensions, setAllDimensions] = useState<
    DimensionType[] | undefined
  >(undefined);

  const params = QueryString.parse(props.location.search);
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    if (!cookies["accessToken"]) {
      props.history.push("/Login");
    }

    fetch(`${API_DOMAIN}dimensions/forchart/${params.chartID}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies["accessToken"]}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          setAllDimensions([]);
          props.history.push("/Dashboard");
        } else {
          return res.json();
        }
      })
      .then((res) => {
        setAllDimensions(
          res.map((dimension: any) => {
            return createDimension(dimension);
          })
        );
      })
      .catch((e) => console.log(e));
  }, [cookies]);

  const onBackClick = async (): Promise<void> => {
    //Once queries are implemented in courses page
    // props.history.push(`/Course?chartID=${params.chartID}`);
    props.history.push(`/Course/${params.courseID}`);
  };

  if (allDimensions) {
    return (
      <div className="PrintCards">
        <div className="Header">
          <Header />
        </div>
        <div className="PrintCardsContainer">
          <div className="PrintCardsContent">
            <PrintDimensionCards
              ref={componentRef}
              passAllDimensions={allDimensions}
            />
          </div>
        </div>
        <div className="Footer">
          <Button
            type="primary"
            className="Footer-Button"
            onClick={onBackClick}
          >
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
  } else {
    return (
      <div className="PrintCards">
        <Header />
        <div className="Print-Cards-Loading-Spinner">
          <Spin size="large" />
        </div>
      </div>
    );
  }
};

export default withRouter(PrintCards);
