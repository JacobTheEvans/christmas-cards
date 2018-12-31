
import React, { Component } from 'react'
import Icon from 'react-fontawesome'
import styled from 'styled-components'
import { StoreContext } from '../Store'

const Container = styled.div`
  width: 100%;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
  position: absolute;
  z-index: 2;
  right: 0px;
  bottom: 0px;
  @media screen and (max-width: 950px) {
    padding: 0px 5px;
  }
`
const Button = styled.div`
  font-size: 3rem;
  color: ${props => props.color};
  cursor: pointer;
  display: flex;
  align-items: center;
  ${props => props.onlyOne ? `
    margin-left: auto;
  ` : ''}
`

function Nav ({ color }) {
  return (
    <StoreContext.Consumer>
      {({ up, down, showUp, showDown }) => (
        <Container>
          <Down
            down={down}
            show={showDown}
            color={color}
          />
          <Up
            up={up}
            show={showUp}
            onlyOne={showDown}
            color={color}
          />
        </Container>
      )}
    </StoreContext.Consumer>
  )
}

class Up extends Component {
  constructor () {
    super()
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  componentDidMount () {
    document.addEventListener('keyup', this.handleKeyUp, false)
  }

  componentWillUnmount () {
    document.removeEventListener('keyup', this.handleKeyUp, false)
  }

  handleKeyUp (event) {
    const { up, show } = this.props
    if (show && event.keyCode === 39) {
      up()
    }
  }
  render () {
    const { show, up, color, onlyOne } = this.props
    return (
      <div>
        {show && (
          <Button
            onClick={up}
            color={color}
            onlyOne={!onlyOne}
          >
            <Icon name={'chevron-right'} />
          </Button>
        )}
      </div>
    )
  }
}

class Down extends Component {
  constructor () {
    super()
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  componentDidMount () {
    document.addEventListener('keyup', this.handleKeyUp, false)
  }

  componentWillUnmount () {
    document.removeEventListener('keyup', this.handleKeyUp, false)
  }

  handleKeyUp (event) {
    const { down, show } = this.props
    if (show && event.keyCode === 37) {
      down()
    }
  }
  render () {
    const { show, down, color } = this.props
    return (
      <div>
        {show && (
          <Button
            onClick={down}
            color={color}
          >
            <Icon name={'chevron-left'} />
          </Button>
        )}
      </div>
    )
  }
}

export default Nav
