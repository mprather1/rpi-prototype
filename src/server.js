import express from 'express'
import bodyParser from 'body-parser'
import http from 'http'
import GPIO from './gpio-lib/src'
import path from 'path'
import favicon from 'serve-favicon'

const app = express()
const server = http.Server(app)
const router = express.Router()

const _pkg = require(path.join(path.dirname(__dirname), 'package.json')) // eslint-disable-line
const _bootstrapDir = require.resolve('bootstrap').match(/.*\/node_modules\/[^/]+\//)[0]

const gpio = new GPIO([23, 24])

app.use(router)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(favicon(path.join(__dirname, 'resources', 'images', 'favicon.png')))
app.use('/css', express.static(path.join(_bootstrapDir, 'dist', 'css')))
app.use(express.static(path.join(__dirname, 'static')))

server.on('listening', () => {
  console.log('listening...')
})

server.on('request', (req, res, next) => {
  console.log(req.method, req.url, res.statusCode)
})

router.route('/pin/:pin')
.get((req, res, next) => {
  var pin = parseInt(req.params.pin)

  gpio.getValue(pin, (err, data) => {
    if (err) throw err
    res.status(200)
    .json({
      pin: pin,
      value: data.replace(/(\r\n|\n|\r)/gm, '')
    })
  })
})

router.route('/pin/:pin/:value')
.post((req, res, next) => {
  var pin = parseInt(req.params.pin)
  let value

  if (req.params.value === 'on') {
    value = 1
  } else {
    value = 0
  }

  gpio.openPin(pin, 'out', () => {
    gpio.writePin(pin, value, () => {
      res.status(200)
      .json({
        status: 'success'
      })
    })
  })
})

server.listen(8001)
