const clientmysql = require('mysql');

let __connection_close = null;
class Connection {

    constructor(){
        this.username  = process.env.DB_USER; 
        this.password = process.env.DB_PASS;
        this.namedatabase = process.env.NAMEDATABASE;
        this.localhost = process.env.DB_HOST;
        this.port = process.env.DB_PORT;
        this.connection = null;
    }

    getConection(){
        this.connection = clientmysql.createConnection({
            host: this.localhost,
            user: this.username,
            password: this.password,
            port: this.port
        });

        console.log('connection to mysql');
    }

    queryCommand(sql){
        let connectioncopy = this.connection;

        return new Promise(function(resolve, reject){
            connectioncopy.query(sql, function(err, result){
                if(err) reject(err);
                __connection_close = connectioncopy;
                
                resolve(result);
            });
        });
    }

    async createDatabase(){
        let result = await this.queryCommand(`CREATE DATABASE IF NOT EXISTS ${this.namedatabase}`);
        console.log("database create" , result);
        console.log("version database", this.version);
    }

    closeConnection(){
        __connection_close.end();
    } 
}

module.exports = {
    Connection: Connection
};
