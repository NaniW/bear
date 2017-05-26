var express =  require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var Starwars = require('./models/starwars');

app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;
var router = express.Router();

mongoose.connect('mongodb://localhost/starwars');

router.use(function(res, req, next) {
  console.log("something is happening");
  next();
})

router.get('/', function(req, res) {
  res.json({ message: "Hello, welcome to our api!"})
})


router.route('/starwars')

  .post(function(req, res){
    var starwars = new starwars();
    starwars.field.name = req.body.name;

    starwars.save(function(err) {
        if(err)
          res.send(err);
        res.json({ message: "Starwars Created!" })
      })
    })


  .get(function(req, res){
    Starwars.find(function(err, starwars){
      if(err)
        res.send(err)
      res.json(starwars)
    })
  })

router.route('/starwars/:starwars_id')

  .get(function(req, res){
    Starwars.findById(req.params.starwars_id, function(err, starwars){
      if(err)
        res.send(err);
      res.json(starwars)
    });
  })

  .put(function(req,res){
    Starwars.findById(req.params.starwars_id, function(err, starwars){
      if(err)
        res.send(err);
      starwars.field.name = req.body.name;
            starwars.save(function(err) {
        if(err)
          res.send(err);
        res.json({ message: "Starwars Saved!" })
      })
    })
  })

  .delete(function(req, res){
    Starwars.remove({
      _id: req.params.starwars_id
    }, function(err, starwars) {
      if(err)
        res.send(err);
        res.json({ message: "Now is dead Starwars."});
    });
  });

app.use('/api', router);

app.listen(port);
console.log("magic happens on port" + port);
