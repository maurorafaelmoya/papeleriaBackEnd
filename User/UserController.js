/**
 * 
 * Encargado de llamar los métodos correspondientes para las APIs
 * 
 */

const { request } = require("express");
const { response } = require("express");

const UserService = require('./UserService');
const { newUser } = require("../Email/emailtemplate");
const sendEmail = require("../Email/mailConfig");
const userService  = new UserService;



class UserController {


    /**
     * Crear nuevo usuario
     * 
     * @param {*} req 
     * @param {*} res 
     * 
     */
    async newUserController(req = request, res = response ) {
        
        try {
            const { code, message, data, token, pass } = await userService.newUserService(req.body);

            if(code ===201){
                const templateNewUser = newUser(token,req.body.name, req.body.email, pass )
                console.log(templateNewUser)
                await sendEmail(req.body.email, 'CLIENTE NUEVO', templateNewUser)
            }
            return res.status(code).json({ code, message, data, token });
        } 
        catch (error) {
            console.log(error);
            return res.status(501).json({ code: 501, message: "Error al crear usuario"});
        }
    }

    /**
     * Login de usuario
     * 
     * @param {*} req 
     * @param {*} res 
     * 
     */
    async loginController(req = request, res = response ) {
        try {
            const { code, message, data } = await userService.loginService(req.body);
            return res.status(code).json({ code, message, data });
        } 
        catch (error) {
            console.log(error);
            return res.status(501).json({ code: 501, message: "Error al crear publicacion"});
        }
    }

    /**
     * Validar el correo de usuario
     * 
     * @param {*} req 
     * @param {*} res 
     * 
     */
    async ValidateAccountController(req = request, res = response ) {
        console.log(req.params)
        try {
            const { code, message, data } = await userService.ValidateAccountService(req.params);

            if(code===201){
                return res.setHeader('Content-Type', 'text/html').writeHead(201).end(`
                    <!DOCTYPE html>
                        <html lang="es">

                        <body >

                        <table style="width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;">
                            <tr>
                                <td style="background-color: #ecf0f1; text-align: right; padding: 0">
                                </td>
                            </tr>

                            <tr>
                                <td style="padding: 0">
                                </td>
                            </tr>
                            
                            <tr>
                                <td style="background-color: #ecf0f1">
                                    <div style="color: #34495e; margin: 4% 10% 2%;font-family: sans-serif">
                                        <br>
                                        <h2 style="color: #191a30; margin: 0 0 5px">Usuario validado con exito!</h2>
                                        <br>
                                        <div style="width: 100%; text-align: center">
                                        <br>
                                            <a style="font-size: 24px; background-color: #ecf0f1; text-align: center" 
                                            href="http://localhost:3000/">Ir a la p&aacute;gina</a>	
                                        <br>
                                        <br>
                                        </div>
                                        <p style="color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0">
                                        Papeleria Moya 2025. </p>
                                    </div>
                                </td>
                            </tr>
                        </table>

                        </body>
                        </html>
                    `
                )

            }
        } 
        catch (error) {
            console.log(error);
            return res.status(501).json({ code: 501, message: "Error al validar token"});
        }
    }

    

}

module.exports = UserController;

