import dataBase from "../db/database.js";
export const authCtrl = {};

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

//manejar el inicio de sesión POST
authCtrl.login = async (req, res) => {
    const { username, password } = req.body;

    // Buscar usuario
    const connection = await dataBase()
    const [rows] = await connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password])

    if (rows.length > 0) {
        // Guardar información del usuario en la sesión
        const user = rows[0]
        req.session.userId = user.id;
        req.session.username = user.username;

        return res.json({ 
            message: 'Inicio de sesión exitoso', 
            user: { id: user.id, username: user.username } });
    } else {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
};

//obtener los datos de la sesión GET
authCtrl.session = async (req, res) => {
    
    if (req.session.userId) {
        return res.json({ 
            loggedIn: true, 
            user: { id: req.session.userId, username: req.session.username } });
    } else {
        return res.status(401).json({ loggedIn: false, message: 'No hay sesión activa' });
    }
}

//Cerrar la sesión GET
authCtrl.logout =  (req, res) => {
    console.log(req.session)
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Error al cerrar la sesión' });
        }
        res.clearCookie('connect.sid'); // Nombre de cookie por defecto para express-session
        return res.json({ message: 'Sesión cerrada exitosamente' });
    });
};
