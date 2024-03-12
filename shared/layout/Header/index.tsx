import React from "react";
import CustomLink from "../../components/header/CustomLink";
import OptionalNav from "./OptionalNav";
import CategoryNav from "./CategoryNav";
import { Header as MainHeader } from "./styles/mainHeader";
import { Header as SubHeader } from "./styles/subHeader";

interface HeaderProps {
  headerType: string;
}

const Header: React.FC<HeaderProps> = ({ headerType }) => {
  let HeaderType;
  let type;

  switch (headerType) {
    case "main":
      HeaderType = MainHeader;
      type="main";
      break;
    case "sub":
      HeaderType = SubHeader;
      type="sub";
      break;
    default:
      HeaderType = MainHeader;
      type="main";
      break;
  }

  return (
    <>
      <HeaderType>
        <h1>
          <CustomLink to="/">EveryDay</CustomLink>
        </h1>

        <nav className="nav">
          <OptionalNav />
          <CategoryNav headerType={type}/>
        </nav>
      </HeaderType>
    </>
  );
};

export default Header;
