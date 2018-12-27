const yaml = require('js-yaml')
const fs = require('fs')
const pino = require('pino')

class ChristmasCard {
  constructor (configPath) {
    this._log = pino()
    this._configPath = configPath
    this._loadConfig()
    this.metadata = this.metadata.bind(this)
    this.getSlide = this.getSlide.bind(this)
  }

  _loadConfig () {
    try {
      const rawFile = fs.readFileSync(this._configPath, 'utf8')
      const config = yaml.safeLoad(rawFile)
      this._meta = config.meta
      this._slides = config.slides
    } catch (err) {
      this._log.error(err, 'Error when loading card-config file')
      process.exit(1)
    }
  }

  metadata (call, callback) {
    callback(null, {
      length: this._slides.length,
      author: this._meta.author
    })
  }

  getSlide (call, callback) {
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
