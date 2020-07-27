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

    sendEmail(){
        console.log("options >>>> ", this.options);
        this.transporter.sendMail(this.options, (error, info)=>{
            if(error)
                console.error(error);
            
            console.log("send >>>> ", info);
        });
        
    }

    setOptions(options){
        this.options = { 
           from:  'Remitente',
           to: options.to,
           subject: 'Gestion CIE - notificaciones',
           text: options.content
        };
    }
}

module.exports = {
    ManagerEmail:ManagerEmail
};