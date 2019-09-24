/*global confirm*/
/*eslint no-restricted-globals: ["off", "confirm"]*/

import React, { useState } from "react";

import { Container, Row, Col, Modal, Button } from "react-bootstrap";

import Arweave from "../utils/Arweave";
import { DataConsumer } from "../utils/DataProvider";

import "./Header.css";

import * as config from "../../config.json";

const Header = props => {
  const [show, setShow] = useState(false);

  const onClick = ctx => {
    if (ctx.address !== null) {
      // Logout.
      if (confirm("Are you sure you want to logout?")) {
        ctx.setWallet(null);
        ctx.setAddress(null);
      }
    } else {
      // login.
      setShow(true);
    }
  };

  const triggerFileUpload = ctx => {
    const file = document.createElement("input");
    file.style.display = "none";
    file.type = "file";
    file.name = "file";
    file.accept = ".json";
    document.getElementById("root").appendChild(file);

    file.onchange = e => {
      const f = e.target.files[0];

      const fr = new FileReader();
      fr.onload = async evt => {
        const wallet = JSON.parse(evt.target.result);
        const address = await Arweave.getAddress(wallet);
        ctx.setWallet(wallet);
        ctx.setAddress(address);

        setShow(false);

        document.getElementById("root").removeChild(file);
      };
      fr.readAsText(f);
    };
    file.click();
  };

  return (
    <header className="App-header">
      <Container style={{ height: "100%" }}>
        <Row style={{ height: "100%" }}>
          <Col md="2" className="App-header-name align-self-center">
            {config.app.name}
          </Col>
          <Col md="auto" className="ml-auto align-self-center">
            <DataConsumer>
              {ctx => (
                <a className="App-header-link" onClick={() => onClick(ctx)}>
                  {ctx.address === null
                    ? "Log In"
                    : `${ctx.address.substr(0, 10)}...`}
                </a>
              )}
            </DataConsumer>
          </Col>
        </Row>
      </Container>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton />
        <Modal.Body>
          <h5>Sign in</h5>
          <p>No registration. No passwords. </p>
          <br />
          <Row>
            <Col md="3">
              <DataConsumer>
                {ctx => (
                  <Button
                    variant="outline-dark"
                    onClick={() => triggerFileUpload(ctx)}
                  >
                    Browse
                  </Button>
                )}
              </DataConsumer>
            </Col>
            <Col md="9" className="ml-auto">
              <p>
                <i>Upload arweave keystore json file to login.</i>
              </p>
              <p>
                <i>Its not stored on any servers.</i>
              </p>
            </Col>
          </Row>
          <br />
          <p>
            <b>
              Don't have an Arweave wallet? Get one{" "}
              <a href="https://tokens.arweave.org/" target="_blank">
                here
              </a>
              !
            </b>
          </p>
        </Modal.Body>
      </Modal>
    </header>
  );
};

export default Header;
