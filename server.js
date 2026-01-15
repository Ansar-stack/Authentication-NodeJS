import express, { urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import {} from 'dotenv/config';
import { connectDB } from './src/config/db.config.js';
import { ErrorMiddleware } from './src/middlewares/error.middleware.js';
import { ResponseMiddlware } from './src/middlewares/reponse.middleware.js';

// Routes Import
import authRouter from './src/routes/auth.route.js';


const app = express();

// Configeration Middlewares
app.use(express.json({limit: '16kb'}));
app.use(urlencoded({extended: true}));
app.use(cors({origin: 'http://localhost:5173', credentials: true}));
app.use(cookieParser());
app.use(ResponseMiddlware);
// Routes
app.use('/api/v1/auth/', authRouter);
// DB Connection 
connectDB();

// Error Middleware
app.use(ErrorMiddleware)
// Listen Server
app.listen(process.env.PORT, ()=>console.log(`Server listening at port 4000`));

