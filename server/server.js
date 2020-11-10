const fs = require('fs')
const https = require('https')
const path = require('path')
const express = require('express')
const mongodb = require('mongodb')
const socketio = require('socket.io')
const config = require('./config')
const Manager = require('./manager')

const key = fs.readFileSync('./cert/private.key.pem')
const cert = fs.readFileSync('./cert/domain.cert.pem')
const app = express()
const server = https.createServer({key, cert}, app)
const io = socketio(server)

app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https')
    res.redirect(`https://${req.header('host')}${req.url}`)
  else
    next()
})

app.use(express.static(path.join(__dirname, 'app')))
app.get('/', (req, res) => res.sendFile(`${__dirname}/app/index.html`))
app.get('*', (req, res) => res.sendFile(`${__dirname}/app/index.html`))

process.on('uncaughtException', (err, origin) => {
  console.error(`Error: ${err}\nOrigin: ${origin}`)
  process.exit(1)
})

server.listen(config.server.port)

const init = async () => {
  try {
    const {uri, dbName, options} = config.mongodb
    const client = await mongodb.MongoClient.connect(uri, options)
    const db = client.db(dbName)

    io.on('connection', (socket) => new Manager(io, socket, db).init())
  } catch (err) {
    console.error(err)
  }
}

init()