
const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const pino = require('pino')
const Client = require('./src/Client')

const PROTO_PATH = `./christmascard.proto`
const log = pino()
const port = 9090

const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
)
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition)
const christmascard = protoDescriptor.christmascard
const client = new Client()

function getServer () {
  const server = new grpc.Server()
  server.addService(christmascard.Christmascard.service, {
    metadata: client.metadata,
    getSlide: client.getSlide
  })
  return server
}

const server = getServer()
server.bind(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure())
log.info(`Starting server on ${port}`)
server.start()

exports.getServer = getServer
