import React from "react";
import { Routes, Route } from "react-router-dom";
import Globalstyles from "../../../shared/shared/globalStyle/GlobalStyle";
import Layout from "../../../shared/shared/layout/Layout";
import MainPage from "./page/mainPage/index";

function App() {
  return (
    <>
      <Globalstyles />
      <Routes>
        <Route path="/" element={<Layout headerType={"main"} />}>
          <Route path="/" element={<MainPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
