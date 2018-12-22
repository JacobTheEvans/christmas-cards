import React, { Component } from 'react'
import ChristmasCard from '../../ChristmasCard'

class ChristmasCardContainer extends Component {
  constructor () {
    super()
    this.state = {
      message: '',
      err: '',
      christmasCard: new ChristmasCard()
    }
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

  render () {
    const { message, err } = this.state
    return (
      <div>
        <p>{err && err.message}</p>
        <p>{message && message}</p>
      </div>
    )
  }
}

export default ChristmasCardContainer
