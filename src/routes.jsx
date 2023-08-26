import React from "react";
import { Route, Routes } from "react-router-dom";

const AllComponents = React.lazy(() => import("./allComponents/allComponents"));
const CapitalSolution = React.lazy(() =>
  import("./pages/CapitalSolution/CapitalSolution")
);
const FaleConosco = React.lazy(() => import("./pages/FaleConosco/FaleConosco"));
const Home = React.lazy(() => import("./pages/home/home"));
const MeA = React.lazy(() => import("./pages/M&A/M&A"));
const Notícias = React.lazy(() => import("./pages/Notícias/Notícias"));
const NotíciaSelecionada = React.lazy(() =>
  import("./pages/NotíciaSelecionada/NotíciaSelecionada")
);
const PoliticasETermos = React.lazy(() =>
  import("./pages/PoliticasETermos/PoliticasETermos")
);
const QuemSomos = React.lazy(() => import("./pages/QuemSomos/QuemSomos"));
const Social = React.lazy(() => import("./pages/Social/Social"));
const SomosUnicos = React.lazy(() => import("./pages/SomosUnicos/SomosUnicos"));
const TodasTransações = React.lazy(() =>
  import("./pages/TodasTransações/TodasTransações")
);
const TransaçõesSetor = React.lazy(() =>
  import("./pages/TransaçõesSetor/TransaçõesSetor")
);
// const Network = React.lazy(() => import("./pages/Network/Network"));
// const IpoAdivisor = React.lazy(() =>
//   import("./pages/IpoAdivisor/IpoAdivisor")
// );

function LazyRoutes() {
  return (
    <Routes>
      <Route element={<FaleConosco />} path="/fale-conosco" exact />
      <Route element={<TodasTransações />} path="/transacoes/todas" exact />
      <Route element={<Social />} path="/social" exact />
      <Route element={<Notícias />} path="/noticias" />
      {/* Rota inutilizada */}
      {/* <Route element={<Network />} path="/buscar" /> */}
      <Route element={<MeA />} path="/servicos" />
      <Route element={<TransaçõesSetor />} path="/transacoes/:id" />
      <Route element={<Home />} path="/" />
      <Route
        element={<CapitalSolution />}
        path="/servicos/capitacao-recursos"
      />
      {/* Rota inutilizada */}
      {/* <Route element={<IpoAdivisor />} path="/servicos/ipo-advisor" /> */}
      <Route element={<NotíciaSelecionada />} path="/noticias/:id" />
      <Route element={<QuemSomos />} path="/quem-somos" />
      <Route element={<SomosUnicos />} path="/quem-somos/somos-unicos" />
      <Route element={<PoliticasETermos />} path="/politica-privacidade" />
      <Route element={<AllComponents />} path="/all-components" />
    </Routes>
  );
}

export default LazyRoutes;
