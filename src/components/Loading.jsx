import React, { Component } from 'react'
import Logo from './Logo'

export default class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <Logo />
        <h1>Loading...</h1>
      </div>
    )
  }
}
