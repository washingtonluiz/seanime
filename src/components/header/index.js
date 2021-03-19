import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavLink, withRouter } from "react-router-dom";
import { toastr } from "react-redux-toastr";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt, faSearch } from "@fortawesome/free-solid-svg-icons";

//redux
import { searchAnimes } from "../../actions";

//Images
import Logo from "../../images/logo.jpg";

//CSS
import "./index.css";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      loadIcon: false,
      animes: "",
    };
  }

  handleSearch = (e) => {
    this.setState({ animes: e.target.value });
  };

  getSearchAnimes = async () => {
    const { animes } = this.state;
    const { history } = this.props;
    this.setState({ loadIcon: true });
    await this.props.searchAnimes(animes, (fn) => {
      this.setState({ loadIcon: false });
      if (fn.data.length === 0) {
        toastr.error("Opss", "Não existe esse anime");
      } else {
        history.push("/busca");
      }
    });
  };

  render() {
    const { loadIcon } = this.state;
    return (
      <header className="header">
        <div className="wrap">
          <div className="header--logo">
            <NavLink to="/">
              <img src={Logo} alt="" />
            </NavLink>
            <div>
              Se
              <span>ANIME</span>
            </div>
          </div>

          <div className="search__input">
            {/* <label htmlFor="search">Digite a cidade</label> */}
            <form>
              <input
                type="text"
                id="search"
                onChange={(e) => this.handleSearch(e)}
                placeholder="Digite a nome"
                autoComplete="off"
                required
              />
            </form>
            <button
              type="submit"
              className="search__input__ico-search"
              onClick={() => this.getSearchAnimes()}
            >
              {loadIcon && (
                <FontAwesomeIcon icon={faSyncAlt} className="rotate" />
              )}
              {!loadIcon && <FontAwesomeIcon icon={faSearch} />}
            </button>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (store) => ({
  anime: store.anime.search,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ searchAnimes }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
