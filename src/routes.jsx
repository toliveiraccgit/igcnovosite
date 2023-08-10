import React from "react";
import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";

const FaleConosco = React.lazy(() =>
  import("./pages/Fale-Conosco/FaleConosco")
);
const Transactions = React.lazy(() =>
  import("./pages/Transações/transactions")
);
const Social = React.lazy(() => import("./pages/Social/Social"));
const News = React.lazy(() => import("./pages/Notícias/news"));
const Network = React.lazy(() => import("./pages/Network/network"));
const Services = React.lazy(() => import("./pages/Serviços/Services"));
const Agro = React.lazy(() => import("./pages/Agro/Agro"));
const Home = React.lazy(() => import("./pages/home/home"));
const Capital = React.lazy(() =>
  import("./pages/CapitalSolution/CapitalSolution")
);
const IpoAdivisor = React.lazy(() =>
  import("./pages/Ipo-Adivisor/IpoAdivisor")
);
const NotíciaSelecionada = React.lazy(() =>
  import("./pages/Notícia-Selecionada/NotíciaSelecionada")
);
const QuemSomos = React.lazy(() => import("./pages/Quem-Somos/QueSomos"));
const SomosUnicos = React.lazy(() =>
  import("./pages/somos-unicos/somosUnicos")
);
const PoliticaPrivacidade = React.lazy(() =>
  import("./pages/politicaPrivacidade/politicaPrivacidade")
);
const AllComponents = React.lazy(() => import("./allComponents/allComponents"));

function LazyRoutes() {
  return (
    <Routes>
      <Route element={<FaleConosco />} path="/fale-conosco" exact />
      <Route element={<Transactions />} path="/transacoes/todas" exact />
      <Route element={<Social />} path="/social" exact />
      <Route element={<News />} path="/noticias" />
      <Route element={<Network />} path="/buscar" />
      <Route element={<Services />} path="/servicos" />
      <Route element={<Agro />} path="/transacoes/:id" />
      <Route element={<Home />} path="/" />
      <Route element={<Capital />} path="/servicos/capitacao-recursos" />
      <Route element={<IpoAdivisor />} path="/servicos/ipo-advisor" />
      <Route element={<NotíciaSelecionada />} path="/noticias/:id" />
      <Route element={<QuemSomos />} path="/quem-somos" />
      <Route element={<SomosUnicos />} path="/quem-somos/somos-unicos" />
      <Route element={<PoliticaPrivacidade />} path="/politica-privacidade" />
      <Route element={<AllComponents />} path="/all-components" />
    </Routes>
  );
}

export default LazyRoutes;
