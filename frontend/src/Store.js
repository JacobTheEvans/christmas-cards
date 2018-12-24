
import React, { Component } from 'react'

export const StoreContext = React.createContext()

class StoreProvider extends Component {
  constructor () {
    super()
    this.state = {
      meta: null,
      index: 0,
      slide: null
    }
    this.setMeta = this.setMeta.bind(this)
    this.setSlide = this.setSlide.bind(this)
    this.up = this.up.bind(this)
    this.down = this.down.bind(this)
  }

  setMeta (meta) {
    console.log('Meta', meta)
    this.setState({ meta })
  }

  setSlide (slide) {
    this.setState({ slide })
  }

  up () {
    this.setState(prevState => ({ index: prevState.index + 1 }))
  }

  down () {
    this.setState(prevState => ({ index: prevState.index - 1 }))
  }

  render () {
    const { children } = this.props
    const { index, meta, slide } = this.state
    const length = meta ? meta.length : 0
    const up = this.up
    const down = this.down
    const setMeta = this.setMeta
    const setSlide = this.setSlide
    const showUp = length - 1 > index
    const showDown = index > 0
    return (
      <StoreContext.Provider
        value={{
          index,
          up,
          down,
          setMeta,
          setSlide,
          showUp,
          showDown,
          slide
        }}
      >
        {children}
      </StoreContext.Provider>
    )
  }
}

export default StoreProvider
