import React from "react";
import styled from "styled-components";
import videoFile from "../assets/showRoom/walk.mp4";

const ShowRoomPage: React.FC = () => {
  return (
    <HeaderContent>
      <div className="bg-video">
        <video className="bg-video__content" autoPlay muted loop playsInline>
          <source src={videoFile} type="video/mp4" />
          Your browser is not supported!
        </video>
      </div>
      <InnerFont top={"25%"} left={"15%"} bgcolor="darkblue">
        everyday SHOW ROOM
      </InnerFont>
      <InnerFont top={"50%"} left={"60%"} bgcolor="none">
        까다로운
        <br /> 취향을 위한
        <br />
        매일의 노력
      </InnerFont>
      <Border />
      <ColumnsContainer>
        <Figure>
          <img
            src="https://cdn.pixabay.com/photo/2017/08/29/12/07/adult-2693054_1280.jpg"
            alt="아웃도어 브랜드"
          />
          <figcaption>모험이 중요한 당신을 위해</figcaption>
        </Figure>

        <Figure>
          <img
            src="https://cdn.pixabay.com/photo/2017/07/31/14/51/architecture-2558255_1280.jpg"
            alt="가구 브랜드"
          />
          <figcaption>편안한 곡선을 추구하는 가구</figcaption>
        </Figure>

        <Figure>
          <img
            src="https://cdn.pixabay.com/photo/2024/01/11/08/47/man-8501056_1280.jpg"
            alt="스케이트 보드 옷 브랜드"
          />
          <figcaption>보더들을 위한 옷</figcaption>
        </Figure>

        <Figure>
          <img
            src="https://cdn.pixabay.com/photo/2018/04/20/16/25/senior-3336451_1280.jpg"
            alt="캐주얼 옷 브랜드"
          />
          <figcaption>세월이 지나도 변하지않는</figcaption>
        </Figure>

        <Figure>
          <img
            src="https://cdn.pixabay.com/photo/2020/05/16/09/44/couple-5176742_1280.jpg"
            alt="옷 브랜드"
          />
          <figcaption>일상의 자연스러움을 지닌 옷</figcaption>
        </Figure>

        <Figure>
          <img
            src="https://cdn.pixabay.com/photo/2016/12/14/13/34/street-1906407_1280.jpg"
            alt="클래식 옷 브랜드"
          />
          <figcaption>편안하게 갖춘 옷</figcaption>
        </Figure>

        <Figure>
          <img
            src="https://cdn.pixabay.com/photo/2020/08/06/10/43/fisherman-5467566_1280.jpg"
            alt="fisherman 느낌 브랜드"
          />
          <figcaption>Fisherman</figcaption>
        </Figure>

        <Figure>
          <img
            src="https://cdn.pixabay.com/photo/2022/05/09/12/26/crowd-7184443_1280.jpg"
            alt="Ariel"
          />
          <figcaption>삶에 녹아든 브랜드</figcaption>
        </Figure>

        <Figure>
          <img
            src="https://cdn.pixabay.com/photo/2019/04/18/05/52/painter-4136165_1280.jpg"
            alt="미니멀룩 브랜드"
          />
          <figcaption>당신의 열정과 함께하는 브랜드</figcaption>
        </Figure>
      </ColumnsContainer>
    </HeaderContent>
  );
};

export default ShowRoomPage;
const InnerFont = styled.span<{ top: string; left: string; bgcolor: string }>`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  font-size: 3rem;
  color: white;
  background-color: ${(props) => props.bgcolor};
  font-weight: bold;
  line-height: 5rem;
  z-index: 1;
`;
const HeaderContent = styled.section`
  min-height: 100vh;
  .bg-video {
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    z-index: -1;
  }

  .bg-video__content {
    height: 100%;
    width: 100%;
    object-fit: cover; // background-size: cover 와 비슷함. (HTML 요소 or 비디오와 작동)
  }
`;

const ColumnsContainer = styled.div`
  column-width: 17rem;
  column-gap: 15px;
`;

const Figure = styled.figure`
  display: inline-block;
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin: 0;
  margin-bottom: 15px;
  padding: 10px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  transition: all 0.2s linear;

  &:hover {
    transform: scale(1.03);
  }
  img {
    width: 100%;
  }

  figcaption {
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    padding: 10px;
    margin-top: 11px;
  }
`;

const Border = styled.div`
  width: 30%;
  border: 0.5rem solid black;
  margin: 5rem 0;
`;
