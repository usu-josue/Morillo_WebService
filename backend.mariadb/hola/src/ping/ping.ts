//importar hono 
import {Hono} from 'hono'

// crea una instancia  ping de la clase hono
const ping = new Hono()

//metodo get
ping.get('/ping', (c) => {
    return c.json({
        'message': 'pong'
    })
})

//habilitar opcion para importar ping
export default ping