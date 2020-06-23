const multer = require('multer');
const PATH_PUBLIC = './../CIE-front/public';

class ManagerFileServer{
    constructor(){
        this.storage = null;
    }

    saveProfileUser(){
       this.storage = multer.diskStorage({
            destination: (req, file, cb) =>{
                console.log("file: ", file);
                cb(null, PATH_PUBLIC);
            },

            filename: (req, file, cb) =>{
                cb(null, file.originalname);
            }
        })
    }

    middleware(){
        return multer({
            storage: this.storage
        });
    }
}

module.exports = {
    ManagerFileServer: ManagerFileServer
};  