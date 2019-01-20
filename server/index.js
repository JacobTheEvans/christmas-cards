const RestServer = require('./src/RestServer')
const GrpcServer = require('./src/GrpcServer')

const restServer = new RestServer()
restServer.start()

const grpcServer = new GrpcServer()
grpcServer.start()

exports.getServer = grpcServer.getServer
