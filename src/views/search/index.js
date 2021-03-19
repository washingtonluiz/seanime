import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

//Components
import Card from "../../components/card";
import Placeholder from "../../components/card/placeholder";

//redux
import { toggleFavorite } from "../../actions";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      loadIcon: true,
      animeList: [],
      animesFavorites: [],
    };
  }

  isFavorite = (id) => {
    const { favorite } = this.props;

    const isFavorite = favorite.filter((item) => {
      return item.id === id;
    });
    if (isFavorite.length > 0) {
      return true;
    }
    return false;
  };

  toggleFavoriteFunction = async (id) => {
    const { animesFavorites } = this.state;
    const { favorite, anime } = this.props;

    // Verifica se o anime escolhido já está favoritado
    const getAnime = await anime.filter((item) => {
      return item.id === id;
    });

    // Verifica se o anime escolhido já está favoritado
    const isFavored = await favorite.filter((item) => {
      return item.id === id;
    });

    //Desfavorita e retorna o restante dos favoritos
    const disfavor = await favorite.filter((item) => {
      return item.id !== id;
    });

    if (isFavored.length === 0) {
      let newList = animesFavorites.concat(getAnime);
      await this.setState({ animesFavorites: newList });
      await this.props.toggleFavorite(newList);
    } else {
      await this.setState({ animesFavorites: disfavor });
      await this.props.toggleFavorite(disfavor);
    }
  };

  componentDidMount() {
    setTimeout(() => {
      const { anime = {}, history } = this.props;
      if (anime.length === 0) {
        history.push("/");
      } else {
        this.setState({ loadIcon: false });
      }
    }, 1000);
  }

  render() {
    const { anime = {} } = this.props;
    const { loadIcon } = this.state;

    return (
      <section className="anime search">
        <div className="wrap">
          {loadIcon ? (
            <>
              <Placeholder />
              <Placeholder />
              <Placeholder />
              <Placeholder />
            </>
          ) : (
            anime.map((item) => {
              return (
                <Card
                  key={item.id}
                  id={item.id}
                  isFavorited={this.isFavorite(item.id)}
                  toggleFavorite={(e) => this.toggleFavoriteFunction(e)}
                  {...item.attributes.posterImage}
                  {...item.attributes}
                />
              );
            })
          )}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (store) => ({
  anime: store.anime.search,
  favorite: store.anime.favorites,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ toggleFavorite }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
