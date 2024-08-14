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

const swaggerOptions = {

  swaggerDefinition: {

    info: {

      title: 'Documentação da API do Projeto de Back-End',

      version: '1.0.7',

    },

  },

  apis: ['./controllers/*.js'],

};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/users', userRoutes);

app.use('/api/products', productRoutes);

app.use('/api/address', addressRoutes);

app.use('/api', installRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));
