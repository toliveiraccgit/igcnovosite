import React from "react";
import "./Inputs.scss";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Component
import InputField from "./InputField/InputField";

export default function Inputs() {
  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <h1 className="header-title">Inputs</h1>
        </div>
      </header>

      <div className="section">
        {/* Default */}
        <Row>
          <h1 className="InputsTitle">Default</h1>
        </Row>

        {/* Enabled */}
        <Row className="mt-5 alignVCenter">
          <Col lg={2} className="RowTitle">
            Enabled
          </Col>
          <Col lg={3}>
            <InputField
              label="Text"
              type="Default"
              toUse="Text"
              placeholder="olivia@untitledui.com"
            />
          </Col>
          <Col lg={3}>
            <InputField
              label="Email"
              type="Default"
              toUse="Email"
              placeholder="olivia@untitledui.com"
            />
          </Col>
          <Col lg={3}></Col>
        </Row>

        {/* Disabled */}
        <Row className="mt-5 alignVCenter">
          <Col lg={2} className="RowTitle">
            Disabled
          </Col>
          <Col lg={3}>
            <InputField
              label="Text"
              type="Default"
              toUse="Text"
              placeholder="olivia@untitledui.com"
              disabled={true}
            />
          </Col>
          <Col lg={3}>
            <InputField
              label="Email"
              type="Default"
              toUse="Email"
              placeholder="olivia@untitledui.com"
              disabled={true}
            />
          </Col>
        </Row>

        <hr />

        {/* Text area */}
        <Row>
          <h1 className="InputsTitle">Text area</h1>
        </Row>

        {/* Enabled */}
        <Row className="mt-5 alignVCenter">
          <Col lg={2} className="RowTitle">
            Enabled
          </Col>
          <Col lg={6}>
            <InputField
              label="Text"
              type="TextArea"
              placeholder="olivia@untitledui.com"
            />
          </Col>
        </Row>

        {/* Disabled */}
        <Row className="mt-5 alignVCenter">
          <Col lg={2} className="RowTitle">
            Disabled
          </Col>
          <Col lg={6}>
            <InputField
              label="Text"
              type="TextArea"
              placeholder="olivia@untitledui.com"
              disabled={true}
            />
          </Col>
        </Row>
      </div>
    </>
  );
}
