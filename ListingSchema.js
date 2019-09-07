/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

/* Create your schema for the data in the listings.json file that will define how data is saved in your database
     See https://mongoosejs.com/docs/guide.html for examples for creating schemas
     See also https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
  */
var listingSchema = new Schema({
  /* Your code for a schema here */ 
  code: {type: String, required: true},
  name: {type: String, required: true},
  coordinates: {latitude: Number, longitude: Number},
  address: String,
  created_at: Date,
  updated_at: Date

  //Check out - https://mongoosejs.com/docs/guide.html

});

/* Create a 'pre' function that adds the updated_at (and created_at if not already there) property 
   See https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
*/
listingSchema.pre('save', function(next) {
  /* your code here */
  var currDate = new Date();
  this.updated_at = currDate;
  if(!this.created_at) this.created_at = currDate;
  /*
	Pre middleware functions are executed one after another, when each middleware calls next
	However, calling next does not stop the rest of the code i nyour middleware function from executing,
	using the early retrun patern allows you to prevent the rest of your middleware function from running,
	when you call next.

Example: return next();

	This can be used in in error handling. When you call next with a paramter it is assumed to be an error
	Example:
	const err = new Error('Errot Text');
	next(err);
	****End example****
	One can also simply throw the error or use promises/await to handle the error.
  */

  next(); 
});

/* Use your schema to instantiate a Mongoose model */
//Check out - https://mongoosejs.com/docs/guide.html#models
var Listing = mongoose.model('Listing', listingSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Listing;
