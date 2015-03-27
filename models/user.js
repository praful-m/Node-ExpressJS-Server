// Load required packages
var mongoose = require('mongoose');

// Define our User schema
var UserSchema   = new mongoose.Schema({
  name: String,
  email: String,
  pendingTasks: [String],
  dateCreated: {type:Date,default:Date.now}
});

var TaskSchema   = new mongoose.Schema({
  name: String,
  description: String,
  deadline: Date,
  completed: Boolean,
  assignedUserName: {type:String, default:'unassigned'},
  dateCreated: {type:Date, default:Date.now}
});

// Export the Mongoose model

var User = mongoose.model('User', UserSchema);
var Tasks = mongoose.model('Tasks',TaskSchema);
module.exports = {
	User:User,
	Tasks:Tasks
};