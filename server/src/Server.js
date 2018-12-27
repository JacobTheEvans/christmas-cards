
const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const pino = require('pino')
const yaml = require('js-yaml')
const fs = require('fs')
const Christmascard = require('./Christmascard')

class Server {
  constructor () {
    this._log = pino()
    this._loadConfig()
    this._christmascard = new Christmascard(this._config.cardConfigPath)
    this._configureGrpc()
  }

  _loadConfig () {
    try {
      const rawFile = fs.readFileSync('./config.yml', 'utf8')
      this._config = yaml.safeLoad(rawFile)
    } catch (err) {
      this._log.error(err, 'Error when loading config file')
      process.exit(1)
    }
  }

  _configureGrpc () {
    const packageDefinition = protoLoader.loadSync(
      this._config.protoPath,
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
  }

  getServer () {
    const server = new grpc.Server()
    server.addService(this._christmascardGrpc.Christmascard.service, {
      metadata: this._christmascard.metadata,
      getSlide: this._christmascard.getSlide
    })
    return server
  }

  start () {
    this._server = this.getServer()
    this._server.bind(`0.0.0.0:${this._config.port}`, grpc.ServerCredentials.createInsecure())
    this._log.info(`Starting server on ${this._config.port}`)
    this._server.start()
  }
}

module.exports = Server
