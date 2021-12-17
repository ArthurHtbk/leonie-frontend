import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";

import Header from "./components/Header";

import Bio from "./containers/Bio";
import Dates from "./containers/Dates";
import Music from "./containers/Music";
import Gallery from "./containers/Gallery";
import Home from "./containers/Home";
import Contact from "./containers/Contact";
import Login from "./containers/Login";
import DateSlug from "./containers/DateSlug";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronDown,
  faChevronUp,
  faHeart,
  faTimes,
  faPencilAlt,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
library.add(faChevronDown, faChevronUp, faHeart, faTimes, faPencilAlt, faLink);

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [language, setLanguage] = useState("english");

  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, {
        expires: 1,
        sameSite: "none",
        secure: true,
      });
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
    }
  };

  return (
    <Router>
      <Header
        userToken={userToken}
        setUser={setUser}
        language={language}
        setLanguage={setLanguage}
      />
      <Switch>
        <Route path="/bio">
          <Bio language={language} userToken={userToken} />
        </Route>
        <Route path="/date/:slug">
          <DateSlug language={language} />
        </Route>
        <Route path="/dates">
          <Dates language={language} userToken={userToken} />
        </Route>
        <Route path="/music">
          <Music language={language} userToken={userToken} />
        </Route>
        <Route path="/gallery">
          <Gallery language={language} userToken={userToken} />
        </Route>
        <Route path="/contact">
          <Contact language={language} />
        </Route>
        <Route path="/login">
          <Login setUser={setUser} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
