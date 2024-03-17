import React from "react";
import { Routes, Route } from "react-router-dom";
import Globalstyles from "../../../shared/shared/globalStyle/GlobalStyle";
import CartPage from "./page/cart/CartPage";
import Layout from "../../../shared/shared/layout/Layout";

function App() {
  return (
    <>
      <Globalstyles />
      <Routes>
        <Route path="/buy" element={<Layout headerType={"sub"} />}>
          <Route path="cart" element={<CartPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
