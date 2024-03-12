import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header2 from "./Header2";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import ChannelService from "../ChannelService";
const Layout2: React.FC = () => {
  //2. 설치하기
  ChannelService.loadScript();
  //3. 부트하기
  ChannelService.boot({
    pluginKey: process.env.REACT_APP_CHANNEL_PLUGIN,
  });
  return (
    <>
      <Header2 />
      <CoverSection>
        <Outlet />
        <Footer />
      </CoverSection>
    </>
  );
};

export default Layout2;

const CoverSection = styled.section`
  width: 100%;
  float: right;
  margin-top: 100px;

  @media (min-width: 769px) {
    width: calc(100% - 300px);
    margin: 0;
  }
`;
