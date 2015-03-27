// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var models = require('./models/user');
var bodyParser = require('body-parser');
var router = express.Router();

//replace this with your Mongolab URL
mongoose.connect('mongodb://prafulmehrotra:Vimmi69..@ds045001.mongolab.com:45001/498mp3');

// Create our Express application
var app = express();

// Use environment defined port or 4000
var port = process.env.PORT || 4000;

//Allow CORS so that backend and frontend could pe put on different servers
var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods","POST, GET, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
  next();
};
app.use(allowCrossDomain);

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// All our routes will start with /api
app.use('/api', router);

//Default route here
var homeRoute = router.route('/');

homeRoute.get(function(req, res) {
  res.json({ message: 'Hello World!' });
});

//User route 
var UserRoute = router.route('/users');
var UserIdRoute = router.route('/users/:id');
var TaskRoute = router.route('/tasks');
var TaskIdRoute = router.route('/tasks/:id');

UserRoute.get(function(req, res) {
  if(Object.keys(req.query).length == 0) {
  	 models.User.find(function(err,Users)
			{
			if(err)	{
				console.log("No User");
					}
			else
				{
			res.json(Users);
				}
		});
  	}	
  else {
  	
  		console.log(req.query);
  	}
  	
});

//Add more routes here

UserRoute.post(function(req,res) {
	models.User.create(req.body, function(err,post) {
		if(err)
			{
				console.log("Not Valid!");
			}
		else {
			res.json(post);
			}
		});
	});

UserRoute.options(function(req,res) {
	res.writeHead(200);
   res.end();
});

UserIdRoute.get(function(req,res) {
	models.User.findById(req.params.id, function(err,post) {
		if(err)
		{
			res.json({"message":"404 NOT FOUND","data":[]});
		}
		
		else {
			res.json({"message":"200 OK","data":post});
		}
	});
});

UserIdRoute.put(function(req,res) {
	models.User.findByIdAndUpdate(req.params.id,req.body,function(err,post) {
		if(err)
		{
			res.json({"message":"invalid","data":[]});
		}
		else {
			res.json({"message":"200 OK","data":post});
		}
	})
});

UserIdRoute.delete(function(req,res){
	models.User.findByIdAndRemove(req.params.id,req.body,function(err,post) {
		if(err)
		{
			res.json({"message":"User Not Found","data":[]});
		}
		else {
			res.json({"message":"User deleted!", "data":[]});
		}	
	})
})


TaskRoute.get(function(req, res) {
  models.Tasks.find(function(err,Tasks)
		{
		if(err)	{
			console.log("No User");
				}
		else
			{
		res.json(Tasks);
			}
		});
  });
  		
TaskRoute.post(function(req,res) {
	models.Tasks.create(req.body, function(err,post) {
		if(err)
			{
				console.log("Not Valid!");
			}
		else {
			res.json(post);
			}
		});
	});  
  	
TaskRoute.options(function(req,res) {
	res.writeHead(200);
   res.end();
});

TaskIdRoute.get(function(req,res) {
	models.Tasks.findById(req.params.id, function(err,post) {
		if(post == null)
		{
			res.json({"message":"404 NOT FOUND","data":[]});
		}
		
		else {
			res.json({"message":"200 OK","data":post});
		}
	});
});

TaskIdRoute.put(function(req,res) {
	models.Tasks.findByIdAndUpdate(req.params.id,req.body,function(err,post) {
		if(err)
		{
			res.json({"message":"invalid","data":[]});
		}
		else {
			res.json({"message":"200 OK","data":post});
		}
	})
});

TaskIdRoute.delete(function(req,res){
	models.Tasks.findByIdAndRemove(req.params.id,req.body,function(err,post) {
		if(err)
		{
			res.json({"message":"User Not Found","data":[]});
		}
		else {
			res.json({"message":"User deleted!", "data":[]});
		}	
	})
});

// Start the server
app.listen(port);
console.log('Server running on port ' + port);