const Christmascard = require('./Christmascard')

class Client {
  constructor () {
    this._chirstmascard = new Christmascard()
  }

  acknowledge (call, callback) {
    callback(null, { message: `Hello ${call.request.name}! Well to grpc-web!` })
  }
}

module.exports = Client
