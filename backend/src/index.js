require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const { setupWebsocket } = require('./websocket')
const routes = require('./routes')

const app = express();
const server = http.Server(app);
setupWebsocket(server);

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

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(process.env.PORT || 3333, () => {
  console.log('> Servidor aberto na porta ' + (process.env.PORT || 3333));
});
