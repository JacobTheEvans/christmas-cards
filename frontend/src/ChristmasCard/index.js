import { AcknowledgeRequest, GetSlideRequest } from './christmascard_pb.js'
import { ChristmascardClient } from './christmascard_grpc_web_pb.js'

class ChristmasCard {
  constructor () {
    this._client = new ChristmascardClient('http://localhost:8080')
  }

  start (name) {
    return new Promise((resolve, reject) => {
      const request = new AcknowledgeRequest()
      request.setName(name)

      this._client.acknowledge(request, {}, (err, response) => {
        if (err) return reject(err)
        const data = response.getMessage()
        resolve(data)
      })
    })
  }

  getSlide (index) {
    return new Promise((resolve, reject) => {
      const request = new GetSlideRequest()
      request.setIndex(index)

      this._client.getSlide(request, {}, (err, response) => {
        console.log(err)
        if (err) return reject(err)
        const data = response.getConfig()
        resolve(data)
      })
    })
  }
}

export default ChristmasCard
