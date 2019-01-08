
const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const pino = require('pino')
const yaml = require('js-yaml')
const fs = require('fs')
const Db = require('./Db')
const Auth = require('./Auth')
const Christmascard = require('./Christmascard')

class Server {
  constructor () {
    this._log = pino()
    this._loadConfig()
    this._db = new Db()
    this._auth = new Auth(this._config)
    this._christmascard = new Christmascard(this._config.cardConfigPath)
    this._configureGrpc()
  }

  _loadConfig () {
    try {
      this._log.info('Loading in config file...')
      const rawFile = fs.readFileSync('./config.yml', 'utf8')
      this._config = yaml.safeLoad(rawFile)
      this._log.info('Config file loaded')
    } catch (err) {
      this._log.error(err, 'Error when loading config file')
      process.exit(1)
    }
  }

  _configureGrpc () {
    this._log.info('Configuring grpc server...')
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
    await this._db.start()
    this._server = this.getServer()
    this._server.bind(`0.0.0.0:${this._config.port}`, grpc.ServerCredentials.createInsecure())
    this._log.info(`Starting grpc server on ${this._config.port}`)
    this._server.start()
    this._log.info(`Grpc server started on ${this._config.port}`)
  }
}

module.exports = Server
