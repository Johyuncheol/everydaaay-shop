import React from "react";
import styled from "styled-components";

interface CarouselLocation {
  currentIndex: number;
  totalNums: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}


const CarouselLocation: React.FC<CarouselLocation> = ({
  currentIndex,
  totalNums,
  setCurrentIndex,
}) => {
  return (
    <Div>
      <Box>
        {new Array(totalNums).fill(0).map((_, index) => {
          return (
            <Indicator
              state={index === currentIndex}
              onClick={() => setCurrentIndex(index)}
            />
          );
        })}
      </Box>
    </Div>
  );
};

export default CarouselLocation;

const Div = styled.div`
  display: flex;
  justify-content: right;
`;
const Box = styled.div`
  display: flex;
  width: 30%;
  padding-top: 1rem;
  gap: 10px;
`;

const Indicator = styled.div<{ state: boolean }>`
  height: 0.5rem;
  border: 1px solid black;
  background-color: ${(props) => (props.state ? "black" : "white")};
  flex-grow: 1;
  cursor: pointer;
`;
