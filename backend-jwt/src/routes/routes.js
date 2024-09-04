import { Router } from 'express'
import { authCtrl } from '../controllers/controllers.js';
import { validarJwt } from '../middlewares/validar-jwt.js';


export const authRoutes = Router();

authRoutes.post('/register', authCtrl.register)
authRoutes.get('/session', validarJwt, authCtrl.session)
authRoutes.post('/login', authCtrl.login)
authRoutes.post('/logout', authCtrl.logout)