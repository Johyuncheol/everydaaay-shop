import React, { useEffect, useState } from "react";
import { useModal } from "../../hooks/useModal";
import SearchModalCard from "../../components/header/SearchModalCard";
import CustomLink from "../../components/header/CustomLink";
import { LogoutAPI } from "../../api/Auth";
import styled from "styled-components";
import { getSessionStorage } from "../../utill/session";

const OptionalNav: React.FC = () => {
  const searchModal = useModal({ isOpen: false });
  const [user, setUser] = useState({ name: null });

  useEffect(() => {
    const userInfo = getSessionStorage("userInfo");
    if (userInfo) {
      setUser(userInfo.name);
    }
  }, []);

  const Logout = () => {
    LogoutAPI();
  };

  return (
    <NavSection>
      {searchModal.modalState.isOpen && (
        <SearchModalCard onClose={searchModal.closeModal} />
      )}
      <button onClick={searchModal.openModal}>
        <img
          src="https://cdn.pixabay.com/photo/2016/03/31/19/14/magnifying-glass-1294834_1280.png"
          alt="search"
        />
      </button>

      <CustomLink to="/buy/cart">
        <img
          src="https://cdn.pixabay.com/photo/2013/07/12/14/53/cart-148964_1280.png"
          alt="cart"
        />
      </CustomLink>

      <CustomLink to="">♥</CustomLink>
      {user.name !==null ? (
        <a onClick={Logout}>LO</a>
      ) : (
        <CustomLink to="/auth/login">
          <img
            src="https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_1280.png"
            alt="login"
          />
        </CustomLink>
      )}
    </NavSection>
  );
};

export default OptionalNav;

const NavSection = styled.section`
  display: flex;
  justify-content: right;
  img {
    width: 20px;
  }
  button {
    background: none;
    border: none;
  }
`;
