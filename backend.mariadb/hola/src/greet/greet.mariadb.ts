// En este archivo se realiza la conexion a la bdd
//importa la instancia de conexion 
import { createConnection, Connection, ConnectionConfig } from "mariadb";
// Importa el módulo 'dotenv' para cargar variables de entorno 
import * as dotenv from 'dotenv'

// Para que reconozca la conexion del archivo env
// Carga las variables de entorno desde el archivo .env
dotenv.config()

// Accede a las variables de entorno
//Leer la conexión, del archivo .env tomar estas variables 
const dbConfig: ConnectionConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    connectTimeout: 5000 // Ajusta el tiempo de espera según sea necesario
}
//declara una conexion
let connection: Connection;
//funcion asincrona que conecta a la BDD
async function connectToDatabase(): Promise<void> {
    connection = await createConnection(dbConfig)
}

connectToDatabase()
// se define el tipo Param con dos argumentos
export type Param = {
    greet: string
    language: string
  }

  // Crear una clase para los saludos, con varios metodos
  //para interactuar con los datos mediante sentencias SQL
  export class Greet {
    //metodo realiza consulta todos los saludos 
    static async findAll() {
      return await connection.query(
        'SELECT id, greet, language FROM regards'
      )
    }
//buscar un saludo en la base de datos según un identificador id
    static async findById(id: number) {
        const result = await connection.query(
          'SELECT id, greet, language FROM regards where id = ?', [id]
        )
    
        return result[0]
      }
//Actualizar datos de un saludo en la base según el identificador id
    static async updateById(id: number, param: Param){
        const [{ id: updadId }] = await connection.query(
          'UPDATE regards SET greet = ?, language = ? where id = ? RETURNING id',
          [param.greet, param.language, id]
        )
        //consulta el nuevo dato
        const result = await connection.query(
          'SELECT id, greet, language FROM regards where id = ?', [updadId]
        )

        return result[0]
      }
//insertar un nuevo saludo 
      static async create(param: Param) {
        const [{ id }] = await connection.query(
          'INSERT INTO regards (greet, language) VALUES (?, ?) returning id',
          [param.greet, param.language]
        )
//Inserta y consulta el nuevo dato
        const result = await connection.query(
          'SELECT id, greet, language FROM regards where id = ?', [id]
        )
    
        return result[0]
      }
    }