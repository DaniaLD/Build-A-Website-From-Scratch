const path = require('path');

module.exports = class Helpers {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    getObjects() {
        return {
            auth: this.auth(),
            viewPath: this.viewPath
        }
    }

    auth() {
        return {
            user: this.req.user,
            check: this.req.isAuthenticated()
        }
    }

    viewPath(dir) {
        return path.resolve(config.layout.viewsDir + '/' + dir);
    }
}