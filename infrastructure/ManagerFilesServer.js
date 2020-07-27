const multer = require('multer');
const AWS = require('aws-sdk');
const uuid =  require('uuid');
const PATH_PUBLIC = './../CIE-front/public';
const PATH_RESOURCE = './../files';
const S3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_TOKEN
});

class ManagerFileServer{
    constructor(){
        this.storage = null;
    }

    saveFileInPathPublic(){
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

    saveFileInResource() {
        this.storage = multer.diskStorage({
            destination: (req, file, cb) => {
                console.log("file resource : ", file);
                cb(null, PATH_RESOURCE);
            },

            filename: (req, file, cb) => {
                cb(null, file.originalname)
            }
        })
    }

    prepareStorageS3(){
        this.storage = multer.memoryStorage({
           destination: (req, file, cb) => {
            cb(null, '');
           } 
        });
    }

    uploadS3File(file) {
        return new Promise ((resolve, reject)=>{
            let myFile = file.originalname.split('.');
            const fileType = myFile[myFile.length -1];
    
            const params = {
               Bucket: process.env.AWS_BUCKET,
               Key: `${uuid.v4()}.${fileType}`,
               Body: file.buffer
            }
            S3.upload(params, (error, data) =>{
                if(error) return reject(error);
                resolve(data); 
            });
        });
    }

    deleteS3File(key){
        return new Promise((resolve, reject) => {
            const params = {
                Bucket: process.env.AWS_BUCKET,
                Key: key
            };

            S3.deleteObject(params, (error, data ) => {
                if(error) return reject(error);
                resolve(data);
            });
        });
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