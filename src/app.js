import express  from "express";
import authRouter from './routes/auth.routes.js'

const app = express();

app.use(express.json());

// routes
app.use('/api/auth', authRouter);



export default app;