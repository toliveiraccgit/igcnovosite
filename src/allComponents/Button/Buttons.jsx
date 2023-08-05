import React from "react";
import "./Buttons.scss";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Components
import Button from "./Button/Button";

export default function Buttons() {
  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <h1 className="header-title">Button</h1>
        </div>
      </header>

      <div className="section">
        {/* Primary */}
        <Row>
          <h1 className="BtnTitle">Primary</h1>
        </Row>

        {/* Enabled */}
        <Row className="mt-5 alignVCenter">
          <Col lg={1} className="RowTitle">
            Enabled
          </Col>
          <Col lg={1}>
            <Button
              buttonType="Text"
              text="Button CTA"
              size="Small"
              background="BackgroundBlue"
              disabled={false}
              link="#"
            />
          </Col>
          <Col lg={1}>
            <Button
              buttonType="Text"
              text="Button CTA"
              size="Medium"
              background="BackgroundBlue"
              disabled={false}
              link="#"
            />
          </Col>
          <Col lg={1}>
            <Button
              buttonType="Text"
              text="Button CTA"
              size="Large"
              background="BackgroundBlue"
              disabled={false}
              link="#"
            />
          </Col>
          <Col lg={2}>
            <div className="spaceBetween">
              <Button
                buttonType="Arrow"
                text="Button CTA"
                size="Small"
                background="BackgroundBlue"
                disabled={false}
                link="#"
              />
              <Button
                buttonType="Arrow"
                text="Button CTA"
                size="Medium"
                background="BackgroundBlue"
                disabled={false}
                link="#"
              />
              <Button
                buttonType="Arrow"
                text="Button CTA"
                size="Large"
                background="BackgroundBlue"
                disabled={false}
                link="#"
              />
            </div>
          </Col>
        </Row>

        {/* Hover */}
        <Row className="mt-5 alignVCenter">
          <Col lg={1} className="RowTitle">
            Hover
          </Col>
          <Col lg={1}>
            <Button
              buttonType="Text"
              text="Button CTA"
              size="Small"
              background="BackgroundBlueHover"
              disabled={false}
              link="#"
            />
          </Col>
          <Col lg={1}>
            <Button
              buttonType="Text"
              text="Button CTA"
              size="Medium"
              background="BackgroundBlueHover"
              disabled={false}
              link="#"
            />
          </Col>
          <Col lg={1}>
            <Button
              buttonType="Text"
              text="Button CTA"
              size="Large"
              background="BackgroundBlueHover"
              disabled={false}
              link="#"
            />
          </Col>
          <Col lg={2}>
            <div className="spaceBetween">
              <Button
                buttonType="Arrow"
                text="Button CTA"
                size="Small"
                background="BackgroundBlueHover"
                disabled={false}
                link="#"
              />
              <Button
                buttonType="Arrow"
                text="Button CTA"
                size="Medium"
                background="BackgroundBlueHover"
                disabled={false}
                link="#"
              />
              <Button
                buttonType="Arrow"
                text="Button CTA"
                size="Large"
                background="BackgroundBlueHover"
                disabled={false}
                link="#"
              />
            </div>
          </Col>
        </Row>

        {/* Focused */}
        <Row className="mt-5 alignVCenter">
          <Col lg={1} className="RowTitle">
            Focused
          </Col>
          <Col lg={1}>
            <Button
              buttonType="Text"
              text="Button CTA"
              size="Small"
              background="BackgroundBlueFocus"
              disabled={false}
              link="#"
            />
          </Col>
          <Col lg={1}>
            <Button
              buttonType="Text"
              text="Button CTA"
              size="Medium"
              background="BackgroundBlueFocus"
              disabled={false}
              link="#"
            />
          </Col>
          <Col lg={1}>
            <Button
              buttonType="Text"
              text="Button CTA"
              size="Large"
              background="BackgroundBlueFocus"
              disabled={false}
              link="#"
            />
          </Col>
          <Col lg={2}>
            <div className="spaceBetween">
              <Button
                buttonType="Arrow"
                text="Button CTA"
                size="Small"
                background="BackgroundBlueFocus"
                disabled={false}
                link="#"
              />
              <Button
                buttonType="Arrow"
                text="Button CTA"
                size="Medium"
                background="BackgroundBlueFocus"
                disabled={false}
                link="#"
              />
              <Button
                buttonType="Arrow"
                text="Button CTA"
                size="Large"
                background="BackgroundBlueFocus"
                disabled={false}
                link="#"
              />
            </div>
          </Col>
        </Row>

        {/* Disabled */}
        <Row className="mt-5 alignVCenter">
          <Col lg={1} className="RowTitle">
            Disabled
          </Col>
          <Col lg={1}>
            <Button
              buttonType="Text"
              text="Button CTA"
              size="Small"
              background="BackgroundBlue"
              disabled={true}
              link="#"
            />
          </Col>
          <Col lg={1}>
            <Button
              buttonType="Text"
              text="Button CTA"
              size="Medium"
              background="BackgroundBlue"
              disabled={true}
              link="#"
            />
          </Col>
          <Col lg={1}>
            <Button
              buttonType="Text"
              text="Button CTA"
              size="Large"
              background="BackgroundBlue"
              disabled={true}
              link="#"
            />
          </Col>
          <Col lg={2}>
            <div className="spaceBetween">
              <Button
                buttonType="Arrow"
                text="Button CTA"
                size="Small"
                background="BackgroundBlue"
                disabled={true}
                link="#"
              />
              <Button
                buttonType="Arrow"
                text="Button CTA"
                size="Medium"
                background="BackgroundBlue"
                disabled={true}
                link="#"
              />
              <Button
                buttonType="Arrow"
                text="Button CTA"
                size="Large"
                background="BackgroundBlue"
                disabled={true}
                link="#"
              />
            </div>
          </Col>
        </Row>
      </div>

      <div className="section">
        {/* Primary */}
        <Row>
          <h1 className="BtnTitle">Secondary</h1>
        </Row>

        {/* Secondary */}
        <Row className="mt-5 alignVCenter">
          <Col lg={1} className="RowTitle">
            Enabled
          </Col>
          <Col lg={1}>
            <Button
              buttonType="Text"
              text="Button CTA"
              size="Small"
              background="BackgroundWhite"
              disabled={false}
              link="#"
            />
          </Col>
          <Col lg={1}>
            <Button
              buttonType="Text"
              text="Button CTA"
              size="Medium"
              background="BackgroundWhite"
              disabled={false}
              link="#"
            />
          </Col>
          <Col lg={1}>
            <Button
              buttonType="Text"
              text="Button CTA"
              size="Large"
              background="BackgroundWhite"
              disabled={false}
              link="#"
            />
          </Col>
          <Col lg={2}>
            <div className="spaceBetween">
              <Button
                buttonType="Arrow"
                text="Button CTA"
                size="Small"
                background="BackgroundWhite"
                disabled={false}
                link="#"
              />
              <Button
                buttonType="Arrow"
                text="Button CTA"
                size="Medium"
                background="BackgroundWhite"
                disabled={false}
                link="#"
              />
              <Button
                buttonType="Arrow"
                text="Button CTA"
                size="Large"
                background="BackgroundWhite"
                disabled={false}
                link="#"
              />
            </div>
          </Col>
        </Row>

        {/* Hover */}
        <Row className="mt-5 alignVCenter">
          <Col lg={1} className="RowTitle">
            Hover
          </Col>
          <Col lg={1}>
            <Button
              buttonType="Text"
              text="Button CTA"
              size="Small"
              background="BackgroundWhiteHover"
              disabled={false}
              link="#"
            />
          </Col>
          <Col lg={1}>
            <Button
              buttonType="Text"
              text="Button CTA"
              size="Medium"
              background="BackgroundWhiteHover"
              disabled={false}
              link="#"
            />
          </Col>
          <Col lg={1}>
            <Button
              buttonType="Text"
              text="Button CTA"
              size="Large"
              background="BackgroundWhiteHover"
              disabled={false}
              link="#"
            />
          </Col>
          <Col lg={2}>
            <div className="spaceBetween">
              <Button
                buttonType="Arrow"
                text="Button CTA"
                size="Small"
                background="BackgroundWhiteHover"
                disabled={false}
                link="#"
              />
              <Button
                buttonType="Arrow"
                text="Button CTA"
                size="Medium"
                background="BackgroundWhiteHover"
                disabled={false}
                link="#"
              />
              <Button
                buttonType="Arrow"
                text="Button CTA"
                size="Large"
                background="BackgroundWhiteHover"
                disabled={false}
                link="#"
              />
            </div>
          </Col>
        </Row>

        {/* Focused */}
        <Row className="mt-5 alignVCenter">
          <Col lg={1} className="RowTitle">
            Focused
          </Col>
          <Col lg={1}>
            <Button
              buttonType="Text"
              text="Button CTA"
              size="Small"
              background="BackgroundWhiteFocus"
              disabled={false}
              link="#"
            />
          </Col>
          <Col lg={1}>
            <Button
              buttonType="Text"
              text="Button CTA"
              size="Medium"
              background="BackgroundWhiteFocus"
              disabled={false}
              link="#"
            />
          </Col>
          <Col lg={1}>
            <Button
              buttonType="Text"
              text="Button CTA"
              size="Large"
              background="BackgroundWhiteFocus"
              disabled={false}
              link="#"
            />
          </Col>
          <Col lg={2}>
            <div className="spaceBetween">
              <Button
                buttonType="Arrow"
                text="Button CTA"
                size="Small"
                background="BackgroundWhiteFocus"
                disabled={false}
                link="#"
              />
              <Button
                buttonType="Arrow"
                text="Button CTA"
                size="Medium"
                background="BackgroundWhiteFocus"
                disabled={false}
                link="#"
              />
              <Button
                buttonType="Arrow"
                text="Button CTA"
                size="Large"
                background="BackgroundWhiteFocus"
                disabled={false}
                link="#"
              />
            </div>
          </Col>
        </Row>

        {/* Disabled */}
        <Row className="mt-5 alignVCenter">
          <Col lg={1} className="RowTitle">
            Disabled
          </Col>
          <Col lg={1}>
            <Button
              buttonType="Text"
              text="Button CTA"
              size="Small"
              background="BackgroundWhite"
              disabled={true}
              link="#"
            />
          </Col>
          <Col lg={1}>
            <Button
              buttonType="Text"
              text="Button CTA"
              size="Medium"
              background="BackgroundWhite"
              disabled={true}
              link="#"
            />
          </Col>
          <Col lg={1}>
            <Button
              buttonType="Text"
              text="Button CTA"
              size="Large"
              background="BackgroundWhite"
              disabled={true}
              link="#"
            />
          </Col>
          <Col lg={2}>
            <div className="spaceBetween">
              <Button
                buttonType="Arrow"
                text="Button CTA"
                size="Small"
                background="BackgroundWhite"
                disabled={true}
                link="#"
              />
              <Button
                buttonType="Arrow"
                text="Button CTA"
                size="Medium"
                background="BackgroundWhite"
                disabled={true}
                link="#"
              />
              <Button
                buttonType="Arrow"
                text="Button CTA"
                size="Large"
                background="BackgroundWhite"
                disabled={true}
                link="#"
              />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
