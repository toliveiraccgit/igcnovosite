import Accordion from "react-bootstrap/Accordion";
import icon5 from "../../assets/icon-facebook.png";
import icon4 from "../../assets/icon-linkedin.png";
import icon3 from "../../assets/icon-insta.png";
import icon2 from "../../assets/icon2.svg";
import icon1 from "../../assets/icon1.svg";
import LogoMobile from "../../assets/logo.png";
import LogoW from "../../assets/igcLogoW.png";
import original from "../../assets/original.svg";
import "./footer.scss";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api_agro, api_footer } from "../../api";
import config from "../../config/env";

function Footer() {
  const locale = useSelector((state) => state.locales.locale);

  const [footer, setFooter] = useState({});
  const [dynamic, setDynamic] = useState({});

  useEffect(() => {
    api_footer.get({ locale }).then((res) => {
      setFooter(res.data.data.attributes);
    });

    api_agro.page({ locale }).then((res) => {
      setDynamic(res.data.data.attributes);
    });
  }, [locale]);

  return (
    <>
      <div className="main-container">
        <div className="theContainer">
          <div className="footer-list0">
            <h2>IGC</h2>
            <ul>
              <li>
                <a href="/quem-somos">Quem somos</a>
              </li>
              <li>
                <a href="/noticias">Notícias</a>
              </li>
              <li>
                <a href="/social">Social</a>
              </li>
              <li>
                <a href="https://carreirasigcp.gupy.io/">Carreiras</a>
              </li>
              <li>
                <a href="#">Política de privacidade</a>
              </li>
            </ul>
          </div>

          <div className="footer-list">
            <h2>Serviços</h2>
            <ul>
              <li>
                <a href="/servicos">M&A</a>
              </li>
              {/* <li>
                <a href="/ipo-advisor">IPO Advisor</a>
              </li> */}
              <li>
                <a href="/capitacao-recursos">Capital Solution</a>
              </li>
            </ul>
          </div>

          <div className="footer-list2">
            <h2>Nossas transações</h2>
            <div className="secondListFooter">
              <ul>
                {dynamic && dynamic?.screens?.length > 0 && <h3>Setores</h3>}
                {dynamic &&
                  dynamic?.screens?.map((e) => {
                    return (
                      <li>
                        <a href={`/transacoes/${e.slug}`}>{e.title}</a>
                      </li>
                    );
                  })}
              </ul>
              <ul>
                <h3>Buyers</h3>
                <li>
                  <a href="#">Parceiros estratégicos</a>
                </li>
                <li>
                  <a href="#">Fundos de investimento</a>
                </li>
              </ul>
              <ul>
                <h3>Origem</h3>
                <li>
                  <a href="#">Nacional</a>
                </li>
                <li>
                  <a href="#">Internacionais</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-list3">
            <h2>Fale com a gente</h2>
            <ul>
              {footer && footer.contact && footer.contact.phone && (
                <li>
                  <a href="#"> {/* <img src={icon3} /> */}</a>
                  {footer.contact.phone}
                </li>
              )}

              {footer && footer.contact && footer.contact.email && (
                <li>
                  <a href="#">{/* <img src={icon4} /> */}</a>
                  {footer.contact.email}
                </li>
              )}

              {footer && footer.contact && footer.contact.address && (
                <li style={{ maxWidth: 230, marginTop: 42 }}>
                  <a href="#">{/* <img src={icon5} /> */}</a>
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
            <h2>ACOMPANHE</h2>
            <ul>
              <li>
                <a href="#">
                  <img src={icon3} />
                </a>
              </li>

              <li>
                <a href="#">
                  <img src={icon4} />
                </a>
              </li>
            </ul>

            {/* <a href="#">
              <img src={icon5} />
            </a> */}
          </div>

          <div className="float-content">
            <div className="float-logo">
              <img src={LogoW} />
            </div>
            <div className="float-text">
              <h1>
                nosso deal <br />
                com você
              </h1>
            </div>
          </div>
        </div>

        <div className="final-footer">
          <div className="theContainer">
            <p>© {new Date().getFullYear()} IGC</p>
            <span>
              <a href="#">
                <p>POLÍTICAS E TERMOS</p>
              </a>
            </span>
          </div>
        </div>
      </div>

      <div className="MobileContainer">
        <div className="ContainerMobile">
          <div className="HeaderMobile">
            {/* <img src={LogoMobile} alt="" /> */}
            <div className="float-content">
              <div className="float-logo">
                <img src={LogoW} />
              </div>
              <div className="social-media">
                <a href="#">
                  <img src={icon3} />
                </a>
                <a href="#">
                  <img src={icon4} />
                </a>
                <a href="#">
                  <img src={icon5} />
                </a>
              </div>
            </div>
            <div className="float-text">
              <h1>
                nosso deal <br />
                com você
              </h1>
            </div>
          </div>

          <div className="footer-list0">
            <h2>IGC</h2>
            <ul>
              <li>
                <a href="/quem-somos">Quem somos</a>
              </li>
              <li>
                <a href="/social">Social</a>
              </li>
              <li>
                <a href="/noticias">Notícias</a>
              </li>
            </ul>
          </div>

          <div className="footer-list">
            <h2>Serviços</h2>
            <ul>
              <li>
                <a href="/servicos">M&A</a>
              </li>
              <li>
                <a href="/ipo-advisor">IPO Advisor</a>
              </li>
              <li>
                <a href="/capitacao-recursos">Capital Solution</a>
              </li>
            </ul>
          </div>

          <div className="footer-list2">
            <h2>Transações</h2>
            <div className="secondListFooter">
              <ul>
                {dynamic && dynamic?.screens?.length > 0 && <h3>Setores</h3>}
                {dynamic &&
                  dynamic?.screens?.map((e) => {
                    return (
                      <li>
                        <a href={`/transacoes/${e.slug}`}>{e.title}</a>
                      </li>
                    );
                  })}
              </ul>
              <ul>
                <h3>Buyers</h3>
                <li>
                  <a href="#">Parceiros estratégicos</a>
                </li>
                <li>
                  <a href="#">Fundos de investimento</a>
                </li>
              </ul>
              <ul>
                <h3>Origem</h3>
                <li>
                  <a href="#">Nacional</a>
                </li>
                <li>
                  <a href="#">Internacionais</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-list3">
            <h2>Fale com a gente</h2>
            <ul>
              {footer && footer.contact && footer.contact.phone && (
                <li>
                  <a href="#"> {/* <img src={icon3} /> */}</a>
                  {footer.contact.phone}
                </li>
              )}

              {footer && footer.contact && footer.contact.email && (
                <li>
                  <a href="#">{/* <img src={icon4} /> */}</a>
                  {footer.contact.email}
                </li>
              )}

              {footer && footer.contact && footer.contact.address && (
                <li style={{ maxWidth: 230, marginTop: 42 }}>
                  <a href="#">{/* <img src={icon5} /> */}</a>
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
              <a href="#">
                <p>POLÍTICAS E TERMOS</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
