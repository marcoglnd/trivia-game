import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { actionDifficulty, actionCategory } from '../actions';
import { fetchCategory } from '../services/api';
import Logo from '../components/Logo';
import '../styles/Settings.css';

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      loading: true,
    };
    this.setCategories = this.setCategories.bind(this);
    this.chooseCategory = this.chooseCategory.bind(this);
    this.changeDifficulty = this.changeDifficulty.bind(this);
  }

  componentDidMount() {
    this.setCategories();
  }

  async setCategories() {
    const categories = await fetchCategory();
    this.setState({ categories, loading: false });
  }

  changeDifficulty({ target }) {
    const { setDifficulty } = this.props;
    const { value } = target;
    setDifficulty(value);
  }

  chooseCategory({ target: { value } }) {
    const { setCategory } = this.props;
    setCategory(value);
  }

  render() {
    const { loading, categories } = this.state;
    if (loading) {
      return <div>Loading...</div>;
    }
    return (
      <div className="settings">
        <Logo />
        <div className="settings-menu">
          <h1 data-testid="settings-title">Settings</h1>
          <div className="settings-select">
            <label htmlFor="difficulty">
              Questions difficulty: 
              <select
                id="difficulty"
                onChange={ this.changeDifficulty }
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </label>
            <label htmlFor="categories">
              Categories: 
              <select name="categories" id="categories" onChange={ this.chooseCategory }>
                { categories.map((category, index) => (
                  <option
                    key={ index }
                    onChange={ this.chooseCategory }
                    value={ category.id }
                  >
                    {category.name}
                  </option>))}
              </select>
            </label>
          </div>
          <Link to="/">Home</Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setDifficulty: (difficulty) => dispatch(actionDifficulty(difficulty)),
  setCategory: (category) => dispatch(actionCategory(category)),
});

Settings.propTypes = {
  setDifficulty: PropTypes.func.isRequired,
  setCategory: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Settings);
