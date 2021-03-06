const { Client } = require('pg')
const pino = require('pino')

class Db {
  constructor () {
    this._log = pino()
    this._client = new Client()
    this._connected = false
    this.ensureConnected()
  }

  async ensureConnected () {
    this._log.info('Connecting to postgres...')
    while (!this._connected) {
      try {
        await this._client.connect()
        break
      } catch (err) {
        if (err.toString().includes('already been connected')) break
        this._log.warn(err, 'Cannot connected to postgres await 2 seconds')
        await new Promise(resolve => setTimeout(resolve, 2000))
      }
    }
    this._log.info('Connected to postgres')
    this._connected = true
    process.on('exit', async () => await this._client.end())
    await this.initDb()
  }

  async initDb () {
    const query = `
    CREATE TABLE IF NOT EXIST christmas_auth(
      name VARCHAR(40) PRIMARY KEY,
      token VARCHAR(40) not null
    )
    `
    this._log.info('Creating christmas_auth table')
    const res = await this._client.query(query)
    this._log.info(res, 'Christmas_auth table created')
  }
}

module.exports = Db
