import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch, useSelector } from "react-redux";

import LogoMobile from "../../assets/HeaderMobile/logomob.png";
import logo from "../../assets/logo.svg";
import arrowRight from "../../assets/services/rightarrow.svg";
import "./Header.scss";
import APINavigation from "./../../api/navigation";
import { get_async_locale, set_locale } from "../../store/locales";

function HeaderTop() {
  const [navigation, setNavigation] = useState([]);
  const dispatch = useDispatch();
  const { locales, locale } = useSelector((state) => state.locales);
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  const handleLocaleClick = (selectedLocale) => {
    dispatch(set_locale(selectedLocale));
    setIsOpen(false);
  };

  useEffect(() => {
    dispatch(get_async_locale());
    APINavigation.get_navigation({ locale })
      .then((response) => {
        setNavigation(response.data);
      })
      .catch(() => {
        setNavigation([]);
      });
  }, [locale, dispatch]);

  return (
    <>
      <div className="header-container">
        <div className="theContainer">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>

          <ul>
            {navigation.map((item) => (
              <li key={item.path}>
                {item.items.length === 0 ? (
                  <Link to={item.path}>{item.title}</Link>
                ) : (
                  <div className="dropdown">
                    <button className="dropbtn">
                      {item.title}
                      <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-content">
                      <div className="container">
                        {item.items.map((subitem) => (
                          <a key={subitem.path} href={subitem.path}>
                            <button>
                              <p>{subitem.title}</p>{" "}
                              <img src={arrowRight} alt="" />
                            </button>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
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
                <img
                  className="logo-mobile"
                  src={LogoMobile}
                  alt="Logo da IGC"
                />
              </Navbar.Brand>
              <div className="dropdown-area">
                <div className={`dropdown ${isOpen ? "dropdownOpen" : ""}`}>
                  <div
                    className="dropdown-toggle"
                    onClick={handleDropdownClick}
                  >
                    {locales.find((loc) => loc.code === locale)?.name || ""}
                  </div>
                  {isOpen && (
                    <ul className="dropdown-menu">
                      {locales.map((locale_i) => (
                        <li
                          key={locale_i.id}
                          onClick={() => handleLocaleClick(locale_i.code)}
                          style={{
                            display:
                              locale_i.code === locale ? "none" : "block",
                          }}
                        >
                          <div
                            className={
                              (locale_i.name === "EN" ||
                                locale_i.name == "ES") &&
                              locale !== "pt-BR"
                                ? "line"
                                : locale === "pt-BR" && locale_i.name === "EN"
                                ? "line"
                                : "no-line"
                            }
                          >
                            {locale_i.name}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
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
                    <Offcanvas.Title
                      id={`offcanvasNavbarLabel-expand-${expand}`}
                    >
                      <img src={LogoMobile} alt="Logo da IGC" />
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                      {navigation.map((item) => (
                        <React.Fragment key={item.path}>
                          {item.items.length === 0 ? (
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
                                <NavDropdown.Item
                                  key={subitem.path}
                                  href={subitem.path}
                                >
                                  {subitem.title}
                                </NavDropdown.Item>
                              ))}
                            </NavDropdown>
                          )}
                        </React.Fragment>
                      ))}
                    </Nav>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </div>
            </Container>
          </Navbar>
        ))}
      </div>
    </>
  );
}

export default HeaderTop;
