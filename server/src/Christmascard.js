const yaml = require('js-yaml')
const fs = require('fs')
const pino = require('pino')
const config = require('config')

class ChristmasCard {
  constructor () {
    this._log = pino()
    this._loadConfig()
    this.metadata = this.metadata.bind(this)
    this.getSlide = this.getSlide.bind(this)
  }

  _loadConfig () {
    try {
      this._log.info('Loading in card-config file...')
      const rawFile = fs.readFileSync(config.get('application.cardConfigPath'), 'utf8')
      const cardConfig = yaml.safeLoad(rawFile)
      this._meta = cardConfig.meta
      this._slides = cardConfig.slides
      this._log.info('Card-config loaded')
    } catch (err) {
      this._log.error(err, 'Error when loading card-config file')
      process.exit(1)
    }
  }

  metadata (call, callback) {
    this._log.info(call, 'Metadata')
    callback(null, {
      length: this._slides.length,
      author: this._meta.author
    })
  }

  getSlide (call, callback) {
    this._log.info(call, 'getSlide')
    const { index } = call.request
    const slide = this._slides[index]
    if (!slide) {
      callback(Error(`Cannot find slide ${index}`))
    } else {
      callback(null, {
        index,
        config: JSON.stringify(slide)
      })
    }
  }
}

module.exports = ChristmasCard
