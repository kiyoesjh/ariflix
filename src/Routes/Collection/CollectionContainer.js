import React from "react";
import CollectionPresenter from "./CollectionPresenter";
import { collectionApi } from "../../api";

export default class CollectionContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      parts: null,
      poster_path: null,
      name: "",
      overview: "",
      backdrop_path: null,
      error: null,
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    try {
      const { data } = await collectionApi(id);
      const { backdrop_path, name, overview, poster_path, parts } = data;
      this.setState({ backdrop_path, name, overview, poster_path, parts });
    } catch {
      this.setState({ error: "Not found" });
    } finally {
      this.setState({ loading: false });
    }
  }
  render() {
    const {
      loading,
      backdrop_path,
      name,
      overview,
      poster_path,
      parts,
      error,
    } = this.state;
    return (
      <CollectionPresenter
        loading={loading}
        backdrop_path={backdrop_path}
        name={name}
        overview={overview}
        poster_path={poster_path}
        parts={parts}
        error={error}
      />
    );
  }
}
