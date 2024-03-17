import React from "react";
import { Routes, Route } from "react-router-dom";
import Globalstyles from "../../../shared/shared/globalStyle/GlobalStyle";
import DetailPage from "./page/detail/index";
import Layout from "../../../shared/shared/layout/Layout";

function App() {

  return (
    <>
      <Globalstyles />
      <Routes>
        <Route path="/" element={<Layout headerType={"sub"} />}>
          <Route path="/detail/:id" element={<DetailPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
