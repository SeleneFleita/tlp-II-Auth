// server.js
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { variablesBd } from './config/config.js';
import morgan from 'morgan';
import { authRoutes } from './routes/routes.js';


const app = express();

app.use(cors({
    origin: ['http://localhost:5500', 'http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/api', authRoutes)

// Servidor escuchando
app.listen(variablesBd.PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${variablesBd.PORT}`);
});
