import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionBtn, actionClicked, actionTimer, actionScore } from '../actions';

class Question extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.countScore = this.countScore.bind(this);
  }

  componentDidMount() {
    const { countDown } = this.props;
    countDown();
  }

  handleClick() {
    const { setHidden, setClicked, myInterval } = this.props;
    setClicked(true);
    setHidden(false);
    clearInterval(myInterval);
  }

  countScore() {
    const score = 10;
    const { questions, timer, setScore } = this.props;
    const hard = 3;
    const medium = 2;
    let state = JSON.parse(localStorage.getItem(('state')));
    let previousScore = 0;
    if (questions.difficulty === 'easy') {
      previousScore = score + timer;
    } if (questions.difficulty === 'medium') {
      previousScore = score + timer * medium;
    } else {
      previousScore = score + timer * hard;
    }
    state.player.score += previousScore;
    setScore(state.player.score);
    state.player.assertions += 1;
    state = localStorage.setItem('state', JSON.stringify(state));
  }

  render() {
    const {
      questions: {
        category,
        question,
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
      }, disabled, getClicked, timer } = this.props;
    let alternatives = [`${correctAnswer}-C`, ...incorrectAnswers];
    alternatives = alternatives.sort();
    return (
      <div className="question">
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{question}</p>
        { alternatives.map((answer, index) => (
          <button
            className={ answer.includes('-C')
              ? getClicked && 'correct-answer' : getClicked && 'wrong-answer' }
            key={ index }
            type="button"
            data-testid={ answer.includes('-C')
              ? 'correct-answer' : `wrong-answer-${index}` }
            onClick={ answer.includes('-C')
              ? () => { this.handleClick(); this.countScore(); }
              : () => this.handleClick() }
            disabled={ disabled }
          >
            {answer.includes('-C') ? answer.slice(0, answer.indexOf('-')) : answer}
          </button>)) }
        <p className="timer">{`Time left: ${timer}s`}</p>
      </div>
    );
  }
}

const MapStateToProps = (state) => ({
  getClicked: state.game.clicked,
  timer: state.game.timer,
  score: state.game.score,
  disabled: state.game.disabled,
});

const mapDispatchToProps = (dispatch) => ({
  setHidden: (button) => dispatch(actionBtn(button)),
  setClicked: (clicked) => dispatch(actionClicked(clicked)),
  setTimer: (timer) => dispatch(actionTimer(timer)),
  setScore: (score) => dispatch(actionScore(score)),
});

Question.propTypes = {
  questions: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    difficulty: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  setHidden: PropTypes.func.isRequired,
  setClicked: PropTypes.func.isRequired,
  setScore: PropTypes.func.isRequired,
  getClicked: PropTypes.bool.isRequired,
  timer: PropTypes.number.isRequired,
  myInterval: PropTypes.number.isRequired,
  countDown: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default connect(MapStateToProps, mapDispatchToProps)(Question);
