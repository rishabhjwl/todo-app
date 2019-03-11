var express=require('express');
var path=require('path');
var bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
var dbo;
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
	dbo=db.db("todo-app");
  console.log("Database created!");
});

var app=express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var api = require('./src/api')
app.use('/api', api)

app.use(express.static(path.join(__dirname,'public')));
app.use('/todo-app', express.static('public/todo-app'));

app.post('/login', function (req, res) {
  var username=req.body.username;
	var password=req.body.password;
  if (username==="rishabh" && password==="jaiswal") {
    res.send({status:true,data:"Login successful"})
  }
  else {
    res.send({status:false,data:"Login failed"})
  }
})

app.listen(3000, function(){
	console.log('Server started at port 3000');
});
