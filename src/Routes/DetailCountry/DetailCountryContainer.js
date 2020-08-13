import React from "react";
import DetailCountryPresenter from "./DetailCountryPresenter";

export default class DetailCountryContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      result: [],
      error: null,
    };
  }

  componentDidMount() {
    try {
      const {
        location: {
          state: { result },
        },
      } = this.props;
      this.setState({ result });
    } catch {
      this.setState({ error: "Not found" });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    return <DetailCountryPresenter {...this.state} />;
  }
}
