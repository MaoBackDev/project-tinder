import express  from "express";
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js'
import serviceRouter from './routes/service.routes.js'
import companyRouter from './routes/company.routes.js'

const app = express();

app.use(express.json());

// routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/services', serviceRouter);
app.use('/api/companies', companyRouter);



export default app;