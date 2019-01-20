const jwt = require('jsonwebtoken')
const jose = require('node-jose')
const moment = require('moment')
const config = require('config')
const { readFileSync } = require('fs')
const pino = require('pino')
const Db = require('./Db')

class Auth {
  static init () {
    if (!Auth._instance) {
      Auth._instance = new Auth()
    }
    return Auth._instance
  }

  constructor () {
    this._log = pino()
    this._loadKeys()
    this._db = new Db()
    this._isJwks = false
  }

  _loadKeys () {
    try {
      this._log.info('Loading in private key...')
      this._privateKey = readFileSync(config.get('application.privateKeyPath'))
      this._publicKey = readFileSync(config.get('application.publicKeyPath'))
    } catch (err) {
      throw new Error(`Not able to load private key for JWT: ${err.message}`)
    }
    this._log.info('Private key loaded')
  }

  async _ensureJwks () {
    if (!this._isJwks) {
      this._log.info('Generating JWKS...')
      this._keystore = jose.JWK.createKeyStore()
      try {
        await this._keystore.add(this._publicKey, 'pem')
      } catch (err) {
        throw new Error(`Not able to generate JWKs: ${err.message}`)
      }
      this._log.info('JWKS Generated')
    }
  }

  async login (username, password) {
    await this._db.ensureConnected()
    if (
      username === config.get('application.username') &&
      password === config.get('application.password')
    ) {
      const token = this._generateToken('admin')
      // insert token into db
      return token
    }
    return false
  }

  authenticateAdminToken (token) {
    // validate token
    // extract token
    const content = {}
    if (content.type === 'admin') {
      return true
    } else {
      return false
    }
  }

  async readAllLinks () {
    await this._db.ensureConnected()
    // read all tokens from db and map like
    // `${this.config.get('application.hostname')}/?token=${token}`
    return []
  }

  async createNewLink (name) {
    await this._db.ensureConnected()
    const token = this._generateToken('user')
    // insert token into db
    return `${this.config.get('application.hostname')}/?token=${token}`
  }

  authenticateUserToken (token) {
    // validate token
    // extract token
    const content = {}
    if (content.type === 'user') {
      return true
    } else {
      return false
    }
  }

  async deleteToken (token) {
    await this._db.ensureConnected()
    // remove token
  }

  async readJwks () {
    await this._ensureJwks()
    return this._keystore.toJSON()
  }

  _generateToken (
    type,
    expireTimeInHours = null,
    issuer = config.get('application.issuer')
  ) {
    const createdAt = moment()
    let expiresAt
    if (expireTimeInHours) expiresAt = moment().add(expireTimeInHours, 'hours')
    const body = {
      type,
      iss: issuer,
      iat: createdAt.unix()
    }
    if (expiresAt) body.exp = expiresAt.unix()
    const token = jwt.sign(
      body,
      this._privateKey,
      { algorithm: 'RS256' }
    )
    return {
      createdAt,
      expiresAt,
      token
    }
  }
}

module.exports = Auth
