import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import menuData from "../../staticData/json/menuCategory.json";
import CustomLink from "./CustomLink";

interface MenuModalProps {
  onClose: () => void;
  type: string;
  position: string;
}

const MenuModal: React.FC<MenuModalProps> = ({ onClose, type, position }) => {
  interface Category {
    mainCategory: string;
    subCategory: string[];
    path: string;
  }

  const [categoryInfo, setCategoryInfo] = useState<Category>();
  const servicePath = location.pathname.split("/")[1];

  useEffect(() => {
    if (type === "women") setCategoryInfo(menuData.Women);
    if (type === "man") setCategoryInfo(menuData.Man);
    if (type === "interior") setCategoryInfo(menuData.Interior);
    if (type === "contents") setCategoryInfo(menuData.Contents);
  }, [type, menuData]);

  return (
    <ModalSection onMouseLeave={onClose} position={position}>
      <div className="category">
        <div className="mainCategory">
          <span>{categoryInfo?.mainCategory}</span>
        </div>

        {categoryInfo?.subCategory.map((item, index) => {
          return (
            <div className="detailCategory" onClick={onClose} key={index}>
              <CustomLink
                to={`/${categoryInfo.path + "/" + item.toLowerCase()}`}
              >
                {item}
              </CustomLink>
            </div>
          );
        })}
      </div>
    </ModalSection>
  );
};

export default MenuModal;

const ModalSection = styled.section<{ position: string }>`
  display: flex;
  position: absolute;

  @media (min-width: 769px) {
    top: ${(props) => (props.position === "main" ? 0 : "")};
  }

  width: 100%;
  height: 300px;
  background-color: #f0f2a0f8;
  padding: 0 2rem;
  border-bottom: 3px solid black;
  gap: 10rem;

  z-index: 10;

  .category {
    display: flex;
    flex-direction: column;

    .mainCategory {
      line-height: 4rem;
      text-decoration: none;
      font-weight: bold;
      color: black;
    }
    .detailCategory {
      a {
        transition: all 200ms ease-in-out;
        font-size: 0.9rem;
        line-height: 2rem;
        text-decoration: none;
        color: black;

        &:hover {
          font-weight: bold;
        }
      }
    }
  }
`;
