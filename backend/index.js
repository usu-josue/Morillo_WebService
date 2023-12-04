//console.log('Hola mundo')

const express = require('express');
const req = require('express/lib/request');
const server = express()

server.get('/', function (req, res) {
  res.send('Hello World')
})

server.get('/ping', (req, res) => {
    res.status(200).json(
        {
            message: 'pong'
        }
    )
})

server.listen(3000)