import React from "react";
import "./allComponents.scss";

// Bootstrap
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

// Components
import Typographys from "./Typography/typographys";
import Colors from "./Colors/Colors";
import Button from "./Button/Buttons";
import Checkboxes from "./Checkbox/Checkboxes";
import Inputs from "./Inputs/Inputs";

export default function allComponents() {
  return (
    <Tabs
      defaultActiveKey="typography"
      id="components-tabs"
      className="mt-5"
      fill
    >
      <Tab eventKey="typography" title="Typography" defaultActiveKey>
        <Typographys />
      </Tab>
      <Tab eventKey="colors" title="Colors">
        <Colors />
      </Tab>
      <Tab eventKey="button" title="Button">
        <Button />
      </Tab>
      <Tab eventKey="spacing" title="Spacing">
        Tab content for Contact
      </Tab>
      <Tab eventKey="checkbox" title="Checkbox">
        <Checkboxes />
      </Tab>
      <Tab eventKey="inputs" title="Inputs">
        <Inputs />
      </Tab>
      {/* <Tab eventKey="icons" title="Icons">
        Tab content for Contact
      </Tab> */}
    </Tabs>
  );
}
