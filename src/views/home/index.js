import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfiniteScroll from "react-infinite-scroll-component";

//components
import Card from "../../components/card";
import Placeholder from "../../components/card/placeholder";

//redux
import { getAnimes, toggleFavorite } from "../../actions";

//CSS
import "./index.css";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      countData: 0,
      animeList: [],
      load: true,
      animesFavorites: [],
    };
  }

  fetchMoreData = async () => {
    const { countAnime, animeList } = this.state;
    await this.setState({ countAnime: this.state.countAnime + 10 });
    await this.props.getAnimes(
      countAnime,
      (fn) => {
        let newList = animeList.concat(fn.data);
        this.setState({ animeList: newList });
      },
      this.state.animeList
    );
  };

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
    const { anime, countAnime, favorite } = this.props;
    this.setState({ animesFavorites: favorite, countData: countAnime });

    if (anime.length === 0) {
      this.props.getAnimes(
        this.state.countData,
        (fn) => {
          this.setState({
            animeList: fn.data,
            load: false,
            countAnime: this.state.countData + 10,
          });
        },
        ""
      );
    } else {
      this.setState({
        animeList: anime,
        load: false,
        countAnime: countAnime + 10,
      });
    }
  }
  render() {
    const { animeList, load } = this.state;
    const { anime } = this.props;
    return (
      <div className="main">
        <div className="wrap">
          {load && (
            <div className="main-placeholder">
              <Placeholder />
              <Placeholder />
              <Placeholder />
              <Placeholder />
            </div>
          )}
          {!load && (
            <InfiniteScroll
              dataLength={anime.length}
              next={() => this.fetchMoreData()}
              hasMore
              loader={<Placeholder />}
              className="list-style"
            >
              {animeList &&
                animeList.map((item) => (
                  <Card
                    key={item.id}
                    id={item.id}
                    isFavorited={this.isFavorite(item.id)}
                    toggleFavorite={(e) => this.toggleFavoriteFunction(e)}
                    {...item.attributes.posterImage}
                    {...item.attributes}
                  />
                ))}
            </InfiniteScroll>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  anime: store.anime.animes,
  countAnime: store.anime.countAnime,
  favorite: store.anime.favorites,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getAnimes, toggleFavorite }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
