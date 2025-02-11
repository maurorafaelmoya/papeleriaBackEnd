const  jwt  = require("jsonwebtoken");

/**
 * 
 * @param {*} token para leer la informacion 
 * @returns 
 */
const getInfoJWT = async(token) =>{ 
    console.log(token)

    //Validación
    try{
        //si JWT no es valido lanza un error
        const { id, email } =  jwt.verify(token, process.env.SECRETKEYJWT);

        return [id, email]

    }catch(error){
        console.log(error);
        const code=401, message='Token no valido', data=[];

        return({ 
            code, message, data
        })
    }
}


module.exports = {
    getInfoJWT
}