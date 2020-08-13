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
      handler: null,
      path: "",
    };
  }

  handleHistoryBack = (func) => (path) => func(path);

  getActiveTab = (resultData, isMovie) => {
    if (
      resultData.production_companies &&
      resultData.production_companies.length
    ) {
      return ["company", resultData.production_companies];
    } else if (
      (resultData.production_countries &&
        resultData.production_countries.lenth) ||
      (resultData.origin_country && resultData.origin_country.length)
    ) {
      return isMovie
        ? ["country", resultData.production_countries]
        : ["country", resultData.origin_country];
    } else if (resultData.videos && resultData.videos.results.length) {
      return ["video", resultData.videos.results];
    }
  };

  async componentDidMount() {
    const {
      match: {
        url,
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
      this.setState({
        loading: false,
        result,
        handler: this.handleHistoryBack(push),
        path: url,
      });
    }
    const activeTab = this.getActiveTab(this.state.result, this.state.isMovie);
    return push({
      pathname: `${url}/${activeTab[0]}`,
      state: { result: activeTab[1] },
    });
  }

  render() {
    const { result, isMovie, error, loading, handler, path } = this.state;
    return (
      <DetailPresenter
        result={result}
        isMovie={isMovie}
        error={error}
        loading={loading}
        handler={handler}
        path={path}
      />
    );
  }
}
