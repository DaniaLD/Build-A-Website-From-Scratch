const autoBind = require('auto-bind');

module.exports = class validators {
    constructor() {
        autoBind(this);
    }
}