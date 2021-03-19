import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//Components
import Card from "../../components/card";

//redux
import { toggleFavorite } from "../../actions";

//CSS
import "./index.css";

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      loadIcon: false,
    };
  }

  removeFavoriteFunction = async (id) => {
    const { favorite } = this.props;

    //Desfavorita e retorna o restante dos favoritos
    const disfavor = await favorite.filter((item) => {
      return item.id !== id;
    });

    setTimeout(() => {
      this.props.toggleFavorite(disfavor);
    }, 800);
  };

  render() {
    const { favorite = [] } = this.props;

    console.log("Anime: ", favorite);
    return (
      <section
        className={`favorite anime ${
          favorite.length === 0 ? "no-favorite" : ""
        }`}
      >
        <div className="wrap">
          {favorite.length === 0 ? (
            <p className="no-favorite--text">Não existem animes favoritados.</p>
          ) : (
            favorite.map((item) => {
              return (
                <Card
                  key={item.id}
                  id={item.id}
                  action="remove"
                  isFavorited
                  toggleFavorite={(e) => this.removeFavoriteFunction(e)}
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
  favorite: store.anime.favorites,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ toggleFavorite }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
