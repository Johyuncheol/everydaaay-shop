import React, { useState } from "react";
import styled from "styled-components";

import MenuModalCard from "../components/header/MenuModalCard";
import SearchModalCard from "../components/header/SearchModalCard";
import { LogoutAPI } from "../api/Auth";
import { useModal } from "../hooks/useModal";
import { useSelector } from "react-redux";
import { RootState } from "../redux/config";

import { useDispatch } from "react-redux";
import { LOGOUT_USER } from "../redux/modules/User";
import CustomLink from "../components/header/CustomLink";

const Header2: React.FC = () => {
  const menuModal = useModal({ isOpen: false });
  const [modalCategory, setModalCategory] = useState("");

  const searchModal = useModal({ isOpen: false });
  const user = useSelector((state: RootState) => state.User);
  const servicePath = location.pathname.split("/")[1];

  const dispach = useDispatch();

  //상세카테고리 모달창 open
  const handleOpenModal = (type: string) => {
    setModalCategory(type);
    menuModal.openModal();
  };

  const Logout = () => {
    LogoutAPI();
    dispach(LOGOUT_USER());
  };

  return (
    <>
      {searchModal.modalState.isOpen && (
        <SearchModalCard onClose={searchModal.closeModal} />
      )}
      <Header>
        <h1>
          <CustomLink to="/" isLink={servicePath === undefined}>
            EveryDay
          </CustomLink>
        </h1>

        <nav className="nav">
          <div className="option">
            <a onClick={searchModal.openModal}>
              <img src="https://cdn.pixabay.com/photo/2016/03/31/19/14/magnifying-glass-1294834_1280.png" />
            </a>

            <CustomLink to="/cart" isLink={servicePath === "cart"}>
              <img src="https://cdn.pixabay.com/photo/2013/07/12/14/53/cart-148964_1280.png" />
            </CustomLink>

            <CustomLink to="" isLink={false}>
              ♥
            </CustomLink>
            {user.name ? (
              <a onClick={Logout}>LO</a>
            ) : (
              <CustomLink to="/auth/login" isLink={servicePath === "auth"}>
                <img src="https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_1280.png" />
              </CustomLink>
            )}
          </div>

          <div className="nav" onMouseLeave={menuModal.closeModal}>
            <CustomLink
              to="/category/women/all"
              isLink={servicePath === "category"}
              mouseOverFunc={() => handleOpenModal("women")}
            >
              Women
            </CustomLink>

            <CustomLink
              to="/category/man/all"
              isLink={servicePath === "category"}
              mouseOverFunc={() => handleOpenModal("man")}
            >
              Man
            </CustomLink>

            <CustomLink
              to="/category/interior/all"
              isLink={servicePath === "category"}
              mouseOverFunc={() => handleOpenModal("interior")}
            >
              Interior
            </CustomLink>

            <CustomLink
              to="/contents/쇼룸"
              isLink={servicePath === "contents"}
              mouseOverFunc={() => handleOpenModal("contents")}
            >
              contents
            </CustomLink>

            <div onMouseLeave={menuModal.closeModal}>
              {menuModal.modalState.isOpen && (
                <MenuModalCard
                  onClose={menuModal.closeModal}
                  type={modalCategory}
                  position={false}
                />
              )}
            </div>
          </div>
        </nav>
      </Header>
    </>
  );
};

export default Header2;

const Header = styled.header`
  background-color: white;
  font-size: 1.8rem;
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 10px 30px 10px 30px;

  z-index: 10;
  position: fixed;

  align-items: center;
  h1 {
    font-size: 3.5rem;
    text-align: center;
  }

  a {
    text-decoration: none;
    color: black;
  }

  .nav {
    a {
      padding: 6px;
      text-decoration: none;
      color: gray;
      &:hover {
        color: black;
        text-decoration: underline;
      }
    }

    .option {
      display: flex;
      justify-content: right;
      img {
        width: 20px;
      }
    }
  }
  h1 {
    font-size: 2rem;
    text-align: center;
  }
`;
