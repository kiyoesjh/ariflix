import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import ToggleButton from "../ToggleButton";

const Header = styled.header`
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 30px;
  background: rgba(20, 20, 20, 0.8);
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
  z-index: 100;
`;

const List = styled.ul`
  display: flex;
  height: 50px;
`;

const Item = styled.li`
  min-width: 50px;
  margin-left: 10px;
  text-align: center;
  border-bottom: ${(props) =>
    props.selected ? "5px solid  #3498db" : "1px solid transparent"};
  &:first-child {
    margin-left: 0;
  }
  transition: border-bottom 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
`;

const ALink = styled(Link)`
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: center;
`;

export default withRouter(
  ({ location: { pathname }, handleToggleTheme, theme }) => (
    <Header>
      <List>
        <Item selected={pathname === "/"}>
          <ALink to="/">Movies</ALink>
        </Item>
        <Item selected={pathname === "/tv"}>
          <ALink to="/tv">TV</ALink>
        </Item>
        <Item selected={pathname === "/search"}>
          <ALink to="/search">Search</ALink>
        </Item>
      </List>
      <ToggleButton click={handleToggleTheme} theme={theme} />
    </Header>
  )
);
