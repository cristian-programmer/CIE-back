const nodemailer = require("nodemailer");

const TYPES_SUBJECTS = [
  "Invitacion a participar en una reunion",
  "Invitacion a un proyecto",
  "Asignacion de Actividad",
  "Recuerdo de algun evento",
  "Han comentado una actividad donde estas participando",
  "Invitacion a un evento",
  "Cambio de asesor metodologico",
];

class ManagerEmail {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "Gmail",
      port: 456,
      host: "smtp.gmail.com",
      auth: {
        user: "gestioncietest@gmail.com",
        pass: "1048323392",
      },
    });
  }

  sendEmail() {
    console.log("options >>>> ", this.options);
    this.transporter.sendMail(this.options, (error, info) => {
      if (error) console.error(error);

      console.log("send >>>> ", info);
    });
  }

  setOptions(options) {
    this.options = {
      from: "Remitente",
      to: options.to,
      subject: `Gestion CIE - ${options.subject}`,
      text: options.text,
    };
  }

  getTypeSubject(index) {
    return TYPES_SUBJECTS[index - 1];
  }
}

module.exports = {
  ManagerEmail: ManagerEmail,
};
