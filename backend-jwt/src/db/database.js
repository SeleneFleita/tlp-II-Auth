import mysql from 'mysql2/promise';
import { variablesBd } from '../config/config.js';


export const dataBase = async () => {

try {
    const connection = await mysql.createConnection({
    host: variablesBd.DB_HOST,
    user: variablesBd.DB_USER,
    password: variablesBd.DB_PASSWORD,
    database: variablesBd.DB_NAME
    });
    console.log('Conexión exitosa');
    return connection;
} catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error;
}
};
