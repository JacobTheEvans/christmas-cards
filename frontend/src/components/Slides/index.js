import React from 'react'
import { StoreContext } from '../../Store'
import Title from './Title'
import LeftTextRightPictures from './LeftTextRightPictures'
import LeftPicturesRightText from './LeftPicturesRightText'
import Text from './Text'

function Slides () {
  return (
    <StoreContext.Consumer>
      {({ slide }) => {
        if (!slide) return false
        switch (slide.type) {
          case 'title':
            return <Title {...slide} />
          case 'leftTextRightPictures':
            return <LeftTextRightPictures {...slide} />
          case 'leftPicturesRightText':
            return <LeftPicturesRightText {...slide} />
          case 'text':
            return <Text {...slide} />
          default:
            return <p>Error loading slide</p>
        }
      }}
    </StoreContext.Consumer>
  )
}

export default Slides
