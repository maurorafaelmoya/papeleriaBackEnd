
/**
 * En este apartado se hacen llamados a API externas o guardado en base de datos
 */
const User = require('../Schema/User');

class UserRepository {
    /**
     * Guarda en base de datos las publicaciones
     * 
     * @param { Json } payload Información de la publicacion
     *  
     * @returns { Json }
     * 
     */
    async saveNewUser( payload ) {
        try {
            
            const saveUser = new User( payload );
            const response = await saveUser.save();
            
            return { code: 201, data: response, message: 'Usuario creado correctamente' }
        } catch (error) {
            console.log(error); 
            throw new Error(error);
        }
    } 
   
    /**
     * Guarda en base de datos las publicaciones
     * 
     * @param { Json } payload Información de la publicacion
     *  
     * @returns { Json }
     * 
     */
    async getUser( payload ) {
        try {
            const response = await User.findOne(payload)
            
            if(response){
                return { code: 201, data: response, message: 'Usuario Encontrado' }
            }else{
                return { code: 404, message: 'Usuario No encontrado' }
            }
            
        } catch (error) {
            console.log(error); 
            throw new Error(error);
        }
    } 

    /**
     * Guarda en base de datos las publicaciones
     * 
     * @param { Json } payload Información de la publicacion
     *  
     * @returns { Json }
     * 
     */
    async putUser( id, payload ) {
        try {
            const response = await User.findByIdAndUpdate(id, payload)
            
            console.log(response)

            return { code: 201, data: response, message: 'Usuario Actualizado' }
            
        } catch (error) {
            console.log(error); 
            throw new Error(error);
        }
    } 
}
module.exports = UserRepository;