import icon4 from "../../assets/iconlinkedin.png";
import icon3 from "../../assets/iconinsta.png";
import "./footer.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api_transacoes_footer, api_footer } from "../../api";
import { BrowserRouter as Router } from "react-router-dom";
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

    api_transacoes_footer.page({ locale }).then((res) => {
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
                <li>
                  <a href={`mailto:${footer.contact.email}`}>
                    {footer.contact.email}
                  </a>
                </li>
              )}

              {footer && footer.contact && footer.contact.address && (
                <li style={{ maxWidth: 230, marginTop: 42 }}>
                  {footer.contact.address}
                </li>
              )}

              {footer && footer.contact && footer.contact.cep && (
                <li>CEP {footer.contact.cep}</li>
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
            <h2 style={{ maxWidth: 100, marginTop: 65 }}>
              {footer && footer.title_download}
            </h2>
            <ul>
              <li>
                <a href={footer && footer.download_link} target="_blank">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="25px"
                    viewBox="0 0 512 512"
                    className="icon-download">
                    <path
                      d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"
                      fill="#ffffff"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          <div className="float-content">
            <div className="float-logo">
              <img src={footer?.brand?.data?.attributes?.url} alt="" />
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
            <div className="float-content mb-5">
              <div className="float-logo">
                <img
                  className="w-75"
                  src={footer?.brand?.data?.attributes?.url}
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
          </div>

          <div className="footer-list0">
            <h2>{footer && footer.title_igc}</h2>
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
                <li>CEP {footer.contact.cep}</li>
              )}
            </ul>
            <h2 style={{ maxWidth: "100%", marginTop: 65 }}>
              {footer && footer.title_download}
            </h2>
            <ul>
              <li>
                <a href={footer && footer.download_link} target="_blank">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="25px"
                    viewBox="0 0 512 512"
                    className="icon-download">
                    <path
                      d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"
                      fill="#ffffff"
                    />
                  </svg>
                </a>
              </li>
            </ul>
            <div className="float-text">
              <h1>
                nosso deal <br />é com você
              </h1>
            </div>
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
