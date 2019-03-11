var MongoClient = require('mongodb').MongoClient;
var express = require('express')
ObjectId = require('mongodb').ObjectID;
var router = express.Router()
var url = "mongodb://localhost:27017";
var dbo;

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
	dbo=db.db("todo-app");
});

router.post('/', function (req, res) {
  var todo=req.body.todo;
  var data={todo}
  var todo=dbo.collection("todo");
  todo.insertOne(data, function(err, result){
    if (err){
      res.send({status:false,data:"something went wrong"})
    }
    else {
      var user_id=result.ops[0]._id;
      console.log("1 document inserted",user_id);
      if (user_id!="") {
        res.send({status:true,data:user_id})
      }
      else {
        res.send({status:false,data:"something went wrong"})
      }
    }
  })
})

router.get('/', function (req, res) {
  var todo=dbo.collection("todo");
  todo.find().toArray(function(err, result) {
    if (err){
      res.send({status:false,data:"something went wrong"})
    }
    else {
      res.send({status:true,data:result});
    }
  });
})

router.get('/:id', function (req, res) {
  var id=req.params.id;
  var myquery = { _id: ObjectId(id) };
  var todo=dbo.collection("todo");
  todo.findOne(myquery, function(err, result) {
    if (err){
      res.send({status:false,data:"something went wrong"})
    }
    else {
      if(result==null){
        res.send({status:false,data:"No User Found"});
      }
      else {
        res.send({status:true,data:result})
      }
    }
  });
})

router.put('/:id', function (req, res) {
  var id=req.params.id;
  var myquery = { _id: ObjectId(id) };
  console.log(req.body);
  var newvalues = { $set: {todo: req.body.todo} };

  var todo=dbo.collection("todo");
  todo.updateOne(myquery,newvalues, function(err, result) {
    if (err){
      res.send({status:false,data:"something went wrong"})
    }
    else {
      if(result.result.n==0){
        res.send({status:false,data:"No User Found"});
      }
      else {
        res.send({status:true,data:result})
      }
    }
  });
})

router.delete('/:id', function (req, res) {
  var id=req.params.id;
  var todo=dbo.collection("todo");
  var query={_id:ObjectId(id)};
  todo.deleteOne(query,function(err, result) {
    console.log(result.result);
    if (err){
      res.send({status:false,data:"something went wrong"})
    }
    else {
     if(result.result.n==0){
       res.send({status:false,data:"No User Found"});
     }
     else {
       res.send({status:true,data:result})
     }
   }
 });
})

module.exports = router
