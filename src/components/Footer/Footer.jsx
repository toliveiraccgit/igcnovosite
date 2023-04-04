import Accordion from "react-bootstrap/Accordion";
import icon4 from "../../assets/icon-email.svg";
import icon3 from "../../assets/icon-phone.svg";
import icon5 from "../../assets/icon-pin.svg";
import icon1 from "../../assets/icon1.svg";
import icon2 from "../../assets/icon2.svg";
import LogoMobile from "../../assets/logo.png";
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
            <img
              src={config.api.BASE + footer?.brand?.data?.attributes?.url}
              alt=""
            />
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
            <ul>
              {footer && footer.careers && (
                <li>
                  <a href={footer.careers}>Carreiras</a>
                </li>
              )}
              {footer && footer.careers && (
                <li>
                  <a href={footer.privacy}>Política de privacidade</a>
                </li>
              )}
            </ul>
            <ul className="icons">
              <li>
                {footer && footer.social && footer.social.instagram && (
                  <a href={footer.social.instagram}>
                    <img src={icon1} />
                  </a>
                )}
              </li>
              <li>
                {footer && footer.social && footer.social.linkedin && (
                  <a href={footer.social.linkedin}>
                    <img src={icon2} />
                  </a>
                )}
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
            <h2>Nossas transações</h2>
            <div className="secondListFooter">
              <ul>
                {dynamic && dynamic?.screens?.length > 0 && <h3>Setores:</h3>}
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
                <h3>Buyers:</h3>
                <li>
                  <a href="#">Parceiros estratégicos</a>
                </li>
                <li>
                  <a href="#">Fundos de investimento</a>
                </li>
              </ul>
              <ul>
                <h3>Origem:</h3>
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
            <h2>Contato</h2>
            <ul>
              {footer && footer.contact && footer.contact.phone && (
                <li>
                  <a href="#">
                    {" "}
                    <img src={icon3} />
                  </a>
                  {footer.contact.phone}
                </li>
              )}

              {footer && footer.contact && footer.contact.email && (
                <li>
                  <a href="#">
                    <img src={icon4} />
                  </a>
                  {footer.contact.email}
                </li>
              )}

              {footer && footer.contact && footer.contact.address && (
                <li style={{ maxWidth: 230 }}>
                  <a href="#">
                    <img src={icon5} />
                  </a>
                  {footer.contact.address}
                </li>
              )}

              {footer && footer.contact && footer.contact.cep && (
                <li>CEP {footer.contact.cep}</li>
              )}
            </ul>
          </div>
        </div>

        <div className="final-footer">
          <div className="theContainer">
            <p>
              © Copyright {new Date().getFullYear()} igc Partners. Todos os
              direitos reservados
            </p>
            <span>
              <img src={original} />
            </span>
          </div>
        </div>
      </div>

      <div className="MobileContainer">
        <div className="ContainerMobile">
          <div className="HeaderMobile">
            <img src={LogoMobile} alt="" />
          </div>
          <Accordion flush>
            <Accordion.Item eventKey={1} key={1}>
              <Accordion.Header>sobre nós</Accordion.Header>
              <Accordion.Body>
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
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey={2} key={2}>
              <Accordion.Header>serviços</Accordion.Header>
              <Accordion.Body>
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
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey={3} key={3}>
              <Accordion.Header>nossas transações</Accordion.Header>
              <Accordion.Body>
                <ul>
                {dynamic && dynamic?.screens?.length > 0 && <h3>Setores:</h3>}
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
                <h3>Buyers:</h3>
                <li>
                  <a href="#">Parceiros estratégicos</a>
                </li>
                <li>
                  <a href="#">Fundos de investimento</a>
                </li>
              </ul>
              <ul>
                <h3>Origem:</h3>
                <li>
                  <a href="#">Nacional</a>
                </li>
                <li>
                  <a href="#">Internacionais</a>
                </li>
              </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <div className="footer-list3">
            <ul className="Mobile-List3">
              <li className="Number">
                <a href="#">
                  {" "}
                  <img src={icon3} />
                </a>
                +55 11 3815-3533
              </li>
              <li className="Email">
                <a href="#">
                  <img src={icon4} />
                </a>
                contato@igcp.com.br
              </li>
              <li>
                <a href="#">
                  <img src={icon5} />
                </a>
                Av. Brigadeiro Faria Lima, 2277
              </li>
              <li>6° andar São Paulo, SP, Brasil</li>
              <li>CEP 01452-000</li>
            </ul>
            <div className="MobileBottom">
              <p className="MobileBottomText">
                © Copyright {new Date().getFullYear()} igc Partners. Todos os
                direitos reservados
              </p>
              <span>
                <img src={original} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
