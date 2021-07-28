import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { actionAvatar, actionName, actionScore } from '../actions';
import '../styles/Home.css';
import Logo from '../components/Logo';
import Footer from '../components/Footer';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.getToken = this.getToken.bind(this);
  }

  getToken() {
    const { history: { push } } = this.props;
    const state = {
      player: {
        name: '',
        assertions: 0,
        score: 0,
        gravatarEmail: '',
      },
    };
    const { setAvatar, setName, setScore } = this.props;
    const { email, name } = this.state;
    state.player.name = name;
    state.player.gravatarEmail = email;
    const hash = md5(email).toString();
    setAvatar(`https://www.gravatar.com/avatar/${hash}`);
    setName(name);
    setScore(0);
    localStorage.setItem('state', JSON.stringify(state));
    push('/game');
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  render() {
    const { email, name } = this.state;
    return (
      <div className="home">
        <Logo />
        <form>
          <label htmlFor="email">
            <input
              type="text"
              placeholder="Email"
              data-testid="input-gravatar-email"
              value={ email }
              id="email"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="name">
            <input
              type="text"
              placeholder="Name"
              data-testid="input-player-name"
              value={ name }
              id="name"
              onChange={ this.handleChange }
            />
          </label>
          <div className="buttons">
            <button
              type="button"
              data-testid="btn-play"
              onClick={ this.getToken }
              disabled={ !email || !name }
            >
              Play
            </button>
            <Link to="/settings">
              <button data-testid="btn-settings" type="button">Settings</button>
            </Link>
          </div>
        </form>
        <Footer />
      </div>
    );
  }
}

const MapDispatchToProps = (dispatch) => ({
  setAvatar: (avatar) => dispatch(actionAvatar(avatar)),
  setName: (name) => dispatch(actionName(name)),
  setScore: (score) => dispatch(actionScore(score)),
});

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  setAvatar: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  setScore: PropTypes.func.isRequired,
};

export default connect(null, MapDispatchToProps)(Home);
