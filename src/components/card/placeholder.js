import React, { Component } from "react";

//CSS
import "./placeholder.css";

class Placeholder extends Component {
  render() {
    return (
      <div className={`card placeholder`}>
        <div className="card__box-content">
          <header className="card__box-content__header">
            <h2 className="card--title">&ensp;</h2>
            <span className="list-heroes__item--favorite"></span>
          </header>
          <div className="card__box-content__body"></div>
        </div>
      </div>
    );
  }
}

export default Placeholder;
