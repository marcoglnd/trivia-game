import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/Feedback.css';
import Logo from '../components/Logo';

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      score: 0,
      assertions: 0,
    };
    this.getFeedback = this.getFeedback.bind(this);
  }

  componentDidMount() {
    this.getFeedback();
  }

  getFeedback() {
    const state = JSON.parse(localStorage.getItem('state'));
    this.setState({
      name: state.player.name,
      score: state.player.score,
      assertions: state.player.assertions,
    });
  }

  render() {
    const { name, score, assertions } = this.state;
    const { img } = this.props;
    const three = 3;
    return (
      <div className="feedback">
        <Logo />
        <div className="feedback-details">
          <h1 data-testid="feedback-text">Results</h1>
          <div className="feedback-info">
            <img
              className="avatar"
              data-testid="header-profile-picture"
              src={ img }
              alt="Player avatar"
            />
            <div className="feedback-score">
              <p data-testid="header-player-name">{`Player: ${name}`}</p>
              <p data-testid="header-score">{`Final score: ${score}`}</p>
              <p data-testid="feedback-total-question">{`Questions: ${assertions}`}</p>
              { assertions < three && <p data-testid="feedback-text">Could be better...</p> }
              { assertions >= three && <p data-testid="feedback-text">Amazing!</p> }
            </div>
          </div>
        </div>
        <div className="buttons-div">
          <Link to="/">
            <button className="btn" type="button" data-testid="btn-play-again">Jogar novamente</button>
          </Link>
          <Link to="/ranking">
            <button className="btn" type="button" data-testid="btn-ranking">Ver Ranking</button>
          </Link>
        </div>
      </div>
    );
  }
}

const MapStateToProps = (state) => ({
  img: state.login.img,
});

Feedback.propTypes = {
  img: PropTypes.string,
}.isRequired;

export default connect(MapStateToProps)(Feedback);
