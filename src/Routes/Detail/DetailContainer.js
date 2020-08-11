import React from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, tvApi } from "../../api";

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname },
    } = props;
    this.state = {
      result: null,
      error: null,
      loading: true,
      isMovie: pathname.includes("/movie"),
      pathname: pathname,
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = this.props;
    const { isMovie } = this.state;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/");
    }
    let result = null;
    try {
      if (isMovie) {
        ({ data: result } = await moviesApi.movieDetail(parsedId));
        const {
          data: { imdb_id },
        } = await moviesApi.externalIDs(parsedId);
        result = { ...result, imdb_id };
      } else {
        ({ data: result } = await tvApi.showDetail(parsedId));
        const {
          data: { imdb_id },
        } = await tvApi.externalIDs(parsedId);
        result = { ...result, imdb_id };
      }
    } catch {
      this.setState({ error: "Can't find anything" });
    } finally {
      this.setState({ loading: false, result });
    }
  }

  render() {
    const { result, pathname, isMovie, error, loading } = this.state;
    return (
      <DetailPresenter
        result={result}
        pathname={pathname}
        isMovie={isMovie}
        error={error}
        loading={loading}
      />
    );
  }
}
