const e = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// define the Schema (the structure of the article)
const articleSchema = new Schema({
  Name: String,
  Username: String,
  Password: String,
  Email: String,
});

const MyData = mongoose.model('MyData', articleSchema);

module.exports = MyData;
