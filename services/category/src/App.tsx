import React, { Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Globalstyles from "../../../shared/globalStyle/GlobalStyle";
import CategoryPage from "./pages/CategoryPage";
import Layout from "../../../shared/layout/Layout";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Globalstyles />
      <Routes>
        <Route path="/category" element={<Layout />}>
          <Route path="*" element={<CategoryPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
