
const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const Client = require('./src/Client')

const PROTO_PATH = `${__dirname}/../christmascard.proto`

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
const todo = protoDescriptor.todo
const client = new Client()

function getServer () {
  const server = new grpc.Server()
  server.addService(todo.Todo.service, {
    acknowledge: client.acknowledge
  })
  return server
}

const server = getServer()
server.bind('0.0.0.0:9090', grpc.ServerCredentials.createInsecure())
server.start()

exports.getServer = getServer
