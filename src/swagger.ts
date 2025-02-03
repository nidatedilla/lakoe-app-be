import swaggerJsdoc, { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Laoke API',
      version: '1.0.0',
      description: 'API Laoke',
    },
    servers: [
      {
        url: `http://localhost:7000`,
      },
    ],
  },
  apis: ['./src/swagger/*.ts'], 
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

export default swaggerSpecs;
