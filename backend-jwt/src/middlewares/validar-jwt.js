import jwt from 'jsonwebtoken';
import { variablesBd } from '../config/config.js';
import { dataBase } from '../db/database.js';

// Middleware para verificar el token JWT
export const validarJwt = async(req, res, next) => {
    console.log(req.session)
    console.log('-----------')
    console.log(req.cookies)
    const token = req.cookies.authToken;

    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado' });
    }

    const decoded = jwt.verify(token, variablesBd.SECRET_KEY);

    const connection = await dataBase()
    const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [decoded.userId])

    const user = rows[0]

    if (!user) {
        return res.status(401).json({ message: 'Token inválido' });
    }

    req.user = user; // Agrega la información del usuario decodificada al request

    next();
};