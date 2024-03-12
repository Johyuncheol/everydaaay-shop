import React, { Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Globalstyles from "../../../shared/shared/globalStyle/GlobalStyle";
import CategoryPage from "./page/category/CategoryPage";
import Layout from "../../../shared/shared/layout/Layout";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Globalstyles />
      <Routes>
        <Route path="/category" element={<Layout headerType={"sub"}/>}>
          <Route path="*" element={<CategoryPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
