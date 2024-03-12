import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface Category {
  mainCategory: string;
  subCategory: string[];
  path: string;
}

interface SideBarProps {
  categoryInfo: Category;
  selectedMenu: string;
  setSelectedMenu: React.Dispatch<React.SetStateAction<string>>;
  categoryName: string;
}

const SideBar: React.FC<SideBarProps> = ({
  categoryInfo,
  selectedMenu,
  setSelectedMenu,
  categoryName,
}) => {
  return (
    <div className="sideBar">
      <div className="inner">
        <div className="categoryName">{categoryInfo?.mainCategory}</div>
        <div className="others">
          {categoryInfo?.subCategory.map((item, index) => {
            return (
              <OtherLink
              to={`${categoryInfo.path + "/" + item.toLowerCase()}`}
                className="detailCategory"
                key={index}
                onClick={() => setSelectedMenu(item)}
                selected={selectedMenu === item.toLowerCase()}
              >
                {item}
              </OtherLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SideBar;

const OtherLink = styled(Link)<{ selected: boolean }>`
  font-weight: ${(props) => (props.selected ? "bold" : "normal")};
  color: ${(props) => (props.selected ? "black" : "grey")};
  text-decoration: none;

  font-size: 1rem;
  line-height: 3rem;
  &:hover {
    color: black;
    font-weight: bold;
  }
`;
