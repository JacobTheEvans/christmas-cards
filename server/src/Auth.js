const jwt = require('jsonwebtoken')
const moment = require('moment')
const { readFileSync } = require('fs')
const pino = require('pino')

class Auth {
  constructor (config) {
    this._log = pino()
    this._config = config
    this._loadKeys()
  }

  _loadKeys () {
    try {
      this._log.info('Loading in private key...')
      this._privateKey = readFileSync(this._config.privateKeyPath)
      this._log.info('Private key loaded')
    } catch (err) {
      throw new Error(`Not able to load private key for JWT: ${err.message}`)
    }
  }

  login (username, password) {
    if (username === this._config.username && password === this._config.password) {
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

  createNewLink (name) {
    const token = this._generateToken('user')
    // insert token into db
    return `${this._config.hostname}/?token=${token}`
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

  deleteToken (token) {
    // remove token
  }

  _generateToken (type, expireTimeInHours = null, issuer = this._config.issuer) {
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
