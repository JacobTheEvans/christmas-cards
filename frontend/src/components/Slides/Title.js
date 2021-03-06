import React from 'react'
import styled from 'styled-components'
import Typist from 'react-typist'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 100vh;
  background-color: ${({ color }) => color};
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 850px) {
    flex-direction: column;
  }
`

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const MainHeader = styled.h1`
  font-size: 4.3rem;
  margin: 0;
  color: ${({ color }) => color};
  @media screen and (max-width: 650px) {
    font-size: 3rem;
  }
`

const SubHeader = styled.h2`
  font-size: 3rem;
  margin: 10px 0 0 0;
  color: ${({ color }) => color};
  @media screen and (max-width: 650px) {
    font-size: 2.4rem;
  }
`

const SideImage = styled.img`
  width: 22rem;
  height: 22rem;
  @media screen and (max-width: 650px) {
    width: 10rem;
    height: 10rem;
  }
`

function Title ({
  title,
  subTitle,
  textColor,
  backgroundColor,
  sideImage
}) {
  return (
    <Content color={backgroundColor}>
      <Container>
        <InnerContainer>
          <MainHeader color={textColor}>
            <Typist
              startDelay={2850}
              cursor={{
                hideWhenDone: true
              }}
            >
              {title}
            </Typist>
          </MainHeader>
          <SubHeader color={textColor}>{subTitle}</SubHeader>
        </InnerContainer>
        <SideImage src={sideImage} />
      </Container>
    </Content>
  )
}

export default Title
