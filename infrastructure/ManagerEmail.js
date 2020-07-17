const nodemailer = require('nodemailer');

class ManagerEmail {
   
    constructor(){
        this.transporter = nodemailer.createTransport({
            service: 'Gmail',
            port: 456,
            host: 'smtp.gmail.com',
            auth: {
                user: 'gestioncietest@gmail.com',
                pass: '1048323392'
            }
        });
    }

    sendEmail(options){
        this.transporter.sendMail(options, (error, info)=>{
            if(error)
                console.error(error);
            
            console.log("send >>>> ", info);
        });
    }
}

module.exports = {
    ManagerEmail:ManagerEmail
};