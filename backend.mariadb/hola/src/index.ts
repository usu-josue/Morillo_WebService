import greet from './greet/greet'

import { serve } from '@hono/node-server'
import { Hono } from 'hono'

//importar instancia ping desde ping

import ping from './ping/ping'

//cambiar app por server. crea una nueva instancia server de clase hono
const server = new Hono()

//define metodo get con uhna respuesta en la raiz
server.get('/', (c) => {
  return c.text('Hello Hono!')
})

//asociar la instancia ping a la ruta definida en la raiz ponga ping
//y asu me voy a ping.ts envio metodo get qye debvuelve pong

server.route('/',ping)
const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: server.fetch,
  port
})

server.route('/',greet)