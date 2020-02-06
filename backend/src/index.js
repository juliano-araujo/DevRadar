require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes')

const app = express();

mongoose.connect(process.env.MONGO_CONNECTION_STRING,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}, (err) => {
    if(err){
      console.error(error);
      return;
    }
    console.log('> Conexão com o banco realizada')
  });

app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333, () => {
  console.log('> Servidor aberto na porta ' + (process.env.PORT || 3333));
});