import {dataBase} from "../db/database.js";
import {generarJwt} from '../helpers/generar-jwt.js'
export const authCtrl = {};

//Endpoint de registro
    authCtrl.register = async (req, res) =>{
        try {
            const {username, password} = req.body
        
        const connection = await dataBase()
        const [rows] = await connection.query('INSERT INTO USERS (username, password) VALUES (?,?)', [username , password])
    
        return res.json({ message: 'usuario registrado'})
        } catch (error) {
            console.log(error)
        }
    }
// Endpoint de inicio de sesión (login) 
    authCtrl.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const connection = await dataBase()
        const [rows] = await connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password])
        
        const user = rows[0]
        // Validación de usuario
        if (!user) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        // Generar token JWT
        const token = await generarJwt(user.id);

        // Almacenar el token en una cookie segura
        res.cookie('authToken', token, {
            httpOnly: true, // La cookie no es accesible desde JavaScript
            secure: false, // Cambiar a true en producción con HTTPS
            maxAge: 3600000 // Expiración en milisegundos (1 hora)
        });

        return res.json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error Inesperado' });
    }
};



// Endpoint para validar la sesión
authCtrl.session = (req, res) => {
    try {
        console.log(req.user);
    return res.json({ message: 'Acceso permitido a área protegida', user: req.user });
    } catch (error) {
        console.log(error)
    }
};

// Endpoint de cierre de sesión (logout)
authCtrl.logout = (req, res) => {
    try {
            res.clearCookie('authToken');
            return res.json({ message: 'Cierre de sesión exitoso' });
        }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error Inesperado' });
    }
};