import React, { useState } from "react";
import MenuModalCard from "../../components/header/MenuModalCard";
import { useModal } from "../../hooks/useModal";
import CustomLink from "../../components/header/CustomLink";

const CategoryNav: React.FC<{headerType:string}> = ({headerType}) => {
  const menuModal = useModal({ isOpen: false });
  const [modalCategory, setModalCategory] = useState("");

  //상세카테고리 모달창 open
  const handleOpenModal = (type: string) => {
    setModalCategory(type);
    menuModal.openModal();
  };
  return (
    <div className="nav" onMouseLeave={menuModal.closeModal}>
      <CustomLink
        to="/category/women/all"
        mouseOverFunc={() => handleOpenModal("women")}
      >
        Women
      </CustomLink>

      <CustomLink
        to="/category/man/all"
        mouseOverFunc={() => handleOpenModal("man")}
      >
        Man
      </CustomLink>

      <CustomLink
        to="/category/interior/all"
        mouseOverFunc={() => handleOpenModal("interior")}
      >
        Interior
      </CustomLink>

      <CustomLink
        to="/contents/쇼룸"
        mouseOverFunc={() => handleOpenModal("contents")}
      >
        contents
      </CustomLink>

      <div onMouseLeave={menuModal.closeModal}>
        {menuModal.modalState.isOpen && (
          <MenuModalCard
            onClose={menuModal.closeModal}
            type={modalCategory}
            position={headerType}
          />
        )}
      </div>
    </div>
  );
};

export default CategoryNav;
