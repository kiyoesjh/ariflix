import React from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Header from "./Header";
import Home from "../Routes/Home";
import TV from "../Routes//TV";
import Search from "../Routes//Search";
import Detail from "../Routes//Detail";
import Collection from "../Routes//Collection";

export default ({ handleToggleTheme, theme }) => (
  <Router>
    <Header handleToggleTheme={handleToggleTheme} theme={theme} />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/tv" component={TV} />
      <Route path="/search" component={Search} />
      <Route path="/movie/:id" component={Detail} />
      <Route path="/show/:id" component={Detail} />
      <Route path="/collection/:id" component={Collection} />
      <Redirect from="*" to="/" />
    </Switch>
  </Router>
);
