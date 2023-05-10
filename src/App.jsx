import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "../src/components/Footer/Footer";
import "./App.scss";
import Header from "./components/Header/Header";
import HeaderTop from "./components/HeaderTop/HeaderTop";
import Agro from "./pages/Agro/Agro";
import Capital from "./pages/CapitalSolution/CapitalSolution";
import FaleConosco from "./pages/Fale-Conosco/FaleConosco";
import Home from "./pages/home/home";
import IpoAdivisor from "./pages/Ipo-Adivisor/IpoAdivisor";
import Network from "./pages/Network/network";
import News from "./pages/Notícias/news";
import QuemSomos from "./pages/Quem-Somos/QueSomos";
import Services from "./pages/Serviços/Services";
import Social from "./pages/Social/Social";
import Transactions from "./pages/Transações/transactions";
import PoliticaPrivacidade from "./pages/politicaPrivacidade/politicaPrivacidade";

import store from "./store/store";

import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import NotíciaSelecionada from "./pages/Notícia-Selecionada/NotíciaSelecionada";

let persistor = persistStore(store);

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <HeaderTop />
            <Header />
            <Routes>
              <Route element={<FaleConosco />} path="/fale-conosco" exact />
              <Route
                element={<Transactions />}
                path="/transacoes/todas"
                exact
              />
              <Route element={<Social />} path="/social" exact />
              <Route element={<News />} path="/noticias" />
              <Route element={<Network />} path="/buscar" />
              <Route element={<Services />} path="/servicos" />
              <Route element={<Agro />} path="/transacoes/:id" />
              <Route element={<Home />} path="/" />
              <Route
                element={<Capital />}
                path="/servicos/capitacao-recursos"
              />
              <Route element={<IpoAdivisor />} path="/servicos/ipo-advisor" />
              <Route element={<NotíciaSelecionada />} path="/noticias/:id" />
              <Route element={<QuemSomos />} path="/quem-somos" />
              <Route
                element={<PoliticaPrivacidade />}
                path="/politica-privacidade"
              />
            </Routes>
          </BrowserRouter>
          <Footer />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
