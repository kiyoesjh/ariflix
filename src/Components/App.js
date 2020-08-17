import React, { Component } from "react";
import Router from "./Router";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./GlobalStyles";
import { lightTheme, darkTheme } from "./Theme";

class App extends Component {
  state = {
    theme: "light",
  };

  handleToggleTheme = () => {
    this.state.theme === "light"
      ? this.setState({ theme: "dark" })
      : this.setState({ theme: "light" });
  };

  render() {
    return (
      <ThemeProvider
        theme={this.state.theme === "light" ? lightTheme : darkTheme}
      >
        <Router
          handleToggleTheme={this.handleToggleTheme}
          theme={this.state.theme}
        />
        <GlobalStyles />
      </ThemeProvider>
    );
  }
}
export default App;
