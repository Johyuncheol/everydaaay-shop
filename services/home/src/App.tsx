import React, { Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Globalstyles from "../../../shared/globalStyle/GlobalStyle";
import MainPage from "./pages/MainPage";
import Layout2 from "../../../shared/layout/Layout2";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Globalstyles />
      <Routes>
        <Route path="/" element={<Layout2 />}>
          <Route path="/" element={<MainPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
