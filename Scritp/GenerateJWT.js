const jwt = require('jsonwebtoken');

/**
 * 
 * @param {*} _id del usuario 
 * @param {*} email correo del usuario
 * @returns 
 */
const generarJWT = ( _id, email ) => {
    return new Promise((resolve , reject) =>{
        const id = _id;

        jwt.sign({ id: id, email: email   }, process.env.SECRETKEYJWT,{
            expiresIn:'8h'
            },(err, token)=>{

                if(err){
                    console.log(err);
                    reject('No se pudo generar el token');
                }else{
                    resolve(token);
                }

            });
    });
}


module.exports = {
    generarJWT
}