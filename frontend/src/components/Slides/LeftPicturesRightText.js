import React from 'react'
import styled from 'styled-components'
import Gallery from 'react-grid-gallery'
import Typist from 'react-typist'
import { setSelectedToFalse } from '../../utils'

const Content = styled.div`
  width: 100%;
  height: 100vh;
  padding: 40px;
  overflow-y: auto;
  background-color: ${({ color }) => color};
`

const Header = styled.h3`
  width: 100%;
  text-align: left;
  font-size: 4.3rem;
  max-width: 1500px;
  margin: 0px auto 35px auto;
  color: ${({ color }) => color};
  @media screen and (max-width: 650px) {
    font-size: 3rem;
    margin: 0px auto 20px auto;
  }
`

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  max-width: 1500px;
  margin: auto;
  @media screen and (max-width: 950px) {
    flex-direction: column;
  }
`

const Text = styled.p`
  width: 33%;
  font-size: 2.2rem;
  margin: 0px;
  color: ${({ color }) => color};
  text-align: justify;
  @media screen and (max-width: 650px) {
    font-size: 1.5rem;
    line-height: 2rem;
    text-align: left;
  }
  @media screen and (max-width: 950px) {
    width: 100%;
    margin-bottom: 50px;
    order: 1;
  }
`
const SideImages = styled.div`
  width: 63%;
  @media screen and (max-width: 950px) {
    width: 100%;
    order: 2;
  }
`

function LeftTextRightPictures ({
  title,
  text,
  textColor,
  backgroundColor,
  images
}) {
  return (
    <Content color={backgroundColor}>
      <Header color={textColor}>
        <Typist
          startDelay={2850}
          cursor={{
            hideWhenDone: true
          }}
        >
          {title}
        </Typist>
      </Header>
      <Container>
        <SideImages>
          <Gallery
            images={setSelectedToFalse(images)}
            margin={10}
          />
        </SideImages>
        <Text color={textColor}>
          {text}
        </Text>
      </Container>
    </Content>
  )
}

export default LeftTextRightPictures
