import React from 'react'
import styled from 'styled-components'

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

const Text = styled.p`
  width: 100%;
  font-size: 2.2rem;
  margin: 0px;
  color: ${({ color }) => color};
  text-align: justify;
  max-width: 1500px;
  margin: auto;
  @media screen and (max-width: 650px) {
    font-size: 1.5rem;
    line-height: 2rem;
    text-align: left;
  }
`

function LeftTextRightPictures ({
  title,
  text,
  textColor,
  backgroundColor,
}) {
  return (
    <Content color={backgroundColor}>
      <Header color={textColor}>{title}</Header>
      <Text color={textColor}>
        {text}
      </Text>
    </Content>
  )
}

export default LeftTextRightPictures
