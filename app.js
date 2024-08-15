const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const addressRoutes = require('./routes/addressRoutes');
const installRoutes = require('./routes/installRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());

const swagger = {

  swaggerDefinition: {

    info: {

      title: 'Documentação da API do Projeto de Back-End',

      version: '1.0.7',

    },

  },

  apis: ['./controllers/*.js'],

};

const swaggerDocs = swaggerJsdoc(swagger);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // Rota para a documentação da API

app.use('/api/users', userRoutes); // Rota para usuários

app.use('/api/products', productRoutes); // Rota para produtos

app.use('/api/address', addressRoutes); // Rota para endereços

app.use('/api', installRoutes); // Rota para instalação

const PORT = process.env.PORT; // Porta do servidor

app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));
