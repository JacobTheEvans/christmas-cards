import React from 'react'
import { createGlobalStyle } from 'styled-components'
import StoreProvider from './Store'
import ChristmasCard from './components/ChristmasCard'
import Title from './components/Slides/Title'
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
        <Title
          title={'Jacob\'s Christmas Card'}
          subTitle={'Because I\'m a nerd!'}
          textColor={'#fff'}
          backgroundColor={'#f44336'}
          sideImage={'/static/bear.png'}
        />
        <Nav
          color='#fff'
          index={0}
          handleBack={() => console.log('Handle Back')}
          handleForward={() => console.log('Handle Forward')}
        />
        <ChristmasCard />
        <GlobalStyle />
      </div>
    </StoreProvider>
  )
}

export default App
