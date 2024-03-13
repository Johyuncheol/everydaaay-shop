import React, { useState } from "react";
import styled from "styled-components";

/* 디테일 이미지에 필요한 타입 */
interface DetailInfoProps {
  data: { detailImg: string; detailImgAlt: string };
}

const DetailInfo: React.FC<DetailInfoProps> = ({ data }) => {
  /* 상세이미지 펼쳐보기 상태 */
  const [isShowDetail, setIsShowDetail] = useState(false);

  return (
    <DetailInfoArea showAll={isShowDetail}>
      {/* 이미지 출력 */}
      <div className="detailInfo">
        <img src={data?.detailImg} alt={data.detailImgAlt} />
      </div>

      {/* 상품상세이미지 펼치기/접기 */}
      <button onClick={() => setIsShowDetail(!isShowDetail)}>
        {isShowDetail ? "상품정보 접기" : "상품정보 더보기"}
      </button>
    </DetailInfoArea>
  );
};

export default DetailInfo;

const DetailInfoArea = styled.section<{ showAll: boolean }>`
  .detailInfo {
    width: 100%;
    height: ${(props) => (props.showAll ? "" : "50rem")};
    overflow-y: hidden;
    img {
      width: 100%;
    }
  }

  button {
    width: 100%;
  }
`;
