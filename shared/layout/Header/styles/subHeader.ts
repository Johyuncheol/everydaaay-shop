import styled from "styled-components";

export const Header = styled.header`
  background-color: white;
  font-size: 1.8rem;
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 10px 30px 10px 30px;

  z-index: 10;
  position: fixed;
  top:0;

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


  }
  h1 {
    font-size: 2rem;
    text-align: center;
  }
`;
