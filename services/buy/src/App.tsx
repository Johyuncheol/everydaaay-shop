import React, { Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Globalstyles from "../../../shared/globalStyle/GlobalStyle";
import CartPage from "./page/CartPage";
import Layout from "../../../shared/layout/Layout";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Globalstyles />
      <Routes>
        <Route path="/buy" element={<Layout />}>
          <Route path="cart" element={<CartPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
