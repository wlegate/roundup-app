import React from "react";
import { Switch, Route } from "react-router-dom";
import Signup from "./Signup.jsx";

import Login from "./Login.jsx";

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/signup" component={Signup} />
    </Switch>
  </main>
);

export default Main;