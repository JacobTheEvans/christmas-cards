const { Client } = require('pg')
const pino = require('pino')

class Db {
  constructor () {
    this._log = pino()
    this._client = new Client()
  }

  async start () {
    this._log.info('Connecting to postgres...')
    while (true) {
      try {
        await this._client.connect()
        this._log.info('Connected to postgres')
        break
      } catch (err) {
        this._log.warn(err, 'Cannot connected to postgres await 2 seconds')
        await new Promise(resolve => setTimeout(resolve, 2000))
      }
    }
    this._log.info('Creating christmas_auth table')
    const query = `
    CREATE TABLE christmas_auth(
      name VARCHAR(40) PRIMARY KEY,
      token VARCHAR(40) not null
    )
    `
    this._log.info('Christmas_auth table created')
    const res = await this._client.query(query)
    console.log(res)
  }

  stop () {
    return this._client.end()
  }
}

module.exports = Db
