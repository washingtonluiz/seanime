import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import { Store } from "./store";

//Components
import { Header, Footer, Messages, Navbar } from "./components";

//Views
import { Home, Search, Favorites } from "./views";

export default function Routes() {
  return (
    <Provider store={Store}>
      <Router>
        <div className="container">
          <Messages />
          <Header />
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/busca" component={Search} />
            <Route path="/favoritos" component={Favorites} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}
