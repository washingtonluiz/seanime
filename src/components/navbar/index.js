import React, { Component } from "react";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindows } from "@fortawesome/free-brands-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

//CSS
import "./index.css";

class Navbar extends Component {
  render() {
    return (
      <section className="navbar">
        <div className="wrap">
          <ul className="navbar__links">
            <li className="navbar__links--link">
              <NavLink exact to="/" activeClassName="active">
                <FontAwesomeIcon icon={faWindows} title="Home" alt="Home" />
              </NavLink>
            </li>
            <li className="navbar__links--link">
              <NavLink to="/favoritos" activeClassName="active">
                <FontAwesomeIcon
                  icon={faHeart}
                  title="Favoritos"
                  alt="Favoritos"
                />
              </NavLink>
            </li>
          </ul>
        </div>
      </section>
    );
  }
}

export default withRouter(Navbar);
