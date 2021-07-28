import React, { Component } from 'react';

export default class Timer extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     seconds: 30,
  //   };
  //   this.countDown = this.countDown.bind(this);
  // }

  // componentDidMount() {
  //   this.countDown();
  // }

  // countDown() {
  //   const { seconds } = this.state;
  //   if (seconds > 0) {
  //     clearTimeout(seconds);
  //   }
  //   this.setState((prevState) => ({
  //     seconds: prevState - 1,
  //   }));
  //   return seconds;
  // }
  render() {
    return (
      <div>
        <h1>!</h1>
      </div>
    );
  }
}
