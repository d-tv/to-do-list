import 'dotenv/config.js';
import express from 'express';
import * as handlers from './handlers/index.js';
import errorHandler from './middleware/errorHandler.js';
import verifyToken from './middleware/verifyToken.js';

// Application
const app = express();

// Middleware
app.use(express.json());

// Routes
app.post('/auth/register', handlers.register);
app.post('/auth/login', handlers.login);

app.post('/tasks', verifyToken, handlers.createTask);
app.get('/tasks', verifyToken, handlers.getTasks);
app.get('/tasks/:id', verifyToken, handlers.getTask);
app.put('/tasks/:id', verifyToken, handlers.updateTask);
app.delete('/tasks/:id', verifyToken, handlers.deleteTask);

// Error handlers
app.use(errorHandler);

export default app;
