import React, { useEffect, useState } from "react";
import Calendar from "../../assets/NoticiaSelecionada/icon-calendario.png";
import LastNews from "../../components/lastNews/lastNews";
import "./NotíciaSelecionada.scss";

import moment from "moment";
import "moment/dist/locale/es";
import "moment/dist/locale/pt-br";

import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { api_news } from "../../api";

import config from "../../config/env";
import alert from "../../utils/systemAlert";

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

      <div className="NoticiaMain">
        <div className="theContainer">
          <div className="leftContainer">
            <p className="datetime">
              <img src={Calendar} alt="" />
              {moment(news && news.createdAt).format("DD MMMM, YYYY")}
            </p>
            <h4 className="title">{news && news.title}</h4>
            <img
              className="imgNews"
              src={`${config.api.BASE}${
                news && news.banner && news.banner.data.attributes.url
              }`}
              alt=""
            />
            <p
              className="description"
              dangerouslySetInnerHTML={{ __html: news && news.description }}
            ></p>
          </div>
          <div className="rightNewContainer">
            <h3 className="highlights">{page && page.latest}</h3>
            <div className="containerLastnews">
              {listNews &&
                listNews.map((item, index) => (
                  <LastNews
                    key={index}
                    title={item.attributes.title}
                    link={`/noticias/${item.id}`}
                    number={index + 1}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotíciaSelecionada;
