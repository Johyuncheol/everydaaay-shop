import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";
import Footer from "./Footer";
import ChannelService from "../ChannelService";

const Layout: React.FC = () => {
  //2. 설치하기
  ChannelService.loadScript();
  //3. 부트하기
  ChannelService.boot({
    pluginKey: process.env.REACT_APP_CHANNEL_PLUGIN,
  });
  return (
    <LayoutSection>
      <Header />
      <CoverSection>
        <Outlet />
      </CoverSection>

      <Footer />
    </LayoutSection>
  );
};

export default Layout;

const LayoutSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const CoverSection = styled.section`
  margin-top: 100px;
`;
