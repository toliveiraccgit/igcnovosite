import { Link } from "react-router-dom";
import LogoMobile from "../../assets/HeaderMobile/logo.png";
import logo from "../../assets/logo.svg";
import arrowRight from "../../assets/services/rightarrow.svg";
import "./Header.scss";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";

import { useEffect, useState } from "react";
import APINavigation from "./../../api/navigation";

import { useSelector } from "react-redux";

function HeaderTop() {
  const [navigation, setNavigation] = useState([]);
  const locale = useSelector((state) => state.locales.locale);

  useEffect(() => {
    APINavigation.get_navigation({ locale })
      .then((response) => {
        setNavigation(response.data);
      })
      .catch(() => {
        setNavigation([]);
      });
  }, [locale]);

  return (
    <>
      <div className="header-container">
        <div className="theContainer">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>

          <ul>
            {navigation.map((item) => {
              if (item.items.length === 0) {
                return (
                  <li>
                    <Link to={item.path}>{item.title}</Link>
                  </li>
                );
              } else {
                return (
                  <li>
                    <div className="dropdown">
                      <button className="dropbtn">
                        {item.title}
                        <i className="fa fa-caret-down"></i>
                      </button>
                      <div className="dropdown-content">
                        <div className="container">
                          {item.items.map((subitem) => (
                            <a href={subitem.path}>
                              <button>
                                <p>{subitem.title}</p>{" "}
                                <img src={arrowRight} alt="" />
                              </button>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
      <div className="headerMobile">
        {[false].map((expand) => (
          <Navbar
            key={expand}
            bg="white"
            expand={expand}
            className="navBarContainer"
          >
            <Container fluid>
              <Navbar.Brand href="/">
                <img src={LogoMobile} alt="Logo da IGC" />
              </Navbar.Brand>
              <Navbar.Toggle
                className="ButtonMenuOpen"
                aria-controls={`offcanvasNavbar-expand-${expand}`}
              />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
                className="MenuOppend"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    <img src={LogoMobile} alt="Logo da IGC" />
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    {navigation.map((item) =>
                      item.items.length === 0 ? (
                        <Nav.Link
                          className="quemSomos action bold"
                          href={item.path}
                        >
                          {item.title}
                        </Nav.Link>
                      ) : (
                        <NavDropdown
                          title={item.title}
                          id={`offcanvasNavbarDropdown-expand-${expand}`}
                        >
                          {item.items.map((subitem) => (
                            <NavDropdown.Item href={subitem.path}>
                              {subitem.title}
                            </NavDropdown.Item>
                          ))}
                        </NavDropdown>
                      )
                    )}
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}
      </div>
    </>
  );
}

export default HeaderTop;
