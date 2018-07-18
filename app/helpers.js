module.exports = class Helpers {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    getObjects() {
        return {
            auth: this.auth()
        }
    }

    auth() {
        return {
            user: this.req.user,
            check: this.req.isAuthenticated()    
        }
    }
}