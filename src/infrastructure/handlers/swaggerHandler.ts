import express from 'express';
import serverless from 'serverless-http';
import { setupSwagger } from '../swaggerConfig';

const app = express();

setupSwagger(app);

export const handler = serverless(app);
