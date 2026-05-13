const express = require('express');
const app = express();
const port = 3010;
const mongoose = require('mongoose');
const path = require('path');
const url =
  'mongodb://Mahmoud:8IXIgivDCFZ5hZOn@ac-9etyztw-shard-00-00.tbdajrz.mongodb.net:27017,ac-9etyztw-shard-00-01.tbdajrz.mongodb.net:27017,ac-9etyztw-shard-00-02.tbdajrz.mongodb.net:27017/all-data?ssl=true&replicaSet=atlas-7eonym-shard-0&authSource=admin&appName=Cluster0';
app.use(express.urlencoded({ extended: true }));
const MyData = require('./models/schema');

app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../'));
//********************************************************************   */

app.use(express.static(path.join(__dirname, '../')));

app.get('/', (req, res) => {
  res.render('index');
});

mongoose
  .connect(url)
  .then(() => {
    app.listen(port, () => {});
    console.log(`http://localhost:${port}/`);
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

app.post('/', (req, res) => {
  console.log(req.body);
  const myData = new MyData(req.body);
  myData
    .save()
    .then(() => {
      console.log('Data saved successfully');
    })
    .catch((error) => {
      console.error('Error saving data:', error);
    });
  res.redirect('../RolePage/RolePage.ejs');
});
