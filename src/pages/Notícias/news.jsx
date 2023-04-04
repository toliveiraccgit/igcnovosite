import Calendar from "../../assets/icon-calendario.svg";
import "./news.scss";

import LastNews from "../../components/lastNews/lastNews";
import TheNews from "../../components/news/theNews";

import moment from "moment";
import "moment/dist/locale/es";
import "moment/dist/locale/pt-br";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api_news } from "../../api";

import { useNavigate } from "react-router-dom";
import config from "../../config/env";
import alert from "../../utils/systemAlert";

function news() {
  const navigate = useNavigate();
  const locale = useSelector((state) => state.locales.locale);
  moment.locale(locale);

  const [page, setPage] = useState({});

  const [news, setNews] = useState([]);
  const [newsAll, setNewsAll] = useState([]);
  const [highlight, setHighlight] = useState({});

  useEffect(() => {
    api_news
      .page({ locale })
      .then((res) => {
        setPage(res.data.data.attributes);
      })
      .catch(() => {
        alert.localeNotFound(locale);
      });

    api_news.highlights({ locale }).then((res) => {
      if (res.data.data.length > 0) {
        setHighlight(res.data.data && res.data.data[0] && res.data.data[0]);
      }
    });

    api_news.get({ locale, count: 4 }).then((res) => {
      if (res.data.data.length > 0) {
        setNews(res.data.data);
      }
    });

    api_news.get({ locale, count: 10 }).then((res) => {
      if (res.data.data.length > 0) {
        setNewsAll(res.data.data);
      }
    });
  }, [locale]);

  return (
    <div className="newsContainer">
      <div className="topPage">
        <div className="theContainer">{page && page.title}</div>
      </div>

      <div className="newsBanner">
        <div className="theContainer">
          <div className="leftContainer">
            <p className="highlights">{page && page.highlights}</p>
            <div
              className="bannerContainer"
              onClick={() => navigate(`/noticias/${highlight && highlight.id}`)}
            >
              <img
                className="bannerNews"
                src={`${config.api.BASE}${
                  highlight &&
                  highlight.attributes &&
                  highlight.attributes.banner &&
                  highlight.attributes.banner.data.attributes.url
                }`}
                alt=""
              />
              <div className="containerAbsolute">
                <p className="date">
                  <img src={Calendar} alt="" />{" "}
                  {highlight &&
                    highlight.attributes &&
                    moment(highlight.attributes.createdAt).format(
                      "DD MMMM, YYYY"
                    )}
                </p>
                <h3 className="title">
                  {highlight &&
                    highlight.attributes &&
                    highlight.attributes.title}
                </h3>
                <p className="description">
                  <div
                    className="short"
                    dangerouslySetInnerHTML={{
                      __html:
                        highlight &&
                        highlight.attributes &&
                        highlight.attributes.description,
                    }}
                  ></div>
                  <a href={`/noticias/${highlight && highlight.id}`}>
                    Continuar lendo
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="rightContainer">
            <h3 className="highlights">{page && page.latest}</h3>
            <div className="containerLastnews">
              {news &&
                news.map((item, index) => (
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

      <div className="theNews">
        <div className="theContainer">
          {newsAll &&
            newsAll.map((item, index) => (
              <TheNews
                key={index}
                data={item}
                postDate={moment(item.attributes.createdAt).format(
                  "DD MMMM, YYYY"
                )}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default news;
