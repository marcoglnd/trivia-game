import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../trivia.png';

class Header extends Component {
  render() {
    const { avatar, name } = this.props;
    const { score } = this.props;
    return (
      <header className="header">
        <div className="player-info">
          <img
            className="avatar"
            data-testid="header-profile-picture"
            src={ avatar }
            alt="Avatar"
          />
          <div>
            <p data-testid="header-player-name">{name}</p>
            <p className="score">{score}</p>
          </div>
        </div>
        <div>
          <img className="logo-img" src={ logo } alt="logo" />
        </div>
      </header>
    );
  }
}

const MapStateToProps = (state) => ({
  avatar: state.login.img,
  name: state.login.name,
  score: state.game.score,
});

Header.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

export default connect(MapStateToProps)(Header);
