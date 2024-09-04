import { Router } from 'express'
import { authCtrl } from '../controllers/controllers.js';
import { validarJwt } from '../middlewares/validar-jwt.js';


export const authRoutes = Router();

authRoutes.post('/register', authCtrl.register)
authRoutes.post('/login', authCtrl.login)
authRoutes.get('/session', validarJwt, authCtrl.session)
authRoutes.post('/logout', authCtrl.logout)