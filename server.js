// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var models = require('./models/user');
// var bodyParser = require('body-parser'); // Replaced with express.urlencoded and express.json
var router = express.Router();

//replace this with your Mongolab URL
// mongoose.connect('mongodb://prafulmehrotra:Vimmi69..@ds045001.mongolab.com:45001/498mp3');
mongoose.connect('mongodb://prafulmehrotra:Vimmi69..@ds045001.mongolab.com:45001/498mp3', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

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

// Use the express built-in middleware for parsing URL-encoded data and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
  if (Object.keys(req.query).length === 0) {
    models.User.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => {
        console.error("Error fetching users:", err);
        res.status(500).json({ message: "Error fetching users", error: err });
      });
  } else {
    // Handle queries if necessary, e.g., filter results
    // For now, returning all users if there are query params, or implement specific query logic
    console.log(req.query);
    models.User.find(req.query) // Example: basic filtering based on query params
      .then(users => {
        res.json(users);
      })
      .catch(err => {
        console.error("Error fetching users with query:", err);
        res.status(500).json({ message: "Error fetching users with query", error: err });
      });
  }
});

//Add more routes here

UserRoute.post(function(req, res) {
  models.User.create(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      console.error("Error creating user:", err);
      // Consider sending a more specific error message based on err.name (e.g., ValidationError)
      res.status(400).json({ message: "Error creating user. Ensure data is valid.", error: err.message });
    });
});

UserRoute.options(function(req,res) {
	res.writeHead(200);
   res.end();
});

UserIdRoute.get(function(req, res) {
  models.User.findById(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: "User not found", data: [] });
      }
      res.json({ message: "200 OK", data: user });
    })
    .catch(err => {
      console.error("Error fetching user by ID:", err);
      res.status(500).json({ message: "Error fetching user", error: err });
    });
});

UserIdRoute.put(function(req, res) {
  models.User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: "User not found, update failed", data: [] });
      }
      res.json({ message: "200 OK, user updated", data: user });
    })
    .catch(err => {
      console.error("Error updating user:", err);
      res.status(400).json({ message: "Error updating user. Ensure data is valid.", error: err.message });
    });
});

UserIdRoute.delete(function(req, res) {
  models.User.findByIdAndDelete(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: "User not found, delete failed", data: [] });
      }
      res.json({ message: "User deleted successfully!", data: [] });
    })
    .catch(err => {
      console.error("Error deleting user:", err);
      res.status(500).json({ message: "Error deleting user", error: err });
    });
});


TaskRoute.get(function(req, res) {
  models.Tasks.find()
    .then(tasks => {
      res.json(tasks);
    })
    .catch(err => {
      console.error("Error fetching tasks:", err);
      res.status(500).json({ message: "Error fetching tasks", error: err });
    });
});

TaskRoute.post(function(req, res) {
  models.Tasks.create(req.body)
    .then(task => {
      res.status(201).json(task);
    })
    .catch(err => {
      console.error("Error creating task:", err);
      res.status(400).json({ message: "Error creating task. Ensure data is valid.", error: err.message });
    });
});
  	
TaskRoute.options(function(req,res) {
	res.writeHead(200);
   res.end();
});

TaskIdRoute.get(function(req, res) {
  models.Tasks.findById(req.params.id)
    .then(task => {
      if (!task) { // Changed from post == null to !task for clarity
        return res.status(404).json({ message: "Task not found", data: [] });
      }
      res.json({ message: "200 OK", data: task });
    })
    .catch(err => {
      console.error("Error fetching task by ID:", err);
      res.status(500).json({ message: "Error fetching task", error: err });
    });
});

TaskIdRoute.put(function(req, res) {
  models.Tasks.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    .then(task => {
      if (!task) {
        return res.status(404).json({ message: "Task not found, update failed", data: [] });
      }
      res.json({ message: "200 OK, task updated", data: task });
    })
    .catch(err => {
      console.error("Error updating task:", err);
      res.status(400).json({ message: "Error updating task. Ensure data is valid.", error: err.message });
    });
});

TaskIdRoute.delete(function(req, res) {
  models.Tasks.findByIdAndDelete(req.params.id) // Changed from findByIdAndRemove
    .then(task => {
      if (!task) {
        return res.status(404).json({ message: "Task not found, delete failed", data: [] });
      }
      res.json({ message: "Task deleted successfully!", data: [] });
    })
    .catch(err => {
      console.error("Error deleting task:", err);
      res.status(500).json({ message: "Error deleting task", error: err });
    });
});

// Start the server
app.listen(port);
console.log('Server running on port ' + port);