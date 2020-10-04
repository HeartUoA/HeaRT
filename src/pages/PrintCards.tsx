import React, { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { withRouter, RouteComponentProps, useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import { useReactToPrint } from "react-to-print";
import { Button, Spin } from "antd";
import Header from "../components/Header";
import Dimension from "../components/PrintDimension";
import "../styles/PrintCards.css";
import "../styles/Footer.css";
import * as QueryString from "query-string";
import { API_DOMAIN } from "../config";
import {
  Dimension as DimensionType,
  createDimension,
} from "../types/dimension";

const PracticeBGColour = "#ffc4d3";
const BeliefBGColour = "#c4ddff";

interface ParamTypes {
  chartID: string;
}

interface DimensionProps {
  passAllDimensions: DimensionType[] | undefined;
}

class ComponentToPrint extends React.Component<DimensionProps> {
  render() {
    const allDimensions =
      this.props.passAllDimensions && this.props.passAllDimensions;
    if (allDimensions) {
      return (
        <div>
          {allDimensions.map((currElement: any, index: number) => (
            <>
              <div
                className="PrintingCards"
                style={
                  allDimensions[index].type === "Practice"
                    ? { backgroundColor: PracticeBGColour }
                    : { backgroundColor: BeliefBGColour }
                }
              >
                <span className="Print-Card-Text-TopLeft">{index + 1}</span>
                <span className="Print-Card-Text">
                  {index % 2
                    ? allDimensions[index].rightCard.statement
                    : allDimensions[index].leftCard.statement}
                </span>
              </div>
              <div className="PrintingCards">
                <Dimension
                  dimensionValue={index}
                  secondStatement={false}
                  allDimensions={allDimensions[index]}
                />
              </div>
              <div
                className="PrintingCards"
                style={
                  allDimensions && allDimensions[index].type === "Practice"
                    ? { backgroundColor: PracticeBGColour }
                    : { backgroundColor: BeliefBGColour }
                }
              >
                <span className="Print-Card-Text-TopLeft">{index + 1}</span>
                <span className="Print-Card-Text">
                  {index % 2
                    ? allDimensions[index].leftCard.statement
                    : allDimensions[index].rightCard.statement}
                </span>
              </div>
              <div className="PrintingCards">
                <Dimension
                  dimensionValue={index}
                  secondStatement={true}
                  allDimensions={allDimensions[index]}
                />
              </div>
            </>
          ))}
        </div>
      );
    } else {
      return (
        <div className="DisplayCards">
          <Header />
          <div className="Loading-Spinner">
            <Spin size="large" />
          </div>
        </div>
      );
    }
  }
}

const PrintCards: React.FC<RouteComponentProps> = (props) => {
  const [cookies] = useCookies(["accessToken"]);
  const { chartID } = useParams<ParamTypes>();
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
    console.log(chartID);
    fetch(`${API_DOMAIN}dimensions/forchart/${params.chartID}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies["accessToken"]}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
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
    props.history.push("/Dashboard");
  };

  return (
    <div className="PrintCards">
      <div className="Header">
        <Header />
      </div>
      <div className="PrintCardsContainer">
        <div className="PrintCardsContent">
          <ComponentToPrint
            ref={componentRef}
            passAllDimensions={allDimensions}
          />
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
