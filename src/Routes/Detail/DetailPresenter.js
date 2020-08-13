import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import { Link, Route } from "react-router-dom";
import Loader from "../../Components/Loader";
import ImdbSVG from "../../Components/ImdbSVG";
import Tab from "../../Components/Tab";
import DetailCompany from "../DetailCompany";
import DetailCountry from "../DetailCountry";
import DetailVideo from "../DetailVideo";

const Container = styled.div`
  position: relative;
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImg});
  background-size: cover;
  background-position: center;
  filter: blur(3px);
  opacity: 0.3;
  z-index: -1;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  max-width: 1160px;
  height: 100%;
  margin: 0 auto;
`;

const Cover = styled.div`
  width: 40%;
  height: 100%;
  background-image: url(${(props) => props.bgImg});
  background-size: cover;
  background-position: center;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 60%;
  margin-left: 30px;
  overflow-x: auto;
`;

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.span`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 8px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 100%;
`;

const ImdbIcon = styled.a`
  display: block;
  margin-left: 10px;
  height: 20px;
`;

const Season = styled.strong`
  display: block;
  margin-top: 20px;
  font-size: 15px;
  font-weight: bold;
`;

const SeasonWrap = styled.div`
  display: flex;
  overflow-y: auto;
  margin: 10px 0 20px;
`;

const SeasonList = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  &:first-child {
    margin-left: 0;
  }
`;

const SeasonTitle = styled.div`
  margin: 10px 0;
`;

const SeasonPoster = styled.img`
  width: auto;
  height: 250px;
`;

const CollectionLink = styled(Link)`
  display: flex;
  padding: 0 5px;
  height: 20px;
  margin-left: 5px;
  align-items: center;
  border-radius: 3px;
  background-color: #3498db;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 32px;
  height: 32px;
  opacity: 0.3;
  background: none;
  border: 0;
  padding: 0;
  margin: 0;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
  &:before,
  &:after {
    position: absolute;
    top: 0;
    height: 33px;
    width: 2px;
    transform-origin: center;
    background-color: #fff;
    content: " ";
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
`;

const DetailPresenter = ({ result, handler, isMovie, loading, path, error }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Ariflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Ariflix
        </title>
      </Helmet>
      <Backdrop
        bgImg={
          result.backdrop_path
            ? `https://image.tmdb.org/t/p/original${result.backdrop_path}`
            : null
        }
      />
      <Content>
        <Cover
          bgImg={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />
        <Data>
          <TitleWrap>
            <Title>
              {result.original_title
                ? result.original_title
                : result.original_name}
            </Title>
            {result.imdb_id ? (
              <ImdbIcon
                href={`https://www.imdb.com/title/${result.imdb_id}`}
                target="_blank"
              >
                <ImdbSVG width={40} height={20} />
              </ImdbIcon>
            ) : null}
            {result.belongs_to_collection && (
              <CollectionLink
                to={`/collection/${result.belongs_to_collection.id}`}
              >
                collection
              </CollectionLink>
            )}
          </TitleWrap>
          <ItemContainer>
            <Item>
              <span role="img" aria-label="vote average">
                ⭐️{" "}
              </span>
              {result.vote_average}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time} min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map(({ name }, index) =>
                  index === result.genres.length - 1 ? name : `${name} / `
                )}
            </Item>
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          {result.seasons && result.seasons.length ? (
            <>
              <Season>Season</Season>
              <SeasonWrap>
                {result.seasons.map(({ poster_path, name }) => (
                  <SeasonList key={poster_path + name}>
                    <SeasonPoster
                      src={
                        poster_path
                          ? `https://image.tmdb.org/t/p/original${poster_path}`
                          : require("../../assets/noPosterSmall.png")
                      }
                    />
                    <SeasonTitle>{name}</SeasonTitle>
                  </SeasonList>
                ))}
              </SeasonWrap>
            </>
          ) : null}
          <Tab
            companies={result.production_companies}
            countries={
              isMovie ? result.production_countries : result.origin_country
            }
            videos={result.videos.results}
          />
          <Route path={`${path}/company`} component={DetailCompany} />
          <Route path={`${path}/country`} component={DetailCountry} />
          <Route path={`${path}/video`} component={DetailVideo} />
        </Data>
      </Content>
      <CloseButton onClick={() => handler(isMovie ? "/" : "/tv")} />
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  isMovie: PropTypes.bool,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  handler: PropTypes.func,
  path: PropTypes.string,
};

export default DetailPresenter;
