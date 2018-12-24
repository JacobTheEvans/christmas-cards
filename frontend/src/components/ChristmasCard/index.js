import React, { Component } from 'react'
import ChristmasCard from '../../ChristmasCard'
import { StoreContext } from '../../Store'

const christmasCard = new ChristmasCard()

function ChristmasCardContainer () {
  return (
    <StoreContext.Consumer>
      {({ setMeta, setSlide }) => (
        <div style={{ display: 'none' }}>
          <LoadMeta
            christmasCard={christmasCard}
            setMeta={setMeta}
          />
          <LoadSlide
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
  componentDidUpdate (prevProps) {
    if (this.props.christmasCard &&
      prevProps.index !== this.props.index
    ) {
      this.props.christmasCard.getSlide(this.props.index)
      .then(slide => this.props.setSlide(slide))
      .catch(err => console.log('Failed to load slide', err))
    }
  }

  render () {
    return false
  }
}

export default ChristmasCardContainer
