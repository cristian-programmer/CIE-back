const ManagerConnection = require('./ManagerConnection').Connection;
require('pretty-console-colors');
const NAMEDB = 'mydb';
class StructureDB {
    constructor(){
        this.database = new ManagerConnection();
        this.database.getConection();
    }

    async createModules(){
        
    }

    createTableUsers() {
        return new Promise((resolve, reject)=>{
            this.database.queryCommand(`CREATE TABLE IF NOT EXISTS ${NAMEDB}.Users (
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
                PRIMARY KEY (idUsers))`).then(res =>{ 
                    console.info('create table users');
                    resolve(res);
                })
                .catch(error => {
                    console.error(error);
                    reject(error);
                });
        });
    }

    createTableServices(){
        this.database.queryCommand(`CREATE TABLE IF NOT EXISTS mydb.Services (
            idServices INT NOT NULL AUTO_INCREMENT,
            serviceName VARCHAR(45) NOT NULL,
            serviceDescription VARCHAR(200) NOT NULL,
            imageUrl VARCHAR(45) NOT NULL,
            PRIMARY KEY (idServices))`).then(res =>{ console.info('create table services')})
        .catch(error =>{console.error(error)})
    }

    createTableEvents(){
        this.database.queryCommand(`CREATE TABLE IF NOT EXISTS mydb.Events (
            idEvents INT NOT NULL AUTO_INCREMENT,
            eventName VARCHAR(45) NOT NULL,
            eventDescription VARCHAR(200) NOT NULL,
            eventDate VARCHAR(45) NOT NULL,
            eventImage VARCHAR(200) NULL,
            startTime VARCHAR(45) NULL,
            endTime VARCHAR(45) NULL,
            PRIMARY KEY (idEvents))`).then(res =>{ console.info('create table events')})
        .catch(error =>{console.error(error)})
    }

    createTableAttendance(){
        this.database.queryCommand(`CREATE TABLE IF NOT EXISTS mydb.Attendance (
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
            PRIMARY KEY (idattendance))`).then(res =>{ console.info('create table attendance')})
        .catch(error =>{console.error(error)})
    }

    createTableProject(){
        this.database.queryCommand(`CREATE TABLE IF NOT EXISTS mydb.Projects (
            idProject INT NOT NULL AUTO_INCREMENT,
            projectName VARCHAR(100) NOT NULL,
            currentAdvisor VARCHAR(45) NOT NULL,
            previusAdvisers VARCHAR(100) NULL,
            methodologicalPhases VARCHAR(100) NOT NULL,
            PRIMARY KEY (idProject))`).then(res =>{ console.info('create table project')})
        .catch(error =>{console.error(error)})
    }

    createTableActivities(){
        this.database.queryCommand(`CREATE TABLE IF NOT EXISTS mydb.Activities (
             idActivities INT NOT NULL AUTO_INCREMENT,
             nameActivity VARCHAR(45) NOT NULL,
             responsables VARCHAR(100) NOT NULL,
             idComments INT NULL,
             state VARCHAR(50) NOT NULL,
             resources VARCHAR(100) NULL,
             executionWeek INT NOT NULL,
             phase VARCHAR(100) NOT NULL,
             idProject INT NOT NULL,
            PRIMARY KEY (idActivities))`).then(res =>{ console.info('create table activities')})
        .catch(error =>{console.error(error)})
    }

    createTableConfiguration(){
            
        this.database.queryCommand(`CREATE TABLE IF NOT EXISTS mydb.Configurations (
            idConfigurations INT NOT NULL AUTO_INCREMENT,
            emailService VARCHAR(100) NOT NULL,
            keySocial VARCHAR(500) NOT NULL,
            PRIMARY KEY (idConfigurations))`).then(res =>{ console.info('create table configuration')})
        .catch(error =>{console.error(error)})
    }

    createTableSocialNetwork(){
        this.database.queryCommand(`CREATE TABLE IF NOT EXISTS mydb.SocialNetwork (
            idSocial INT NOT NULL AUTO_INCREMENT,
            keySocial VARCHAR(500) NOT NULL,
            content VARCHAR(2000) NOT NULL,
            name VARCHAR(45) NOT NULL,
            PRIMARY KEY (idSocial))`).then(res =>{ console.info('create table soocialNetwork')})
        .catch(error =>{console.error()})
    }


    createTableSystemModules(){
        return new Promise( (resolve, reject) =>{
            this.database.queryCommand(`CREATE TABLE IF NOT EXISTS mydb.SystemModules (
                idSystemModules INT NOT NULL AUTO_INCREMENT,
                nameModule VARCHAR(45) NOT NULL,
                role VARCHAR(45) NOT NULL,
                route VARCHAR(45) NOT NULL,
                active TINYINT NOT NULL,
                icon VARCHAR(45) NULL,
                PRIMARY KEY (idSystemModules))`).then(res =>{ 
                    console.info('create table systemModules, ', res['warningCount']);
                    resolve(res);
                }).catch(error =>{
                    console.error(error);
                    reject(error);
                })
        });
    }

    createTableLastActivitySystem(){

        this.database.queryCommand(`CREATE TABLE IF NOT EXISTS mydb.lastActivitySystem (
            idlastActivitySystem INT NOT NULL AUTO_INCREMENT,
            idUser INT NOT NULL,
            activity VARCHAR(45) NOT NULL,
            date VARCHAR(100) NULL,
            hour VARCHAR(45) NULL,
            PRIMARY KEY (idlastActivitySystem))`).then(res =>{ console.info('create table lastActivitySystem')})
        .catch(error =>{console.error(error)})
    
    }

    createTableEventStatistics(){
        
        this.database.queryCommand(`CREATE TABLE IF NOT EXISTS mydb.eventStatistics (
            ideventStatistics INT NOT NULL AUTO_INCREMENT,
            numberRegistered INT NULL,
            numberAttendees INT NULL,
            idEvent INT NOT NULL,
            PRIMARY KEY (ideventStatistics))`).then(res =>{ console.info('create table eventStatistics')})
        .catch(error =>{console.error(error)})
        
    }

    createTableMeeting(){
        
        this.database.queryCommand(`CREATE TABLE IF NOT EXISTS mydb.meeting (
            idmeeting INT NOT NULL AUTO_INCREMENT,
            startTime VARCHAR(45) NOT NULL,
            endTime VARCHAR(45) NOT NULL,
            incharge VARCHAR(45) NOT NULL,
            PRIMARY KEY (idmeeting))`).then(res =>{ console.info('create table meeting')})
        .catch(error =>{console.error(error)})

    
    }

    createTableGuests(){
        
        this.database.queryCommand(`CREATE TABLE IF NOT EXISTS mydb.guests (
            idguests INT NOT NULL AUTO_INCREMENT,
            idmeeting INT NOT NULL,
            fullname VARCHAR(100) NOT NULL,
            attend TINYINT NOT NULL,
            PRIMARY KEY (idguests))`).then(res =>{ console.info('create table guests')})
        .catch(error =>{console.error(error)})

    }

    insertModules(){
        this.database.queryCommand(`INSERT INTO mydb.SystemModules (nameModule, role, route, active)
        values ('Inicio', 'assistant', '/admin',  1),
         ('Gestion de proyectos', 'adviser', '/admin/management',  1),
         ('Eventos', 'assistant', '/admin/events',  1),
         ('Servicios', 'assistant', '/admin/services',  1),
         ('Seguimiento', 'assistant', '/admin/tracing',  1),
         ('Calendario', 'assistant', '/admin/calendar',  1),
         ('Calendario', 'entrepreneur', '/admin/calendar',  1),
         ('Calendario', 'adviser', '/admin/calendar',  1),
         ('Gestion de Proyectos', 'entrepreneur', '/admin/management',  1),
         ('Configuracion', 'admin', '/admin/config',  1),
         ('Config de Proyectos', 'adviser', '/admin/proyect',  1),
         ('Trazabilidad de eventos', 'assistant', '/admin/eventTraceability',  1),
         ('Asistencia', 'assistant', '/admin/assistance',  1)
       `).then(res =>{
           console.info('create routers of the modules');
       }).catch(error=>{
           console.error(error);
       })
    }

    insertDefaultUsers(){
        this.database.queryCommand(`INSERT INTO mydb.Users (name, email, username, role, 
            relationshipUniversity, password) value ('administador', 'cvg97@misena.edu.co', 'admin', 'administrator', 
            'teacher', 'system1'), 
            ('asesor', 'cvg97@misena.edu.co', 'asesor', 'adviser', 
            'teacher', 'system1')`).then(res =>{
                console.info('create users by default');
            }).catch(error =>{
                console.error(error);
            });
    }

    createAll(){
        this.createTableUsers().then(res=>{
            if(res['warningCount']  == 0){
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
        this.createTableSystemModules().then( res =>{
            if(res['warningCount'] == 0) {
                this.insertModules();
            }
        });
        this.createTableLastActivitySystem();
        this.createTableEventStatistics();
        this.createTableMeeting();
        this.createTableGuests();
    }
    
}

module.exports = {
    StructureDB : StructureDB
};