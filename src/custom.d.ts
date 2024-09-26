declare module 'serverless-http';

declare module 'swagger-jsdoc' {
    interface SwaggerJsdocOptions {
      definition: object;
      apis: string[];
    }
  
    function swaggerJsdoc(options: SwaggerJsdocOptions): object;
  
    export = swaggerJsdoc;
  }
