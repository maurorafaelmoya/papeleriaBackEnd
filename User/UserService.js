/**
 * En este apartado se harán todas las funciones de lógica del negocio
 * 
 */

const bcryptjs = require('bcryptjs');
const UserRepository = require('./UserRepository');
const { generarJWT } = require('../Scritp/GenerateJWT');
const { getInfoJWT } = require('../Scritp/getInfoToken');
const userRepository  = new UserRepository;

class UserService {

    /**
     * Encargado de guardar un nuevo usuario
     * 
     * @param {Json} payload Información del usuario
     * 
     * @returns Json
     */
    async newUserService( payload ) {
        const { password, email } = payload;
        const pass = password;
        const salt = bcryptjs.genSaltSync();
        payload.password = bcryptjs.hashSync(password, salt);

        const response = await userRepository.getUser({email});

        if(response.code === 404){
            const { code, message,data } = await userRepository.saveNewUser(payload);

            const token= await generarJWT(data._id, email);
            
            if(data._id){
                return { code, message, data, token, pass };
            }else{
                return { code:400, message:'Error al crear usuario' };
            }
        }else{
            return {code:409, message:'El usuario ya existe' };      

        }


    }

     /**
     * Encargado hacer el login de usuario
     * 
     * @param {Json} payload Información del usuario
     * 
     * @returns Json
     */
     async loginService( payload ) {
        const {email, password} = payload;

        const { code, message,data } = await userRepository.getUser({email});

        if(Object.keys(data).length===0){
            return { code: 400, message: 'Cuenta inexistente', data:{} };
        }

        if(data.status === false){
            return { code: 401, message: 'Cuenta desactivada, favor de verificar tu correo', data:{} };
        }

        const validPassword = bcryptjs.compareSync(password, data.password);  //Esta linea verifica que la contraseña ingresada haga match con la establecida

        if (!validPassword){
            return {code: 401, message: 'Usuario contraseña incorrecta', data: {} };
        }

        const token= await generarJWT(data._id, email);


        return { code, message, data:{data, token} };

    }


      /**
     * Encargado de cambiar el estado de la cuenta al validar el correo
     * 
     * @param {jwtUser} jwt del usuario
     * 
     * @returns Json
     */
      async ValidateAccountService( jwtUser ) {
        const { jwt } = jwtUser

        const token = await getInfoJWT(jwt)

        const payload = {status: true}
        
        const { code, message,data } = await userRepository.putUser(token[0], payload);
        
        return { code, message, data };

    }



}

module.exports = UserService;
