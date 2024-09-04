import { Router } from 'express'
import { authCtrl } from '../controllers/controllers.js';

export const authRoutes = Router();

authRoutes.post('/register', authCtrl.register)
authRoutes.get('/session', authCtrl.session)
authRoutes.post('/login', authCtrl.login)
authRoutes.post('/logout', authCtrl.logout)