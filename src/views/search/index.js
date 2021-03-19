import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//Components
import Card from "../../components/card";
import Placeholder from "../../components/card/placeholder";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      loadIcon: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      const { anime = {}, history } = this.props;
      if (anime.length < 1) {
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
});

export default withRouter(connect(mapStateToProps)(Search));
