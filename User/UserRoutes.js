
/**
 * 
 * Apartado donde se establecen las rutas de los servicios
 * 
 */
const { Router } = require("express");

const UserController = require('./UserController');
const userController  = new UserController;

const routerUser = Router();

/* Llamado a controladores */


//agregar nuevo usuario
routerUser.post('/', userController.newUserController);

//agregar nuevo usuario
routerUser.post('/login', userController.loginController);

//validar cuenta por medio de JWT
routerUser.get('/validateaccount/:jwt', userController.ValidateAccountController);

module.exports = routerUser;
