import React, { Component } from 'react'
import ChristmasCard from '../../ChristmasCard'

class ChristmasCardContainer extends Component {
  constructor () {
    super()
    this.state = {
      message: '',
      index: 0,
      err: '',
      christmasCard: new ChristmasCard()
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  async componentDidMount () {
    const { christmasCard } = this.state
    try {
      const message = await christmasCard.start('Jacob')
      this.setState({ message })
    } catch (err) {
      this.setState({ err })
    }
  }

  async handleReset () {
    const { christmasCard } = this.state
    try {
      const message = await christmasCard.getSlide(0)
      this.setState({ message, index: 0 })
    } catch (err) {
      this.setState({ err })
    }
  }

  async handleClick () {
    const { christmasCard, index } = this.state
    try {
      const message = await christmasCard.getSlide(index + 1)
      this.setState({ message, index: index + 1 })
    } catch (err) {
      this.setState({ err })
    }
  }

  render () {
    const { message, err } = this.state
    return (
      <div>
        <h1>App</h1>
        <p>{err && err.message}</p>
        <p>{message && JSON.stringify(message)}</p>
        <button onClick={this.handleReset}>Restet</button>
        <button onClick={this.handleClick}>Slide</button>
      </div>
    )
  }
}

export default ChristmasCardContainer
