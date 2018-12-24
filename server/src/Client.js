const slides = [
  {
    title: 'hello',
    text: 'here',
    pictures: [ '1', '2', '3' ]
  }
]

class Client {
  metadata (call, callback) {
    callback(null, {
      length: slides.length,
      author: 'Jacob Evans'
    })
  }

  getSlide (call, callback) {
    const { index } = call.request
    const slide = slides[index]
    if (!slide) {
      callback(Error(`Cannot find slide ${index}`))
    } else {
      callback(null, {
        index,
        config: JSON.stringify(slide)
      })
    }
  }
}

module.exports = Client
