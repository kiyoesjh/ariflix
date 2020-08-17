import React from "react";
import styled from "styled-components";

const Button = styled.button`
  display: flex;
  position: relative;
  width: 50px;
  height: 25px;
  border: 0;
  padding: 0;
  margin: 0;
  outline: none;
  box-shadow: none;
  border-radius: 25px;
  background: #888;
  cursor: pointer;
  box-shadow: 1px 0 3px 0 rgba(0, 0, 0, 0.5);
  justify-content: ${({ mode }) =>
    mode === "dark" ? "flex-start" : "flex-end"};
  &::after {
    position: absolute;
    top: 1px;
    left: ${({ mode }) => (mode === "light" ? "1px" : "26px")};
    width: 23px;
    height: 23px;
    border-radius: 50%;
    transition: left 0.3s;
    background: ${({ mode }) => (mode === "light" ? "#fff" : "#000")};
    content: "";
  }
  & > span {
    display: flex;
    width: 27px;
    height: 25px;
    align-items: center;
    justify-content: center;
    font-size: 15px;
  }
`;

export default ({ click, theme }) => {
  return (
    <Button onClick={click} mode={theme}>
      {theme === "dark" ? (
        <span role="img" aria-label="light">
          {" "}
          ☀️
        </span>
      ) : (
        <span role="img" aria-label="dark">
          🌙
        </span>
      )}
    </Button>
  );
};
