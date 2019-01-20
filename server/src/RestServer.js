const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const pino = require('pino')
const config = require('config')
const Auth = require('./Auth')

class RestServer {
  constructor () {
    this._log = pino()
    this._server = express()
    this._auth = Auth.init()
    this._setupMiddleware()
    this._setupRoutes()
  }

  _setupMiddleware () {
    this._log.info('Configuring rest server middleware...')

    // setup cors
    this._server.use(cors())
    // setup JSON requests
    this._server.use(bodyParser.urlencoded({ extended: false }))
    this._server.use(bodyParser.json())

    this._log.info('Rest server middleware configured')
  }

  _setupRoutes () {
    this._log.info('Configuring rest server routes...')

    this._server.post('/admin/login', async (req, res) => {
      this._log.info(req, 'POST /admin/login')
      const { username, password } = req.body
      if (!username || !password) {
        return res.status(400).send('Must provide username and password')
      }
      try {
        const token = await this._auth.login(username, password)
        if (!token) return res.status(400).send('Must provide valid username and password')
        return res.status(200).send({ token })
      } catch (err) {
        this._log.error(err, 'Error on route POST /admin/login')
        return res.status(500)
      }
    })

    this._server.get('/admin/links', async (req, res) => {
      this._log.info(req, 'GET /admin/links')
      try {
        const links = await this._auth.readAllLinks()
        return res.status(200).send({ links })
      } catch (err) {
        this._log.error(err, 'Error on route GET /admin/links')
        return res.status(500)
      }
    })

    this._server.post('/admin/links', async (req, res) => {
      this._log.info(req, 'POST /admin/links')
      const { name } = req.body
      try {
        const link = await this._auth.createNewLink(name)
        return res.status(200).send({ link })
      } catch (err) {
        this._log.error(err, 'Error on route POST /links')
        return res.status(500)
      }
    })

    this._server.post('/admin/links', async (req, res) => {
      this._log.info(req, 'POST /links')
      const { name } = req.body
      try {
        const link = await this._auth.createNewLink(name)
        return res.status(200).send({ link })
      } catch (err) {
        this._log.error(err, 'Error on route POST /admin/links')
        return res.status(500)
      }
    })

    this._server.get('/envoy/jwks', async (req, res) => {
      this._log.info(req, 'GET /envoy/jwks')
      try {
        const jwks = await this._auth.readJwks()
        return res.status(200).send(jwks)
      } catch (err) {
        this._log.error(err, 'Error on route GET /envoy/jwks')
        return res.status(500)
      }
    })

    this._log.info('Rest server routes configured')
  }

  start () {
    return new Promise(resolve => {
      this._log.info(
        `Starting rest server on port ${config.get('application.restServerPort')}`
      )
      this._server.listen(config.get('application.restServerPort'), () => {
        this._log.info(
          `Rest server started on port ${config.get('application.restServerPort')}`
        )
        resolve()
      })
    })
  }
}

module.exports = RestServer
