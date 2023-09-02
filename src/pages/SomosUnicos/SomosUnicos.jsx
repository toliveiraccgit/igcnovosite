import React, { useEffect, useState, Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { api_unique } from "../../api";
import TopPage from "./components/TopPage/TopPage";
const Partners = lazy(() => import("./components/Partners/Partners"));
const SectorSpecialization = lazy(() =>
  import("./components/SectorSpecialization/SectorSpecialization")
);
const GlobalAtuation = lazy(() =>
  import("./components/GlobalAtuation/GlobalAtuation")
);

function SomosUnicos() {
  const locale = useSelector((state) => state.locales.locale);

  const [startPage, setStartPage] = useState({});
  const [showPartners, setShowPartners] = useState(false);
  const [showSectorSpecialization, setShowSectorSpecialization] =
    useState(false);
  const [showGlobalAtuation, setShowGlobalAtuation] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    api_unique
      .getBasic({ locale })
      .then((response) => {
        setStartPage(response.data.data.attributes);
      })
      .catch(() => {
        setStartPage({});
      });
  }, [locale]);

  useEffect(() => {
    // Time to wait first image
    setTimeout(() => {
      setShowPartners(true);
      setShowSectorSpecialization(true);
      setShowGlobalAtuation(true);
    }, 500);
  }, [startPage]);

  return (
    <div className="SomosUnicos">
      <TopPage startPage={startPage} />
      <Suspense fallback={<div style={{ margin: "80px 20px" }} />}>
        {showPartners && <Partners />}
      </Suspense>
      <Suspense fallback={<div style={{ margin: "80px 20px" }} />}>
        {showSectorSpecialization && <SectorSpecialization />}
      </Suspense>
      <Suspense fallback={<div style={{ margin: "80px 20px" }} />}>
        {showGlobalAtuation && <GlobalAtuation />}
      </Suspense>
    </div>
  );
}

export default SomosUnicos;
