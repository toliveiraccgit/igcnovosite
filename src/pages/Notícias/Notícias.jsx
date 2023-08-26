import "./Notícias.scss";
import TheNews from "../../components/news/theNews";
import moment from "moment";
import "moment/dist/locale/es";
import "moment/dist/locale/pt-br";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api_news } from "../../api";
import alert from "../../utils/systemAlert";
import rightArrow from "../../assets/homeBanners/arrowRight.png";

function Notícias() {
  const locale = useSelector((state) => state.locales.locale);
  moment.locale(locale);

  const [page, setPage] = useState({});

  const [newsAll, setNewsAll] = useState([]);
  const [highlight, setHighlight] = useState({});

  const [displayCount, setDisplayCount] = useState(6);

  const handleLoadMore = () => {
    setDisplayCount(displayCount + 6);
  };

  useEffect(() => {
    api_news
      .page({ locale })
      .then((res) => {
        setPage(res.data.data.attributes);
        console.log("Date:", res.data.data.attributes);
      })
      .catch(() => {
        alert.localeNotFound(locale);
      });

    api_news.highlights({ locale }).then((res) => {
      if (res.data.data.length > 0) {
        setHighlight(res.data.data && res.data.data[0] && res.data.data[0]);
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

      <div className="welcome">
        <div className="theContainer">
          <div className="area">
            <h1>
              {page && page.latest}
              <span>{page && page.highlights}</span>
            </h1>
          </div>
        </div>
      </div>
      <div className="newsBanner">
        <div className="theContainer">
          <div className="leftContainer">
            <div
              className="bannerContainer"
              onClick={() =>
                navigate(`/noticias/${highlight && highlight.id}`)
              }>
              <div className="bannerNewsContainer">
                <img
                  className="bannerNews"
                  src={`${
                    highlight &&
                    highlight.attributes &&
                    highlight.attributes.banner &&
                    highlight.attributes.banner.data.attributes.url
                  }`}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="rightContainer">
            <div className="content">
              <h5>
                {(highlight &&
                  highlight.attributes &&
                  highlight.attributes.date) ||
                  (highlight &&
                    highlight.attributes &&
                    moment(highlight.attributes.createdAt).format(
                      "DD MMMM, YYYY"
                    ))}
              </h5>
              <h1>
                {highlight &&
                  highlight.attributes &&
                  highlight.attributes.title}
              </h1>
              <p>
                <div
                  className="short"
                  dangerouslySetInnerHTML={{
                    __html:
                      highlight &&
                      highlight.attributes &&
                      highlight.attributes.description,
                  }}></div>
              </p>
              <a href={`/noticias/${highlight.id}`}>{page.full_news}</a>
            </div>
          </div>
        </div>
      </div>

      <div className="theNews">
        <div className="theContainer">
          {newsAll &&
            newsAll
              .slice(0, displayCount)
              .map((item, index) => (
                <TheNews
                  key={index}
                  data={item}
                  postDate={
                    item.attributes.date ||
                    moment(item.attributes.createdAt).format("DD MMMM, YYYY")
                  }
                  more={page.full_news}
                />
              ))}
        </div>
        <div className="moreNews">
          <button onClick={handleLoadMore}>
            {page && page.load_more} <img src={rightArrow} alt="" />{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Notícias;
