import React, { useEffect, useState } from "react";
import "./NotíciaSelecionada.scss";

import moment from "moment";
import "moment/dist/locale/es";
import "moment/dist/locale/pt-br";

import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { api_news } from "../../api";

import alert from "../../utils/systemAlert";

import icon4 from "../../assets/iconlinkedinB.png";
import icon3 from "../../assets/iconinstaB.png";

function NotíciaSelecionada() {
  const { id } = useParams();

  const locale = useSelector((state) => state.locales.locale);
  moment.locale(locale);

  const [page, setPage] = useState({});
  const [news, setNews] = useState({});
  const [listNews, setListNews] = useState([]);

  useEffect(() => {
    api_news
      .page({ locale })
      .then((res) => {
        setPage(res.data.data.attributes);
      })
      .catch(() => {
        alert.localeNotFound(locale);
      });

    api_news.get({ locale, count: 4 }).then((res) => {
      if (res.data.data.length > 0) {
        setListNews(res.data.data);
      }
    });

    api_news.find({ locale, id }).then((res) => {
      setNews(res.data.data.attributes);
    });
  }, [locale]);

  const navigate = new useNavigate();

  return (
    <div className="NoticiaSelecionadaContainer">
      <div className="topPage">
        <div className="theContainer" onClick={() => navigate(`/noticias`)}>
          {page && page.title}
        </div>
      </div>

      <div className="pathArea">
        <div className="theContainer">
          <h4>
            <span>{page && page.title}</span> <span>&gt;</span>{" "}
            {news && news.title}
          </h4>
        </div>
      </div>

      <div className="NoticiaMain">
        <div className="theContainer">
          <div className="leftContainer">
            <div className="imgArea">
              <img
                className="imgNews"
                src={`${
                  news && news.banner && news.banner.data.attributes.url
                }`}
                alt=""
              />
            </div>

            <div className="textArea">
              <p className="datetime">
                {(news && news.date) ||
                  moment(news && news.date).format("DD MMMM, YYYY")}
              </p>

              <h4 className="title">{news && news.title}</h4>

              <p
                className="description"
                dangerouslySetInnerHTML={{
                  __html: news && news.description,
                }}></p>

              <div className="iconsArea">
                <ul>
                  <li>
                    <a
                      href="https://www.instagram.com/igcpartners_/"
                      target="blank">
                      <img src={icon3} />
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://www.linkedin.com/company/igc-partners/"
                      target="blank">
                      <img src={icon4} />
                    </a>
                  </li>

                  <li>
                    <p>{page && page.label_share}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotíciaSelecionada;
