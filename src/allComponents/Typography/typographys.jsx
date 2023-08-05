import React from "react";
import "./typographys.scss";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Components

import Typography from "./Typography/Typography";

// Components Mobile (Somente para exemplo, os componentes já estão responsivos)
import {
  Headline1Mob,
  Headline2Mob,
  Headline3Mob,
  Headline4Mob,
  Body1Mob,
  Body2Mob,
  Body3Mob,
} from "./mobile/Contents";

export default function typographys() {
  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <h1 className="header-title">Typography</h1>
        </div>
      </header>

      <div className="section">
        {/* Headlines */}
        <Row>
          <Col lg={4} sm={12}>
            <p className="row-title">Headlines</p>
          </Col>
          <Col lg={4} sm={12}>
            <p className="col-title">Desktop</p>
            <Row>
              <Typography text={"Headline 1"} FontStyle="Headline1" />
              <span>Semi Bold, 72/76</span>
            </Row>
            <Row>
              <Typography text={"Headline 2"} FontStyle="Headline2" />
              <span>Bold, 60/90</span>
            </Row>
            <Row>
              <Typography text={"Headline 3"} FontStyle="Headline3" />
              <span>Semi Bold, 40/50</span>
            </Row>
            <Row>
              <Typography text={"Headline 4"} FontStyle="Headline4" />
              <span>Semi Bold, 32/50</span>
            </Row>
            <Row>
              <Typography text={"Headline 5"} FontStyle="Headline5" />
              <span>Medium, 20/28</span>
            </Row>
            <Row>
              <Typography text={"Headline 6"} FontStyle="Headline6" />
              <span>Semi Bold, 18/20</span>
            </Row>
          </Col>
          <Col lg={4} sm={12}>
            <p className="col-title">Mobile</p>
            <Row>
              <Headline1Mob text={"Headline 1"} />
              <span>Semi Bold, 35/40</span>
            </Row>
            <Row>
              <Headline2Mob text={"Headline 2"} />
              <span>Bold, 30/30</span>
            </Row>
            <Row>
              <Headline3Mob text={"Headline 3"} />
              <span>Semi Bold, 24/26</span>
            </Row>
            <Row>
              <Headline4Mob text={"Headline 4"} />
              <span>Semi Bold, 20/26</span>
            </Row>
          </Col>
        </Row>

        <hr />

        {/* Body */}
        <Row>
          <Col lg={4} sm={12}>
            <p className="row-title">Body</p>
          </Col>
          <Col lg={4} sm={12}>
            <p className="col-title">Desktop</p>
            <Row>
              <Typography text={"Body 1"} FontStyle="Body1" />
              <span>Regular, 18/30</span>
            </Row>
            <Row>
              <Typography text={"Body 2"} FontStyle="Body2" />
              <span>Regular, 16/24</span>
            </Row>
            <Row>
              <Typography text={"Body 3"} FontStyle="Body3" />
              <span>Regular, 14/20</span>
            </Row>
          </Col>
          <Col lg={4} sm={12}>
            <p className="col-title">Mobile</p>
            <Row>
              <Body1Mob text={"Body 1"} />
              <span>Regular, 16/30</span>
            </Row>
            <Row>
              <Body2Mob text={"Body 2"} />
              <span>Regular, 14/24</span>
            </Row>
            <Row>
              <Body3Mob text={"Body 3"} />
              <span>Regular, 12/20</span>
            </Row>
          </Col>
        </Row>

        <hr />

        {/* Button / Link */}
        <Row>
          <Col lg={4} sm={12}>
            <p className="row-title">Button / Link</p>
          </Col>
          <Col lg={4} sm={12}>
            <p className="col-title">Desktop</p>
            <Row>
              <Typography text={"Normal"} FontStyle="Normal" />
              <span>Semi Bold, 18/24</span>
            </Row>
            <Row>
              <Typography text={"Medium"} FontStyle="Medium" />
              <span>Semi Bold, 16/20</span>
            </Row>
            <Row>
              <Typography text={"Small"} FontStyle="Small" />
              <span>Semi Bold, 14/16</span>
            </Row>
          </Col>
          <Col lg={4} sm={12}>
            <p className="col-title">Mobile</p>
            <Row>
              <Typography text={"Normal"} FontStyle="Normal" />
              <span>Semi Bold, 18/24</span>
            </Row>
            <Row>
              <Typography text={"Medium"} FontStyle="Medium" />
              <span>Semi Bold, 16/20</span>
            </Row>
            <Row>
              <Typography text={"Small"} FontStyle="Small" />
              <span>Semi Bold, 14/16</span>
            </Row>
          </Col>
        </Row>

        <hr />

        {/* Fields */}
        <Row>
          <Col lg={4} sm={12}>
            <p className="row-title">Fields</p>
          </Col>
          <Col lg={4} sm={12}>
            <p className="col-title">Desktop</p>
            <Row>
              <Typography text={"Text 1"} FontStyle="Text1" />
              <span>Regular, 16/24</span>
            </Row>
            <Row>
              <Typography text={"Text 2"} FontStyle="Text2" />
              <span>Regular, 12/16</span>
            </Row>
          </Col>
          <Col lg={4} sm={12}>
            <p className="col-title">Mobile</p>
            <Row>
              <Typography text={"Text 1"} FontStyle="Text1" />
              <span>Regular, 16/24</span>
            </Row>
            <Row>
              <Typography text={"Text 2"} FontStyle="Text2" />
              <span>Regular, 12/16</span>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
}
