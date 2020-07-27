class Notification {

    setNotification(data){
        this.notification = {
            to : data.to,                     
            from : data.to,
            message : data.message,
            link : data.link,
            image: data.image
        };
    }

    getNotification() {
        return {
            to: this.to, from: this.from, message: this.message
        }
    }

    searchUsers(){
        
    }   

}

module.exports = {
    Notification : Notification
};
