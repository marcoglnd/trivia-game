import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Logo from '../components/Logo';
import '../styles/Ranking.css';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      players: [],
    };
    this.getRankings = this.getRankings.bind(this);
    this.setRankings = this.setRankings.bind(this);
  }

  componentDidMount() {
    this.setRankings();
  }

  setRankings() {
    const { name, img, score } = this.props;
    let ranking = [];
    if (localStorage.ranking) {
      ranking = JSON.parse(localStorage.getItem('ranking'));
    }
    const player = {
      name,
      score,
      picture: img,
    };
    if (name !== '') {
      ranking.push(player);
    }
    localStorage.setItem('ranking', JSON.stringify(ranking));
    this.getRankings();
  }

  getRankings() {
    const players = JSON.parse(localStorage.getItem('ranking'));
    this.setState({ players });
  }

  render() {
    const { players } = this.state;
    return (
      <div className="ranking">
        <Logo />
        <h1 data-testid="ranking-title"> Ranking </h1>
        { players.sort((player1, player2) => player2.score - player1.score)
          .map((player, index) => (
            <div className="player" key={ index }>
              <img src={ player.picture } alt={ player.name } />
              <p data-testid={ `player-name-${index}` }>{player.name}</p>
              <p data-testid={ `player-score-${index}` }>{player.score}</p>
            </div>)) }
        <Link to="/">
          <button className="home-btn" type="button" data-testid="btn-go-home">Home</button>
        </Link>
      </div>
    );
  }
}

const MapStateToProps = (state) => ({
  name: state.login.name,
  img: state.login.img,
  score: state.game.score,
});

Ranking.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(MapStateToProps)(Ranking);
