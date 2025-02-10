/**
 * 
 * @param {*} token 
 * @param {*} name 
 * @param {*} email 
 * @param {*} pass 
 * @returns 
 */
const newUser = (token, name,email, pass) =>{
    return`
        <div >
            <table style="width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;">
                <tr>
                    <td style="background-color: #ecf0f1; text-align: center; padding: 0">
                        <H1>PAPELERIA MOYA</H1>
                    </td>
                </tr>

                <tr>
                    <td style="padding: 0">
                    </td>
                </tr>
                
                <tr>
                    <td style="background-color: #ecf0f1">
                        <div style="color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif">
                            <h2 style="color: #191a30; margin: 0 0 5px">Hola ${name} <br/> Bienvenido a la tienda online de papeleria Moya!</h2>
                            <p style="margin: 2px; font-size: 15px">
                                <br>
                                Las credeciales de acceso son: 
                                </p>
                            <ul style="font-size: 15px;  margin: 10px 0">
                                <li> <strong> USUARIO:</strong> ${email}</li>
                                <li> <strong>CONTRASEÑA:</strong> ${pass}</li>
                            </ul>
                            <div style="width: 100%; text-align: center">
                                <a style="font-size: 24px; background-color: #ecf0f1; text-align: center" 
                                href="${process.env.URL_BACKEND}/api/user/validateaccount/${token}" > Validar la cuenta </a>    
                            </div>
                            <p style="color: #b3b3b3; font-size: 12px; margin: 30px 0 0">
                                Esta dirección de correo electronico se envia desde una dirección sin control,
                                por favor <strong> no</strong> responda a este mensaje. 
                            </p>
                            <p style="color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0">
                                PAPELERIA MOYA ® 2025. </p>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    `
    
}

module.exports={
    newUser
}