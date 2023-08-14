import React, { useEffect, Suspense, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Footer from "../src/components/Footer/Footer";
import "./App.scss";
import Header from "./components/Header/Header";
import HeaderTop from "./components/HeaderTop/HeaderTop";
import CookiesPopup from "./components/CookiesPopup/CookiesPopup";
import { useCookies } from "react-cookie";
import ReactGA from "react-ga4";
import store from "./store/store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import LazyRoutes from "./routes";

let persistor = persistStore(store);

function App() {
  const [cookies] = useCookies(["cookiesAccepted"]);
  const [chargeAsLast, setChargeAsLast] = useState(false);

  useEffect(() => {
    ReactGA.initialize("G-37WC56ELXG");
    ReactGA.send(location.pathname + location.search);
    setTimeout(() => setChargeAsLast(true), 1500);
  }, [location]);

  return (
    <div className="App">
      {!cookies.cookiesAccepted && <CookiesPopup />}
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <HeaderTop />
            <Header />
            <Suspense
              fallback={
                <div className="noData">
                  <div class="loading-icon" />
                  <span>Loading...</span>
                </div>
              }>
              <LazyRoutes />
            </Suspense>
          </BrowserRouter>
          {chargeAsLast && <Footer />}
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
