import jwt from 'jsonwebtoken';

import { SECRET_KEY } from '../config/env.js';
import { dataBase } from '../db/database.js';

// Middleware para verificar el token JWT
export const validarJwt = async(req, res, next) => {
    console.log(req.session)
    console.log('-----------')
    console.log(req.cookies)
    const token = req.cookies.authToken || req.session.token;

    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado' });
    }

    const decoded = jwt.verify(token, SECRET_KEY);

    const connection = dataBase()
    const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [decoded.id])

    const user = rows[0]

    // Se busca al usuario en la base de datos
    // const user = dataBase.user.find( user => user.id === decoded.userId );

    if (!user) {
        return res.status(401).json({ message: 'Token inválido' });
    }

    req.user = user; // Agrega la información del usuario decodificada al request

    next();
};