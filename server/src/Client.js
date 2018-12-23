class Client {
  acknowledge (call, callback) {
    callback(null, { message: `Hello ${call.request.name}! Well to grpc-web!` })
  }
}

module.exports = Client
