const ManagerConnection = require("./ManagerConnection").Connection;
require("pretty-console-colors");
const NAMEDB = "mydb";

class StructureDB {
  constructor() {
    this.database = new ManagerConnection();
    this.database.getConection();
  }

  async createModules() {}

  createTableUsers() {
    return new Promise((resolve, reject) => {
      this.database
        .queryCommand(
          `CREATE TABLE IF NOT EXISTS ${NAMEDB}.Users (
                idUsers INT NOT NULL AUTO_INCREMENT,
                name VARCHAR(45) NOT NULL,
                email VARCHAR(200) NOT NULL,
                username VARCHAR(45) NOT NULL,
                role VARCHAR(45) NULL,
                privilege VARCHAR(45) NULL,
                relationshipUniversity VARCHAR(45) NOT NULL,
                password VARCHAR(200) NOT NULL,
                phone VARCHAR(100) NULL,
                mobile VARCHAR(100) NULL,
                image VARCHAR(120) NULL,
                PRIMARY KEY (idUsers))`
        )
        .then((res) => {
          console.info("create table users");
          resolve(res);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  }

  createTableServices() {
    this.database
      .queryCommand(
        `CREATE TABLE IF NOT EXISTS mydb.Services (
            idServices INT NOT NULL AUTO_INCREMENT,
            serviceName VARCHAR(45) NOT NULL,
            serviceDescription VARCHAR(200) NOT NULL,
            imageUrl VARCHAR(45) NOT NULL,
            PRIMARY KEY (idServices))`
      )
      .then((res) => {
        console.info("create table services");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  createTableEvents() {
    this.database
      .queryCommand(
        `CREATE TABLE IF NOT EXISTS mydb.Events (
            idEvents INT NOT NULL AUTO_INCREMENT,
            eventName VARCHAR(45) NOT NULL,
            eventDescription VARCHAR(200) NOT NULL,
            eventDate VARCHAR(45) NOT NULL,
            eventImage VARCHAR(200) NULL,
            startTime VARCHAR(45) NULL,
            endTime VARCHAR(45) NULL,
            PRIMARY KEY (idEvents))`
      )
      .then((res) => {
        console.info("create table events");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  createTableAttendance() {
    this.database
      .queryCommand(
        `CREATE TABLE IF NOT EXISTS mydb.Attendance (
            idattendance INT NOT NULL AUTO_INCREMENT,
            fullName VARCHAR(45) NOT NULL,
            program VARCHAR(45) NOT NULL,
            semester VARCHAR(45) NOT NULL,
            relationshipUniversity VARCHAR(45) NOT NULL,
            company VARCHAR(45) NOT NULL,
            email VARCHAR(45) NOT NULL,
            phoneNumber VARCHAR(45) NOT NULL,
            confirmedAssistance TINYINT(1) NULL,
            attended TINYINT NULL,
            idEvent VARCHAR(45) NULL,
            PRIMARY KEY (idattendance))`
      )
      .then((res) => {
        console.info("create table attendance");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  createTableProject() {
    this.database
      .queryCommand(
        `CREATE TABLE IF NOT EXISTS mydb.Projects (
            idProject INT NOT NULL AUTO_INCREMENT,
            projectName VARCHAR(100) NOT NULL,
            currentAdvisor VARCHAR(45) NOT NULL,
            previusAdvisers VARCHAR(100) NULL,
            methodologicalPhases VARCHAR(100) NOT NULL,
            entrepreneurs VARCHAR(200) NOT NULL,
            PRIMARY KEY (idProject))`
      )
      .then((res) => {
        console.info("create table project");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  createTableActivities() {
    this.database
      .queryCommand(
        `CREATE TABLE IF NOT EXISTS mydb.Activities (
             idActivities INT NOT NULL AUTO_INCREMENT,
             nameActivity VARCHAR(45) NOT NULL,
             responsables VARCHAR(100) NOT NULL,
             idComments INT NULL,
             state VARCHAR(50) NOT NULL,
             resources VARCHAR(100) NULL,
             executionWeek VARCHAR(50) NOT NULL,
             phase VARCHAR(100) NOT NULL,
             idProject INT NOT NULL,
             description VARCHAR(200) NULL,
             rate INT NULL,
             percentaje INT NULL,
             PRIMARY KEY (idActivities))`
      )
      .then((res) => {
        console.info("create table activities");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  createTableConfiguration() {
    this.database
      .queryCommand(
        `CREATE TABLE IF NOT EXISTS mydb.Configurations (
            idConfigurations INT NOT NULL AUTO_INCREMENT,
            emailNotification VARCHAR(100) NOT NULL,
            emailServer VARCHAR(30) NOT NULL,
            PRIMARY KEY (idConfigurations))`
      )
      .then((res) => {
        console.info("create table configuration");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  createTableSocialNetwork() {
    this.database
      .queryCommand(
        `CREATE TABLE IF NOT EXISTS mydb.SocialNetwork(
            idSocial INT NOT NULL AUTO_INCREMENT,
            accessToken VARCHAR(500) NOT NULL,
            idPage VARCHAR(30) NOT NULL,
            emailPage VARCHAR(45) NOT NULL,
            PRIMARY KEY (idSocial))`
      )
      .then((res) => {
        console.info("create table soocialNetwork");
      })
      .catch((error) => {
        console.error();
      });
  }

  createTableSystemModules() {
    return new Promise((resolve, reject) => {
      this.database
        .queryCommand(
          `CREATE TABLE IF NOT EXISTS mydb.SystemModules (
                idSystemModules INT NOT NULL AUTO_INCREMENT,
                nameModule VARCHAR(45) NOT NULL,
                role VARCHAR(45) NOT NULL,
                route VARCHAR(45) NOT NULL,
                active TINYINT NOT NULL,
                icon VARCHAR(45) NULL,
                PRIMARY KEY (idSystemModules))`
        )
        .then((res) => {
          console.info("create table systemModules, ", res["warningCount"]);
          resolve(res);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  }

  createTableLastActivitySystem() {
    this.database
      .queryCommand(
        `CREATE TABLE IF NOT EXISTS mydb.LastActivitySystem (
            idlastActivitySystem INT NOT NULL AUTO_INCREMENT,
            idUser INT NOT NULL,
            activity VARCHAR(45) NOT NULL,
            date VARCHAR(100) NULL,
            hour VARCHAR(45) NULL,
            PRIMARY KEY (idlastActivitySystem))`
      )
      .then((res) => {
        console.info("create table lastActivitySystem");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  createTableEventStatistics() {
    this.database
      .queryCommand(
        `CREATE TABLE IF NOT EXISTS mydb.EventStatistics (
            ideventStatistics INT NOT NULL AUTO_INCREMENT,
            numberRegistered INT NULL,
            numberAttendees INT NULL,
            idEvent INT NOT NULL,
            PRIMARY KEY (ideventStatistics))`
      )
      .then((res) => {
        console.info("create table eventStatistics");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  createTableMeeting() {
    this.database
      .queryCommand(
        `CREATE TABLE IF NOT EXISTS mydb.Meeting (
            idmeeting INT NOT NULL AUTO_INCREMENT,
            startTime VARCHAR(45) NOT NULL,
            endTime VARCHAR(45) NOT NULL,
            incharge VARCHAR(45) NOT NULL,
            PRIMARY KEY (idmeeting))`
      )
      .then((res) => {
        console.info("create table meeting");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  createTableGuests() {
    this.database
      .queryCommand(
        `CREATE TABLE IF NOT EXISTS mydb.Guests (
            idguests INT NOT NULL AUTO_INCREMENT,
            idmeeting INT NOT NULL,
            fullname VARCHAR(100) NOT NULL,
            attend TINYINT NOT NULL,
            PRIMARY KEY (idguests))`
      )
      .then((res) => {
        console.info("create table guests");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  createTableActivityStatistics() {
    this.database
      .queryCommand(
        `CREATE TABLE IF NOT EXISTS mydb.ActivityStatistics (
            idActivityStatistics INT NOT NULL AUTO_INCREMENT,
            phase VARCHAR(50) NOT NULL,
            amountActivity INT NULL,
            amountComments INT NULL,
            PRIMARY KEY (idActivityStatistics))`
      )
      .then((res) => {
        console.info("create table activityStatistics");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  createTableComments() {
    this.database
      .queryCommand(
        `CREATE TABLE IF NOT EXISTS mydb.Comments (
            idComments INT NOT NULL AUTO_INCREMENT,
            idUsers VARCHAR(45) NULL,
            commentary VARCHAR(45) NULL,
            idActivity INT NOT NULL,
            PRIMARY KEY (idComments))`
      )
      .then((res) => {
        console.info("create table Comments");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  createTableMethodology() {
    this.database
      .queryCommand(
        `CREATE TABLE IF NOT EXISTS mydb.Methodology (
            idMethodology INT NOT NULL AUTO_INCREMENT,
            idProject INT NOT NULL,
            phaseName VARCHAR(45) NOT NULL,
            idAdviser INT NULL,
            PRIMARY KEY (idMethodology))`
      )
      .then((res) => {
        console.info("create table methodology");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  createTableNotifications() {
    this.database
      .queryCommand(
        `CREATE TABLE IF NOT EXISTS mydb.Notifications (
            idnotifications INT NOT NULL AUTO_INCREMENT,
            idUsersTo INT NOT NULL,
            message VARCHAR(200) NOT NULL,
            userFrom VARCHAR(50) NOT NULL,
            image VARCHAR (200) NOT NULL,
            link VARCHAR(100) NULL,
            PRIMARY KEY (idnotifications))`
      )
      .then((res) => {
        console.info("create table notifications");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  createTableStudents() {
    this.database
      .queryCommand(
        `CREATE TABLE IF NOT EXISTS mydb.Students (
            idstudent INT NOT NULL AUTO_INCREMENT,
            idUsers INT NOT NULL,
            semester INT NULL,
            academicProgram VARCHAR(100) NULL,
            incomeBy VARCHAR(100) NULL,
            PRIMARY KEY (idstudent),
            INDEX idUsers_idx (idUsers ASC),
            CONSTRAINT idUsers
              FOREIGN KEY (idUsers)
              REFERENCES mydb.Users (idUsers)
            )`
      )
      .then((res) => {
        console.info("create table students");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  createTableAdvisers() {
    this.database
      .queryCommand(
        `CREATE TABLE IF NOT EXISTS mydb.Advisers (
            idAdviser INT NOT NULL AUTO_INCREMENT,
            idUsersAd INT NOT NULL,
            universityDegrees VARCHAR(200) NULL,
            experience INT NULL,
            PRIMARY KEY (idAdviser),
            INDEX id_idx (idUsersAd ASC),
            CONSTRAINT idUsersAd
              FOREIGN KEY (idUsersAd)
              REFERENCES mydb.Users (idUsers))`
      )
      .then((res) => {
        console.info("create table Advisers");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  insertModules() {
    this.database
      .queryCommand(
        `INSERT INTO mydb.SystemModules (nameModule, role, route, active)
        values ('Inicio', 'assistant', '/dashboard',  1),
         ('Gestion de proyectos', 'adviser', '/dashboard/management',  1),
         ('Eventos', 'assistant', '/dashboard/events',  1),
         ('Servicios', 'assistant', '/dashboard/services',  1),
         ('Calendario', 'assistant', '/dashboard/calendar',  1),
         ('Calendario', 'entrepreneur', '/dashboard/calendar',  1),
         ('Calendario', 'adviser', '/dashboard/calendar',  1),
         ('Calendario', 'administrator', '/dashboard/calendar',  1),
         ('Gestion de Proyectos', 'entrepreneur', '/dashboard/management',  1),
         ('Configuracion', 'administrator', '/dashboard/config',  1),
         ('Config de Proyectos', 'adviser', '/dashboard/proyect',  1),
         ('Trazabilidad de eventos', 'assistant', '/dashboard/eventTraceability',  1),
         ('Asistencia', 'assistant', '/dashboard/assistance',  1),
         ('Traz. de proyectos', 'adviser', '/dashboard/trazproject/', 1 ),
         ('Traz. de proyectos', 'administrator', '/dashboard/trazproject/', 1 )
       `
      )
      .then((res) => {
        console.info("create routers of the modules");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  insertDefaultUsers() {
    this.database
      .queryCommand(
        `INSERT INTO mydb.Users (name, email, username, role, 
            relationshipUniversity, password) value 
            ('administador', 'cvg97@misena.edu.co', 'admin', 'administrator', 'teacher', 'system1'), 
            ('asesor', 'cvg97@misena.edu.co', 'asesor', 'adviser', 'teacher', 'system1'),
            ('emprendedor', 'cvg97@misena.edu.co', 'empre', 'entrepreneur' , 'student', 'system1' )`
      )
      .then((res) => {
        console.info("create users by default");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  createAll() {
    this.createTableUsers().then((res) => {
      if (res["warningCount"] == 0) {
        this.insertDefaultUsers();
      }
    });
    this.createTableServices();
    this.createTableEvents();
    this.createTableAttendance();
    this.createTableProject();
    this.createTableActivities();
    this.createTableConfiguration();
    this.createTableSocialNetwork();
    this.createTableSystemModules().then((res) => {
      if (res["warningCount"] == 0) {
        this.insertModules();
      }
    });
    this.createTableLastActivitySystem();
    this.createTableEventStatistics();
    this.createTableMeeting();
    this.createTableGuests();
    this.createTableActivityStatistics();
    this.createTableComments();
    this.createTableMethodology();
    this.createTableNotifications();
    this.createTableStudents();
    this.createTableAdvisers();
  }
}

module.exports = {
  StructureDB: StructureDB,
};
