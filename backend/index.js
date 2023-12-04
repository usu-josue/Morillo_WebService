console.log('hola mundo')
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors());//habilitar cors para todas las solicitudes

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/ping', (req, res) => {
    res.status(200).json( 
        {
            message: 'pong'
        }
    )
  })

app.listen(3000)