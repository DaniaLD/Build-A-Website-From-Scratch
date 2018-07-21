const database = require('./database');
const session = require('./session');
const service = require('./service');

module.exports = {
    database,
    session,
    service,
    cookieSecretKey: process.env.SESSION_SECRET_KEY,
    port: process.env.PORT
}