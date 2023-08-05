import React from "react";

// Todas as backgroundColorClass estão aqui
import "./Colors.scss";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Components
import ColoredRectangle from "./ColoredRectangle/ColoredRectangle";
import ColoredRectangleSmall from "./ColoredRectangleSmall/ColoredRectangleSmall";

export default function Colors() {
  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <h1 className="header-title">Colors</h1>
        </div>
      </header>

      <div className="section">
        {/* Primary Color */}
        <Row>
          <p className="row-title">Ebony Clay - Primary</p>

          <ColoredRectangle
            backgroundColorClass="Main-Color"
            text="Main Color"
            label="HEX #222F42"
          />
        </Row>
      </div>

      <div className="section">
        {/* Secondary Color */}
        <Row>
          <p className="row-title">Old Gold - Secondary</p>

          <ColoredRectangle
            backgroundColorClass="Secondary-Color"
            text="Secondary Color"
            label="HEX #D3A93D"
          />
        </Row>
      </div>

      <div className="section">
        {/* State Colors */}
        <Row>
          <p className="row-title">State Colors</p>

          <Col lg={4} sm={12}>
            <ColoredRectangle
              backgroundColorClass="Error-Color"
              text="Error"
              label="HEX #CC1414"
            />

            <Row className="mt-3">
              <Col lg={4} sm={12}>
                <ColoredRectangleSmall backgroundColorClass="Error-Color-Strong" />
              </Col>

              <Col lg={4} sm={12}>
                <ColoredRectangleSmall backgroundColorClass="Error-Color-Medium" />
              </Col>

              <Col lg={4} sm={12}>
                <ColoredRectangleSmall backgroundColorClass="Error-Color-Smooth" />
              </Col>
            </Row>
          </Col>

          <Col lg={4} sm={12}>
            <ColoredRectangle
              backgroundColorClass="Warning-Color"
              text="Warning"
              label="HEX #FFCC00"
            />

            <Row className="mt-3">
              <Col lg={4} sm={12}>
                <ColoredRectangleSmall backgroundColorClass="Warning-Color-Strong" />
              </Col>

              <Col lg={4} sm={12}>
                <ColoredRectangleSmall backgroundColorClass="Warning-Color-Medium" />
              </Col>

              <Col lg={4} sm={12}>
                <ColoredRectangleSmall backgroundColorClass="Warning-Color-Smooth" />
              </Col>
            </Row>
          </Col>

          <Col lg={4} sm={12}>
            <ColoredRectangle
              backgroundColorClass="Success-Color"
              text="Success"
              label="HEX #05A660"
            />

            <Row className="mt-3">
              <Col lg={4} sm={12}>
                <ColoredRectangleSmall backgroundColorClass="Success-Color-Strong" />
              </Col>

              <Col lg={4} sm={12}>
                <ColoredRectangleSmall backgroundColorClass="Success-Color-Medium" />
              </Col>

              <Col lg={4} sm={12}>
                <ColoredRectangleSmall backgroundColorClass="Success-Color-Smooth" />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>

      <div className="section">
        {/* Shades of gray */}
        <Row>
          <p className="row-title">Shades of gray</p>

          <Row>
            <Col lg={4} sm={12}>
              <ColoredRectangle
                backgroundColorClass="Gray-Error-Color-Strong"
                text="Error"
                label="HEX #CC1414"
              />
            </Col>

            <Col lg={4} sm={12}>
              <ColoredRectangle
                backgroundColorClass="Gray-Warning-Color-Strong"
                text="Warning"
                label="HEX #FFCC00"
              />
            </Col>

            <Col lg={4} sm={12}>
              <ColoredRectangle
                backgroundColorClass="Gray-Success-Color-Strong"
                text="Success"
                label="HEX #05A660"
              />
            </Col>
          </Row>

          <Row className="mt-5">
            <Col lg={4} sm={12}>
              <ColoredRectangle
                backgroundColorClass="Gray-Error-Color-Smooth"
                text="Error"
                label="HEX #CC1414"
              />
            </Col>

            <Col lg={4} sm={12}>
              <ColoredRectangle
                backgroundColorClass="Gray-Warning-Color-Smooth"
                text="Warning"
                label="HEX #FFCC00"
              />
            </Col>

            <Col lg={4} sm={12}>
              <ColoredRectangle
                backgroundColorClass="Gray-Success-Color-Smooth"
                text="Success"
                label="HEX #05A660"
              />
            </Col>
          </Row>
        </Row>
      </div>
    </>
  );
}
