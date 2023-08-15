import React, { useState } from "react";
import "./Inputs.scss";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Component
import InputField from "./InputField/InputField";
import Button from "../Button/Button/Button";

export default function Inputs() {
  const [textValue, setTextValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [textAreaValue, setTextAreaValue] = useState("");
  const [textError, setTextError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [textAreaError, setTextAreaError] = useState(false);
  const [textErrorMessage, setTextErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [textAreaErrorMessage, setTextAreaErrorMessage] = useState("");

  const handleTextChange = (event) => {
    setTextValue(event.target.value);
    setTextError(false);
  };

  const handleEmailChange = (event) => {
    setEmailValue(event.target.value);
    setEmailError(false);
  };

  const handleTextAreaChange = (event) => {
    setTextAreaValue(event.target.value);
    setTextAreaError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (textValue.trim() === "") {
      setTextError(true);
      setTextErrorMessage("This is a hint text to help user.");
    } else {
      setTextError(false);
      setTextErrorMessage("");
    }

    if (emailValue.trim() === "") {
      setEmailError(true);
      setEmailErrorMessage("This is a hint text to help user.");
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (textAreaValue.trim() === "") {
      setTextAreaError(true);
      setTextAreaErrorMessage("This is a hint text to help user.");
    } else {
      setTextAreaError(false);
      setTextAreaErrorMessage("");
    }
    setTextValue("");
    setEmailValue("");
    setTextAreaValue("");
  };

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
        <form onSubmit={handleSubmit}>
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
                value={textValue}
                onChange={handleTextChange}
                error={textError}
                errorMessage={textErrorMessage}
              />
            </Col>
            <Col lg={3}>
              <InputField
                label="Email"
                type="Default"
                toUse="Email"
                placeholder="olivia@untitledui.com"
                value={emailValue}
                onChange={handleEmailChange}
                error={emailError}
                errorMessage={emailErrorMessage}
              />
            </Col>
            <Col lg={3}>
              <Button
                type="submit"
                buttonType="Text"
                text="Submit"
                size="Medium"
                background="BackgroundBlue"
                disabled={false}
                onClick={handleSubmit}
              />
            </Col>
          </Row>
        </form>

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
        <form onSubmit={handleSubmit}>
          <Row className="mt-5 alignVCenter">
            <Col lg={2} className="RowTitle">
              Enabled
            </Col>
            <Col lg={6}>
              <InputField
                label="Text"
                type="TextArea"
                placeholder="olivia@untitledui.com"
                value={textAreaValue}
                onChange={handleTextAreaChange}
                error={textAreaError}
                errorMessage={textAreaErrorMessage}
              />
            </Col>
            <Col lg={3}>
              <Button
                type="submit"
                buttonType="Text"
                text="Submit"
                size="Large"
                background="BackgroundBlue"
                disabled={false}
                onClick={handleSubmit}
              />
            </Col>
          </Row>
        </form>

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
