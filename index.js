require('dotenv').config()
const express = require('express')
const cors = require('cors')

const http = require('http')
const {Server} = require('socket.io')

//. Routes
const router = require('./src/routes')

const app = express()

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: `${process.env.CLIENTURL}` // define client origin if both client and server have different origin
    }
})
require('./src/socket')(io)

const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors());

//. Endpoint Grouping dan Router
app.use('/api/v1/', router)
app.use('/uploads', express.static('uploads'))

server.listen(port, () => console.log(`Listening on port ${port}!`))
