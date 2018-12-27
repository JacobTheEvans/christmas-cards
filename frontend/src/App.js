import React from 'react'
import { createGlobalStyle } from 'styled-components'
import StoreProvider from './Store'
import ChristmasCard from './components/ChristmasCard'
import Slides from './components/Slides'
import Nav from './components/Nav'

const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  padding: 0;
  font-family: 'Montserrat', sans-serif;
}
* {
  box-sizing: border-box
}`

function App () {
  return (
    <StoreProvider>
      <div>
        <Slides />
        <Nav color='#fff' />
        <ChristmasCard />
        <GlobalStyle />
      </div>
    </StoreProvider>
  )
}

export default App
