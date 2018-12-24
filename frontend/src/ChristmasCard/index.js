import { MetadataRequest, GetSlideRequest } from './christmascard_pb.js'
import { ChristmascardClient } from './christmascard_grpc_web_pb.js'

class ChristmasCard {
  constructor () {
    this._client = new ChristmascardClient('http://localhost:8080')
  }

  loadMeta () {
    return new Promise((resolve, reject) => {
      const request = new MetadataRequest()
      this._client.metadata(request, {}, (err, response) => {
        if (err) return reject(err)
        const length = response.getLength()
        resolve({ length })
      })
    })
  }

  getSlide (index) {
    return new Promise((resolve, reject) => {
      const request = new GetSlideRequest()
      request.setIndex(index)

      this._client.getSlide(request, {}, (err, response) => {
        if (err) return reject(err)
        const data = response.getConfig()
        resolve(data)
      })
    })
  }
}

export default ChristmasCard
