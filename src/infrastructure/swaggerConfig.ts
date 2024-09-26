import swaggerJsdoc from 'swagger-jsdoc'; 
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0', 
    info: {
      title: 'Indra Rimac API',
      version: '1.0.0',
      description: 'Documentación de la API para Indra Rimac Challenge'
    },
    servers: [
      {
        url: 'http://localhost:3000/dev',
        description: 'Servidor de desarrollo'
      },
    ]
  },
  apis: ['./src/infrastructure/handlers/*.ts']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export const setupSwagger = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('Swagger docs available at /api-docs');
};
