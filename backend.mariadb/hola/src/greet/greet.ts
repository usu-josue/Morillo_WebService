
import {Hono} from 'hono'
import { Greet, Param } from './greet.mariadb'

const greet = new Hono()
//solicitar GET que retorna los saludos de las bdd en 
// un json a la ruta especifica

greet.get('/regards', async (c) => c.json( 
    await Greet.findAll()
 ) )

 greet.get('/greet/:id', async (c) => c.json( 
    await Greet.findById(Number(c.req.param('id')))
 ) )

greet.post('/greet', async (c) => {
    const param = await c.req.json()
    const result = await Greet.create(param as Param)
    return c.json(result , 201)
})

greet.put('/upgreet/:id', async (c) => {
    const param = await c.req.json()
    const upResult = await Greet.updateById(Number(c.req.param('id')), param as Param)
    return c.json(upResult, 200)
})

export default greet