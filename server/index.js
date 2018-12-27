const Server = require('./src/Server')
const server = new Server()
server.start()

exports.getServer = server.getServer
