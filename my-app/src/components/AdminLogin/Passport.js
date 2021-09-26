export default class Passport {
    constructor() {
        this.isLogin = false;
    }
    
    login(username, password, callback) {
        if (username === 'admin' && password === 'uwaadmin') {
            // login successfully
            this.isLogin = true;
            // send the operation to the caller after login
            callback();
        } else {
            // failed
            // pop a message
            alert('Login failed!');
        }
    }

    storageLogin(username, password) {
        if (username === 'admin' && password === 'uwaadmin') {
            // login successfully
            // send the operation to the caller after login
            return true;
        } else {
            // failed
            // pop a message
            return false;
        }
    }
}