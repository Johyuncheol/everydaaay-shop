import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Globalstyles from "../../../shared/shared/globalStyle/GlobalStyle";
import Layout from "../../../shared/shared/layout/Layout";

const MainPage = React.lazy(() => import("./page/mainPage/index"));

function App() {
  return (
    <Suspense fallback={<div style={{height:'100vh'}}>Loading...</div>}>
      <Globalstyles />
      <Routes>
        <Route path="/" element={<Layout headerType={"main"} />}>
          <Route path="/" element={<MainPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
