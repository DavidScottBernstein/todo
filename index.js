var express = require('express');
var nedb = require('nedb');
var db = new nedb({ filename: 'todo.db', autoload: true });

var app = express();

app.get('/api/:method/', function(req, res, next) {
  if(req.params.method == 'save') {
    db.find({ type: 'list' }, function(error, records) {
      if( records.length > 0 ) {
        db.update({ _id: records[0]._id }, {
          type: 'list',
          contents: req.query.list
        });
        res.send(200);
        db.find({ type: 'list' }, function(error, records) {
          console.log(records);
        });
      } else {
        db.insert({
          type: 'list',
          contents: req.query.list
        });
        res.send(200);
        db.find({ type: 'list' }, function(error, records) {
          console.log(records);
        });
      }
    });
  } else if(req.params.method == 'load'){
    db.find({ type: 'list' }, function(error, records) {
      if( records.length > 0 ){
        res.send(200, JSON.stringify({
          list: records[0].contents
        }));
      } else {
        res.send(200, JSON.stringify({
          list: []
        }));
      }
    });
  }
});

app.use(express.static(__dirname + '/static'));

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});

app.listen(8000);

console.log('Listening at http://localhost:8000/');
