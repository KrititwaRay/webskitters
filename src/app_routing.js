import express from 'express';
const app = express();


import { user_route } from './users/router/user_router.js';
import { category_route } from './categories/router/category_router.js';
import { question_router } from './questions/router/question_router.js';

app.use('/user',user_route)
app.use('/category',category_route)
app.use('/question',question_router)


export const app_router = app;