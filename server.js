require('app-module-path').addPath(__dirname);  // Set paths to the directory of the project everywhere
const App = require('app/index');
require('dotenv').config();
global.config = require('./config/index');

new App();