import styled from "styled-components";

export const Header = styled.header`
  background-color: white;
  font-size: 1.8rem;
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 10px 30px 10px 30px;

  z-index: 10;

  h1 {
    font-size: 3.5rem;
    text-align: center;
  }
  position: fixed;

  a {
    text-decoration: none;
    color: black;
  }

  @media (min-width: 769px) {
    top: 0;
    height: 100%;
    flex-direction: column-reverse;

    width: 33%;
    max-width:300px;

    .nav {
      display: flex;
      flex-direction: column;
      align-items: end;
      a {
        transition: all 200ms ease-in-out;
        padding: 6px;

        color: gray;
        &:hover {
          color: black;
          text-decoration: underline;
        }
      }

      img {
        width: 20px;
      }
      button {
        background: none;
        border: none;
      }
    }
  }
  @media (max-width: 768px) {
    align-items: center;
    .nav {
      a {
        padding: 6px;

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
  }
`;
