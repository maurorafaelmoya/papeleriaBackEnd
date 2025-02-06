/**
 * 
 * Apartado donde se instancía el servidor
 * 
 */

require('dotenv').config();

const Server = require ('./Server/ServerConfig');

const server = new Server();

server.listen();
