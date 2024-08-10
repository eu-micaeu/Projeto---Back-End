const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());

const swaggerOptions = {

  swaggerDefinition: {

    info: {

      title: 'Documentação da API',

      version: '1.0.0',

    },

  },

  apis: ['./routes/*.js'],

};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));
