import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./page/Home";
import { Static } from "./page/Static";
import { Dynamic } from "./page/Dynamic";
import { DynamicWithApi } from "./page/DynamicWithApi";
import ROUTES from "./routes.json";

import "./styles.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={ROUTES.HOME} component={Home} />
        <Route path={ROUTES.STATIC} component={Static} />
        <Route path={ROUTES.DYNAMIC} component={Dynamic} />
        <Route path={ROUTES.DYNAMIC_WITH_API} component={DynamicWithApi} />
      </Switch>
    </Router>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
