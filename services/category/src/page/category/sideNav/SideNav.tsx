import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface Category {
  mainCategory: string;
  subCategory: string[];
  path: string;
}

interface SideNavProps {
  categoryInfo: Category;
  selectedMenu: string;
  setSelectedMenu: React.Dispatch<React.SetStateAction<string>>;
}

const SideNav: React.FC<SideNavProps> = ({
  categoryInfo,
  selectedMenu,
  setSelectedMenu,
}) => {
  return (
    <SideNavSection className="sideNav">
      <div className="inner">
        <div className="categoryName">{categoryInfo?.mainCategory}</div>
        <div className="others">
          {categoryInfo?.subCategory.map((item, index) => {
            return (
              <OtherLink
                to={`/${categoryInfo.path + "/" + item.toLowerCase()}`}
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
    </SideNavSection>
  );
};

export default SideNav;

const SideNavSection = styled.section`
  width: 10rem;
  .inner {
    width: 10rem;
    .categoryName {
      font-size: 1.5rem;
      font-weight: 500;
      min-height: 5rem;
      display: flex;
      align-items: center;
      border-bottom: 5px solid black;
    }
    .others {
      display: flex;
      flex-direction: column;
      @media (max-width: 430px) {
        flex-direction: row;
        gap: 40%;
      }
    }
  }
`;

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
