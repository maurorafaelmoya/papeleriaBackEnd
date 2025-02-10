
const http = require('http');
const express = require("express");
var cors = require('cors');
const { dbConnection } = require("../Config/PapeleriaDB");

const corsOrigin = {
    "origin": '*',
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}
class Server {
    constructor(){
        
        this.app = express();
        this.port = process.env.PORT;

        this.userPath='/api/user';
        
        this.server = http.createServer( this.app );
        //conectar base de datos
        this.conectarDB();
        //Middlewares
        this.middlewares();
        //Rutas de la aplicación
        this.routes();
    }
    async conectarDB(){
        try{
            await dbConnection();
        }
        catch(error){
            console.log(error);
            throw new Error(error);
        }
    }
    middlewares(){
        //CORS
        this.app.use(cors(corsOrigin));
        //Lectura y parseo del body
        this.app.use(express.json());
    }
    //rutas de la aplicación
    routes(){
        this.app.use(this.userPath, require ('../User/UserRoutes'));
    }
    //se levanta el servidor
    listen(){
    this.server.listen(this.port, ()=>{
        console.log('Servidor corriendo en puerto', this.port)
    });
}
}
module.exports=Server;