import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartO, faPlus } from "@fortawesome/free-solid-svg-icons";

//CSS
import "./index.css";

class Card extends Component {
  constructor() {
    super();
    this.state = {
      favorited: false,
      removeAnimationClass: "",
      toggleAction: false,
    };
  }

  toggleAction = () => {
    this.setState({ toggleAction: !this.state.toggleAction });
  };

  render() {
    const {
      action,
      canonicalTitle,
      description,
      small,
      id,
      toggleFavorite,
      isFavorited,
    } = this.props;
    const { favorited, removeAnimationClass, toggleAction } = this.state;
    return (
      <div
        className={`card ${removeAnimationClass} ${
          canonicalTitle.length > 28 ? "title-large" : ""
        }`}
        style={{
          background: `url(${small}) center center / cover no-repeat`,
        }}
      >
        <div
          className={`card__box-content ${toggleAction ? "open-detail" : ""}`}
        >
          <header className="card__box-content__header">
            <h2 className="card--title">{canonicalTitle}</h2>
            <span
              className={`list-heroes__item--favorite ${
                isFavorited || favorited ? "favorited" : ""
              }`}
            >
              <FontAwesomeIcon
                icon={faPlus}
                className="open-detail"
                onClick={this.toggleAction}
              />
              <FontAwesomeIcon
                icon={isFavorited || favorited ? faHeartO : faHeart}
                title="Favoritar"
                alt="Favoritar"
                onClick={() => {
                  this.setState({
                    favorited: !this.state.favorited,
                    removeAnimationClass: `${
                      action === "remove" ? "animation-favorite" : ""
                    }`,
                  });
                  toggleFavorite(id, favorited);
                }}
              />
            </span>
          </header>
          <div className={`card__box-content__body`}>{description}</div>
        </div>
      </div>
    );
  }
}

export default Card;
