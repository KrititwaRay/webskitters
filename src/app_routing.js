import express from 'express';
const app = express();


import { user_route } from './users/router/user_router.js';

app.use('/user',user_route)


export const app_router = app;