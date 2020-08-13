import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "../../Components/Loader";

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 560px;
  padding-top: 20px;
  overflow-y: auto;
  margin-top: 3px;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
`;

const Name = styled.span`
  display: flex;
  margin: 5px auto;
  text-align: center;
`;

const DetailCountryPresenter = ({ loading, result, error }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      {result.map((country) => (
        <Name key={country.name ? country.name : country}>
          {country.name ? country.name : country}
        </Name>
      ))}
    </Container>
  );

DetailCountryPresenter.propTypes = {
  loading: PropTypes.bool,
  result: PropTypes.array,
  error: PropTypes.string,
};

export default DetailCountryPresenter;
