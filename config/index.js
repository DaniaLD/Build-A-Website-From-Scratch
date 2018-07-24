const database = require('./database');
const session = require('./session');
const service = require('./service');
const layout = require('./layout');

module.exports = {
    database,
    session,
    service,
    layout,
    cookieSecretKey: process.env.SESSION_SECRET_KEY,
    port: process.env.PORT
}