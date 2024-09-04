import mysql from 'mysql2/promise';


const dataBase = async () => {

try {
    const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'db_system'
    });
    console.log('Conexión exitosa');
    return connection;
} catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error;
}
};


export default dataBase