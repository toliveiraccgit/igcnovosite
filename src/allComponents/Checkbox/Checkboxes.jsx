import React, { useState } from "react";
import "./Checkboxes.scss";

// Component
import Checkbox from "./Checkbox/Checkbox";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Checkboxes() {
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedExemple, setIsCheckedExemple] = useState(true);

  const handleCheckboxChange = (checked) => {
    setIsChecked(checked);
  };

  const handleCheckboxChangeExemple = (checked) => {
    setIsCheckedExemple(!checked);
  };

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <h1 className="header-title">Checkboxes</h1>
        </div>
      </header>

      <div className="section">
        {/* Default */}
        <Row>
          <h1 className="CheckboxTitle">Default</h1>
        </Row>

        {/* Enabled */}
        <Row className="mt-5 alignVCenter">
          <Col lg={2} className="RowTitle">
            Enabled
          </Col>
          <Col lg={1}>
            <Checkbox
              checked={isChecked}
              onChange={handleCheckboxChange}
              format="square"
            />
          </Col>
          <Col lg={1}>
            <Checkbox
              checked={isCheckedExemple}
              onChange={handleCheckboxChangeExemple}
              format="square"
            />
          </Col>
          <Col lg={1}>
            <Checkbox
              checked={isChecked}
              onChange={handleCheckboxChange}
              format="circle"
            />
          </Col>
          <Col lg={1}>
            <Checkbox
              checked={isCheckedExemple}
              onChange={handleCheckboxChangeExemple}
              format="circle"
            />
          </Col>
        </Row>

        {/* Disabled */}
        <Row className="mt-5 alignVCenter">
          <Col lg={2} className="RowTitle">
            Disabled
          </Col>
          <Col lg={1}>
            <Checkbox
              checked={isChecked}
              onChange={handleCheckboxChange}
              format="square"
              disabled={true}
            />
          </Col>
          <Col lg={1}>
            <Checkbox
              checked={isCheckedExemple}
              onChange={handleCheckboxChangeExemple}
              format="square"
              disabled={true}
            />
          </Col>
          <Col lg={1}>
            <Checkbox
              checked={isChecked}
              onChange={handleCheckboxChange}
              format="circle"
              disabled={true}
            />
          </Col>
          <Col lg={1}>
            <Checkbox
              checked={isCheckedExemple}
              onChange={handleCheckboxChangeExemple}
              format="circle"
              disabled={true}
            />
          </Col>
        </Row>
      </div>
    </>
  );
}
