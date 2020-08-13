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

const VideoItem = styled.div`
  display: flex;
  margin: 0 5px;
`;

const DetailVideoPresenter = ({ result, loading, error }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      {result.map(({ id, key, name }) => (
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
    </Container>
  );

DetailVideoPresenter.propTypes = {
  result: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

export default DetailVideoPresenter;
