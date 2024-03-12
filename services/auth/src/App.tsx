import React, { Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Globalstyles from "../../../shared/globalStyle/GlobalStyle";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Globalstyles />
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
