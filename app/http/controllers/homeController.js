const controller = require('./controller');

class homeController extends controller{
    index(req, res) {
        res.json(this.test());
    }

    test() {
        return 'Home Page';
    }
}

module.exports = new homeController();