const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();
console.log('host0',process.env.DB_HOST);
console.log('user',process.env.DB_USER);
console.log('database',process.env.DB_NAME);
console.log('port',process.env.DB_PORT);
console.log('pass',process.env.DB_PASSWORD);
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306, // por si usas un puerto diferente
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Verificamos la conexión al momento de iniciar
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Error al conectar con la base de datos:');
        if (err.code === 'ETIMEDOUT') {
            console.error('⏱️ Timeout en la conexión: la base de datos no está respondiendo.');
        } else if (err.code === 'ECONNREFUSED') {
            console.error('🚫 Conexión rechazada: verifica que la base de datos esté activa y accesible.');
        } else if (err.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('🔐 Acceso denegado: revisa usuario y contraseña.');
        } else {
            console.error(err);
        }
        return;
    }

    console.log('✅ Conectado exitosamente a la base de datos');
    connection.release();
});

module.exports = pool.promise();
