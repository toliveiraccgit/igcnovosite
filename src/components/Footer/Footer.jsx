import Accordion from "react-bootstrap/Accordion";
import icon5 from "../../assets/icon-facebook.png";
import icon4 from "../../assets/icon-linkedin.png";
import icon3 from "../../assets/icon-insta.png";
import icon2 from "../../assets/icon2.svg";
import icon1 from "../../assets/icon1.svg";
import LogoMobile from "../../assets/logo.png";
import LogoW from "../../assets/igcLogoW.png";
import original from "../../assets/original.svg";
import arrowRight from "../../assets/services/rightarrow.svg";
import "./footer.scss";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api_agro, api_footer } from "../../api";
import { BrowserRouter as Router, Link } from "react-router-dom";
import config from "../../config/env";
import APINavigation from "./../../api/navigation";

function Footer() {
  const locale = useSelector((state) => state.locales.locale);

  const [footer, setFooter] = useState({});
  const [dynamic, setDynamic] = useState({});
  const [navigation, setNavigation] = useState([]);
  const [service, setService] = useState([]);

  useEffect(() => {
    api_footer.get({ locale }).then((res) => {
      setFooter(res.data.data.attributes);
    });

    APINavigation.get_footer_igc({ locale })
      .then((response) => {
        setNavigation(response.data);
      })
      .catch(() => {
        setNavigation([]);
      });

    APINavigation.get_footer_service({ locale })
      .then((response) => {
        setService(response.data);
      })
      .catch(() => {
        setService([]);
      });

    api_agro.page({ locale }).then((res) => {
      setDynamic(res.data.data.attributes);
    });
  }, [locale]);

  return (
    <Router>
      <div className="main-container">
        <div className="theContainer">
          <div className="footer-list0">
            <h2>{footer && footer.title_igc}</h2>
            <ul>
              {navigation.map((item) => {
                return (
                  <li>
                    {item.type === "WRAPPER" ? (
                      <a href={item.path}>{item.title}</a>
                    ) : (
                      <a target="_blank" href="https://carreirasigcp.gupy.io/">
                        {item.title}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="footer-list">
            <h2>{footer && footer.title_service}</h2>
            <ul>
              {service.map((item) => {
                return (
                  <li>
                    <a href={item.path}>{item.title}</a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="footer-list2">
            <h2>{footer && footer.title_transactions}</h2>
            <div className="secondListFooter">
              <ul>
                {dynamic &&
                  dynamic?.screens?.map((e) => {
                    return (
                      <li>
                        <a href={`/transacoes/${e.slug}`}>{e.title}</a>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>

          <div className="footer-list3">
            <h2>{footer && footer.title_contact}</h2>
            <ul>
              {footer && footer.contact && footer.contact.phone && (
                <li>{footer.contact.phone}</li>
              )}

              {footer && footer.contact && footer.contact.email && (
                <li>{footer.contact.email}</li>
              )}

              {footer && footer.contact && footer.contact.address && (
                <li style={{ maxWidth: 230, marginTop: 42 }}>
                  {footer.contact.address}
                </li>
              )}

              {footer && footer.contact && footer.contact.cep && (
                <li>
                  <a href="#">CEP {footer.contact.cep}</a>
                </li>
              )}
            </ul>
          </div>

          <div className="social-media">
            <h2>{footer && footer.title_social}</h2>
            <ul>
              <li>
                {footer && footer.social && footer.social.instagram && (
                  <a href={footer.social.instagram}>
                    <img src={icon3} />
                  </a>
                )}
              </li>

              <li>
                {footer && footer.social && footer.social.linkedin && (
                  <a href={footer.social.linkedin}>
                    <img src={icon4} />
                  </a>
                )}
              </li>
            </ul>
          </div>

          <div className="float-content">
            <div className="float-logo">
              <img
                src={config.api.BASE + footer?.brand?.data?.attributes?.url}
                alt=""
              />
            </div>
            <div className="float-text">
              <h1>
                nosso deal é<br />
                com você
              </h1>
            </div>
          </div>
        </div>

        <div className="final-footer">
          <div className="theContainer">
            <p>© {new Date().getFullYear()} IGC</p>
            <span>
              <a href="/politica-privacidade">
                <p>POLÍTICAS E TERMOS</p>
              </a>
            </span>
          </div>
        </div>
      </div>

      <div className="MobileContainer">
        <div className="ContainerMobile">
          <div className="HeaderMobile">
            <div className="float-content">
              <div className="float-logo">
                <img
                  src={config.api.BASE + footer?.brand?.data?.attributes?.url}
                  alt=""
                />
              </div>
              <div className="social-media">
                {footer && footer.social && footer.social.instagram && (
                  <a href={footer.social.instagram}>
                    <img src={icon3} />
                  </a>
                )}
                {footer && footer.social && footer.social.linkedin && (
                  <a href={footer.social.linkedin}>
                    <img src={icon4} />
                  </a>
                )}
              </div>
            </div>
            <div className="float-text">
              <h1>
                nosso deal <br />é com você
              </h1>
            </div>
          </div>

          <div className="footer-list0">
            <h2>IGC</h2>
            <ul>
              {navigation.map((item) => {
                return (
                  <li>
                    <a href={item.path}>{item.title}</a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="footer-list">
            <h2>Serviços</h2>
            <ul>
              {service.map((item) => {
                return (
                  <li>
                    <a href={item.path}>{item.title}</a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="footer-list2">
            <h2>NOSSAS TRANSAÇÕES</h2>
            <div className="secondListFooter">
              <ul>
                {dynamic &&
                  dynamic?.screens?.map((e) => {
                    return (
                      <li>
                        <a href={`/transacoes/${e.slug}`}>{e.title}</a>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>

          <div className="footer-list3">
            <h2>Fale com a gente</h2>
            <ul>
              {footer && footer.contact && footer.contact.phone && (
                <li>{footer.contact.phone}</li>
              )}

              {footer && footer.contact && footer.contact.email && (
                <li>{footer.contact.email}</li>
              )}

              {footer && footer.contact && footer.contact.address && (
                <li style={{ maxWidth: 230, marginTop: 42 }}>
                  {footer.contact.address}
                </li>
              )}

              {footer && footer.contact && footer.contact.cep && (
                <li>
                  <a href="#">CEP {footer.contact.cep}</a>
                </li>
              )}
            </ul>
          </div>

          <div className="final-footer">
            <div className="theContainer">
              <p>© {new Date().getFullYear()} IGC</p>
              <a href="/politica-privacidade">
                <p>POLÍTICAS E TERMOS</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default Footer;
