import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import ImdbSVG from "Components/ImdbSVG";
import Tab from "Components/Tab";

const Container = styled.div`
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
  overflow-x: auto;
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
  display: inline-block;
  margin-left: 10px;
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

const DetailPresenter = ({ result, pathname, isMovie, loading, error }) =>
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
                  <SeasonList key={poster_path}>
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
            isMovie={isMovie}
          />
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  pathname: PropTypes.string,
  isMovie: PropTypes.bool,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default DetailPresenter;
