import React, { Component } from 'react'
import ChristmasCard from '../../ChristmasCard'
import { StoreContext } from '../../Store'

const christmasCard = new ChristmasCard()

function ChristmasCardContainer () {
  return (
    <StoreContext.Consumer>
      {({ setMeta, setSlide, index }) => (
        <div>
          <LoadMeta
            christmasCard={christmasCard}
            setMeta={setMeta}
          />
          <LoadSlide
            index={index}
            christmasCard={christmasCard}
            setSlide={setSlide}
          />
        </div>
      )}
    </StoreContext.Consumer>
  )
}

class LoadMeta extends Component {
  async componentDidMount () {
    const { christmasCard, setMeta } = this.props
    try {
      const meta = await christmasCard.loadMeta('Jacob')
      setMeta(meta)
    } catch (err) {
      console.log('Failed to load application', err)
    }
  }

  render () {
    return false
  }
}

class LoadSlide extends Component {
  constructor () {
    super()
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  componentDidMount () {
    this.handleUpdate()
  }

  componentDidUpdate (prevProps) {
    const { index } = this.props
    if (prevProps.index !== index) {
      this.handleUpdate()
    }
  }

  async handleUpdate () {
    const { christmasCard, setSlide, index } = this.props
    try {
      const slide = await christmasCard.getSlide(index)
      setSlide(JSON.parse(slide))
    } catch (err) {
      console.log('Failed to load slide', err)
    }
  }

  render () {
    return false
  }
}

export default ChristmasCardContainer
