import React, { useEffect, useState, lazy, Suspense } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BannerHome from "../../components/BannerHome/BannerHome";
import "./home.scss";
import { useSelector } from "react-redux";
import { api_home } from "../../api";

const Content = lazy(() => import("./components/Content/Content"));

function home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const [banners, setBanners] = useState([]);
  const [servicesTitle, setServicesTitle] = useState("serviços");
  const [clientsTitle, setClientsTitle] = useState("nossos clientes");
  const [showContent, setShowContent] = useState(false);

  const locale = useSelector((state) => state.locales.locale);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    api_home.get({ locale }).then((res) => {
      setBanners(res.data.data.attributes.banner);
      setServicesTitle(res.data.data.attributes.services);
      setClientsTitle(res.data.data.attributes.clients);
    });
  }, [locale]);

  useEffect(() => {
    if (banners.length > 0) {
      // 1 second to charge image
      setTimeout(() => setShowContent(true), 750);
    }
  }, [banners]);

  return (
    <div className="homeContainer">
      <Slider {...settings}>
        {banners &&
          banners.length > 0 &&
          banners.map((banner) => (
            <BannerHome
              key={banner.id}
              image={banner.image.data?.attributes.url ?? ""}
              title={banner.title}
              label={banner.metrics && banner.metrics.label}
              link={banner.metrics && banner.metrics.link}
            />
          ))}
      </Slider>

      {!showContent && <div style={{ margin: "80px 20px" }} />}
      <Suspense fallback={<div style={{ margin: "80px 20px" }} />}>
        {showContent && (
          <Content
            clientsTitle={clientsTitle}
            servicesTitle={servicesTitle}
            locale={locale}
          />
        )}
      </Suspense>
    </div>
  );
}

export default home;
