
const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const pino = require('pino')
const config = require('config')
const Auth = require('./Auth')
const Christmascard = require('./Christmascard')

class GrpcServer {
  constructor () {
    this._log = pino()
    this._auth = Auth.init()
    this._christmascard = new Christmascard()
    this._configureGrpc()
  }

  _configureGrpc () {
    this._log.info('Configuring grpc server...')
    const packageDefinition = protoLoader.loadSync(
      config.get('application.protoPath'),
      {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
      }
    )
    const protoDescriptor = grpc.loadPackageDefinition(packageDefinition)
    this._christmascardGrpc = protoDescriptor.christmascard
    this._log.info('Grpc server configured')
  }

  getServer () {
    this._log.info('Generating instance of grpc server')
    const server = new grpc.Server()
    server.addService(this._christmascardGrpc.Christmascard.service, {
      metadata: this._christmascard.metadata,
      getSlide: this._christmascard.getSlide
    })
    this._log.info('Instance of grpc server generated')
    return server
  }

  async start () {
    this._server = this.getServer()
    this._server.bind(
      `0.0.0.0:${config.get('application.grpcServerPort')}`,
      grpc.ServerCredentials.createInsecure()
    )
    this._log.info(
      `Starting grpc server on ${config.get('application.grpcServerPort')}`
    )
    this._server.start()
    this._log.info(
      `Grpc server started on ${config.get('application.grpcServerPort')}`
    )
  }
}

module.exports = GrpcServer
