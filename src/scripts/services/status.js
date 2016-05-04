let ajax = require('../util/ajax');
module.exports = () => ajax('https://fuelo.net/api/price?key=2aa197c518fe4da&fuel=gasoline').get();
