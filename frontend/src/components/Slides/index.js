import React from 'react'
import { StoreContext } from '../../Store'
import withLoading from './withLoading'
import Title from './Title'
import LeftTextRightPictures from './LeftTextRightPictures'
import LeftPicturesRightText from './LeftPicturesRightText'
import Text from './Text'

function Slides () {
  return (
    <StoreContext.Consumer>
      {({ slide }) => <Slide slide={slide} />}
    </StoreContext.Consumer>
  )
}

function Slide ({ slide }) {
  if (!slide) return false
  let Content
  switch (slide.type) {
    case 'title':
      Content = Title
      break
    case 'leftTextRightPictures':
      Content = LeftTextRightPictures
      break
    case 'leftPicturesRightText':
      Content = LeftPicturesRightText
      break
    case 'text':
      Content = Text
      break
    default:
      Content = <p>Error loading slide</p>
  }
  const SlideWithLoading = withLoading(Content)
  return (
    <SlideWithLoading {...slide} />
  )
}

export default Slides
