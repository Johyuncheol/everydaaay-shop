import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Globalstyles from "../../../shared/shared/globalStyle/GlobalStyle";
import DetailPage from "./page/detail/index";
import { BrowserRouter } from "react-router-dom";
import Layout from "../../../shared/shared/layout/Layout";
import { useModal } from "../../../shared/shared/hooks/useModal";
function App() {
  const AlertModal = useModal({ isOpen: false });

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
