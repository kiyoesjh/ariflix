import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import { Link } from "react-router-dom";

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
`;

const FrontContent = styled.div`
  display: flex;
  width: 40%;
  flex-direction: column;
`;

const PosterImg = styled.div`
  width: 100%;
  height: 60%;
  background-image: url(${(props) => props.bgImg});
  background-size: cover;
  background-position: center;
  border-radius: 5px;
`;

const Title = styled.div`
  font-size: 30px;
  margin: 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  margin: 10px 0;
`;

const PosterList = styled.div`
  margin-top: 25px;
  &:first-child {
    margin-top: 0;
  }
`;

const PosterLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CollectionPoster = styled.img`
  width: 80%;
  max-width: 400px;
  height: auto;
`;

const DetailContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  padding: 20px 0;
  margin-left: 10px;
  align-items: center;
  overflow-x: auto;
`;

const CollectionTitle = styled.span`
  display: block;
  margin-top: 5px;
`;

const CollectionPresenter = ({
  loading,
  backdrop_path,
  name,
  overview,
  poster_path,
  parts,
  error,
}) => {
  return loading ? (
    <Loader />
  ) : (
    <Container>
      {backdrop_path && (
        <Backdrop
          bgImg={`https://image.tmdb.org/t/p/original${backdrop_path}`}
        />
      )}
      <Content>
        <FrontContent>
          <Title>{name}</Title>
          <Overview>{overview}</Overview>
          <PosterImg
            bgImg={
              poster_path
                ? `https://image.tmdb.org/t/p/original${poster_path}`
                : require("../../assets/noPosterSmall.png")
            }
          />
        </FrontContent>
        <DetailContent>
          {parts.map((part) => (
            <PosterList>
              <PosterLink to={`/movie/${part.id}`}>
                <CollectionPoster
                  src={
                    part.backdrop_path
                      ? `https://image.tmdb.org/t/p/original${part.backdrop_path}`
                      : require("../../assets/noPosterSmall.png")
                  }
                />
                <CollectionTitle>{part.title}</CollectionTitle>
              </PosterLink>
            </PosterList>
          ))}
        </DetailContent>
      </Content>
    </Container>
  );
};

CollectionPresenter.propTypes = {
  loading: PropTypes.bool,
  backdrop_path: PropTypes.string,
  name: PropTypes.string,
  overview: PropTypes.string,
  poster_path: PropTypes.string,
  parts: PropTypes.array,
  error: PropTypes.bool,
};

export default CollectionPresenter;
