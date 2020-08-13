import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "../../Components/Loader";

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 560px;
  overflow-x: auto;
  padding-top: 20px;
  margin-top: 3px;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
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

const DetailCompanyPresenter = ({ loading, result, error }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      {result.map(({ logo_path, name }) => (
        <ImgList key={logo_path + name}>
          <Img
            src={
              logo_path
                ? `https://image.tmdb.org/t/p/original${logo_path}`
                : require("../../assets/noPosterSmall.png")
            }
          />
          <Name>{name}</Name>
        </ImgList>
      ))}
    </Container>
  );

DetailCompanyPresenter.propTypes = {
  loading: PropTypes.bool,
  result: PropTypes.array,
  error: PropTypes.string,
};

export default DetailCompanyPresenter;
