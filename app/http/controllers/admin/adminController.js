const controller = require('app/http/controllers/controller');

class adminController extends controller{
    index(req, res) {
        res.json('Dashboard Page');
    }

    courses(req, res) {
        res.json('Courses Page');
    }
}

module.exports = new adminController();