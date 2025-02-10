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
        const salt = bcryptjs.genSaltSync();
        payload.password = bcryptjs.hashSync(password, salt);

        const response = await userRepository.getUser({email});

        if(response.code === 404){
            const { code, message,data } = await userRepository.saveNewUser(payload);

            const token= await generarJWT(data._id, email);
            
            if(data._id){
                return { code, message, data, token };
            }else{
                return { code:400, message:'Error al crear usuario' };
            }
        }else{
            return {code:409, message:'El usuario ya existe' };      

        }


    }

     /**
     * Encargado de guardar un nuevo usuario
     * 
     * @param {Json} payload Información del usuario
     * 
     * @returns Json
     */
     async loginService( payload ) {
        const {email, password} = payload;

        const { code, message,data } = await userRepository.getUser({email});
        return { code, message, data };

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
