import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  max-width: 560px;
  overflow: hidden;
  margin-top: 20px;
`;

const TabList = styled.ul`
  display: flex;
  width: 100%;
  height: 50px;
  font-size: 14px;
  background: rgba(0, 0, 0, 0.3);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.8);
`;

const Item = styled.li`
  display: flex;
  width: 33.333%;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.isActive === "active" ? "#000" : null)};
`;

const ImgList = styled.span`
  display: flex;
  margin: 0 5px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img`
  width: auto;
  height: 50px;
`;

const Name = styled.span`
  display: inline-block;
  margin: 5px auto;
  text-align: center;
`;

const Content = styled.div`
  margin-top: 20px;
`;

const TabDetail = styled.div`
  display: flex;
  overflow-y: auto;
  margin-top: 5px;
  &:first-child {
    margin-top: 0;
  }
`;

const VideoItem = styled.div`
  display: flex;
  margin: 0 5px;
`;

const Tab = ({ companies, countries, videos, isMovie }) => {
  const tabList = ["company", "country", "video"];
  const [active, setActive] = useState("company");
  const clickHandler = (event) => {
    setActive(event.target.className);
  };
  return (
    <Container>
      <TabList>
        {tabList.map((tab, idx) => (
          <Item key={idx} isActive={active === tab ? "active" : null}>
            <Link
              key={tab}
              to={`#${tab}`}
              onClick={clickHandler}
              className={tab}
            >
              {tab}
            </Link>
          </Item>
        ))}
      </TabList>
      <Content>
        {active === "company" && (
          <TabDetail>
            {companies.map(({ logo_path, name }) => (
              <ImgList key={logo_path}>
                <Img
                  src={
                    logo_path
                      ? `https://image.tmdb.org/t/p/original${logo_path}`
                      : require("../assets/noPosterSmall.png")
                  }
                />
                <Name>{name}</Name>
              </ImgList>
            ))}
          </TabDetail>
        )}

        {active === "country" &&
          countries.map((country, idx) => (
            <TabDetail key={active + idx}>
              <Name>{isMovie ? country.name : country}</Name>
            </TabDetail>
          ))}

        {active === "video" && (
          <TabDetail>
            {videos.map(({ id, key, name }) => (
              <VideoItem key={id}>
                <iframe
                  id={id}
                  title={name}
                  name={name}
                  src={`https://www.youtube.com/embed/${key}`}
                  width="300"
                  height="170"
                ></iframe>
              </VideoItem>
            ))}
          </TabDetail>
        )}
      </Content>
    </Container>
  );
};

Tab.propTypes = {
  companies: PropTypes.array,
  countries: PropTypes.array,
  videos: PropTypes.array,
  isMovie: PropTypes.bool,
};

export default Tab;
