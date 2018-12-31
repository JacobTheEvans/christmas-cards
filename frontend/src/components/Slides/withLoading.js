import React, { Component } from 'react'
import styled from 'styled-components'
import ReactLoading from 'react-loading'

const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  position: absolute;
  top: 0;
  right: 0;
`

function withLoading (PassedComponent) {
  return class Loading extends Component {
    constructor () {
      super()
      this.state = {
        loading: true
      }
    }

    componentDidMount () {
      setTimeout(() => {
        this.setState({
          loading: false
        })
      }, 2000)
    }

    render () {
      const { backgroundColor } = this.props
      const { loading } = this.state
      return (
        <div>
          {loading && (
            <Container color={backgroundColor}>
              <ReactLoading
                type={'bars'}
                color={'#fff'}
                height={100}
                width={100}
              />
            </Container>
          )}
          <PassedComponent {...this.props} loading={loading} />
        </div>
      )
    }
  }
}

export default withLoading
