import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Globalstyles from "../../../shared/shared/globalStyle/GlobalStyle";
import ShowRoomPage from "./page/ShowRoomPage";
import Layout from "../../../shared/shared/layout/Layout";

function App() {
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <Globalstyles />
        <Routes>
          <Route path="/" element={<Layout headerType={"sub"} />}>
            <Route path="/contents/쇼룸" element={<ShowRoomPage />} />
          </Route>
        </Routes>
      </Suspense>
  );
}

export default App;
