import React, { useEffect, useState, lazy, Suspense } from "react";
import OurTransactions from "../OurTransactions/OurTransactions";

const OurClients = lazy(() => import("../OurClients/OurClients"));
const Services = lazy(() => import("../Services/Services"));

function Content({ servicesTitle, clientsTitle }) {
  const [showOurClients, setShowOurClients] = useState(false);
  const [showServices, setShowServices] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowOurClients(true), 500);
  }, []);

  useEffect(() => {
    setTimeout(() => setShowServices(true), 1000);
  }, []);

  return (
    <>
      <OurTransactions />
      <Suspense fallback={<div style={{ margin: "80px 20px" }} />}>
        {showOurClients && <OurClients clientsTitle={clientsTitle} />}
      </Suspense>
      <Suspense fallback={<div style={{ margin: "80px 20px" }} />}>
        {showServices && <Services servicesTitle={servicesTitle} />}
      </Suspense>
    </>
  );
}

export default Content;
