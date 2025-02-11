const nodemailer = require("nodemailer");

/**
 * configuracion del correo
 */
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
        user: process.env.EmailUser,
        pass: process.env.EmailPass,
    },
});

/**
 * 
 * @param {*} to  para 
 * @param {*} subject  asunto
 * @param {*} html  plantilla html
 */
async function sendEmail(to, subject, html) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: "Papeleria Moya", // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: "Hello world?", // plain text body
        html: html, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
}
  


module.exports=sendEmail;