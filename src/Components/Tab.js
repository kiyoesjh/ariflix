import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 560px;
  /* overflow: hidden; */
  margin-top: 20px;
  height: 50px;
`;

const LinkActive = styled.div`
  display: block;
  width: 33.333%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.8);
  background-color: ${(props) => (props.isActive ? "#000" : null)};
  color: ${(props) => (props.isActive ? "#fff" : "inherit")};
`;

const TabLink = styled(Link)`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Tab = ({
  companies,
  countries,
  videos,
  location: { pathname },
  match: { url },
}) => (
  <Container>
    {companies && companies.length ? (
      <LinkActive isActive={pathname.includes("/company") ? true : false}>
        <TabLink
          to={{ pathname: `${url}/company`, state: { result: companies } }}
        >
          company
        </TabLink>
      </LinkActive>
    ) : null}
    {countries && countries.length ? (
      <LinkActive isActive={pathname.includes("/country") ? true : false}>
        <TabLink
          to={{ pathname: `${url}/country`, state: { result: countries } }}
        >
          country
        </TabLink>
      </LinkActive>
    ) : null}

    {videos && videos.length ? (
      <LinkActive isActive={pathname.includes("/video") ? true : false}>
        <TabLink to={{ pathname: `${url}/video`, state: { result: videos } }}>
          video
        </TabLink>
      </LinkActive>
    ) : null}
  </Container>
);

Tab.propTypes = {
  companies: PropTypes.array,
  countries: PropTypes.array,
  videos: PropTypes.array,
};

export default withRouter(Tab);
