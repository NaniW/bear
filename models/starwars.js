var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var StarwarsSchema = new Schema({
  name: String
},{collection: 'starwarsdata'})

module.exports = mongoose.model('Starwars', StarwarsSchema);
