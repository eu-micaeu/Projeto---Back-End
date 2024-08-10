const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const userRoutes = require('./routes/userRoutes');
const installRoute = require('./routes/installRoute');
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

  apis: ['./controllers/*.js', './routes/*.js'],

};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/users', userRoutes);

app.use('/api', installRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));
