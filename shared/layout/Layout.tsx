import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Footer from "./Footer";
import ChannelService from "../ChannelService";
import Header from "../layout/Header/index";

interface LayputProps {
  headerType: string;
}

const Layout: React.FC<LayputProps> = ({ headerType }) => {
  //2. 설치하기
  ChannelService.loadScript();
  //3. 부트하기
  ChannelService.boot({
    pluginKey: process.env.REACT_APP_CHANNEL_PLUGIN,
  });
  return (
    <>
      <Header headerType={headerType} />

      <CoverSection headerType={headerType}>
        <Outlet />
        <Footer />
      </CoverSection>
    </>
  );
};

export default Layout;

const CoverSection = styled.section<{ headerType: string }>`
  padding-top: 100px;
  @media (min-width: 769px) {
    width: ${(props) =>
      props.headerType === "main"
        ? `calc(max(67%, calc(100% - 300px)))`
        : "100%"};
    padding-top: ${(props) => (props.headerType === "main" ? "0" : "100px")};
    float: right;
  }
`;
