import React, { Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Globalstyles from "../../../shared/shared/globalStyle/GlobalStyle";
import DetailPage from "./pages/DetailPage";
import { BrowserRouter } from "react-router-dom";
import Layout from "../../../shared/shared/layout/Layout";
function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Globalstyles />
        <Routes>
          <Route path="/" element={<Layout headerType={"sub"} />}>
            <Route path="/detail/:id" element={<DetailPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
