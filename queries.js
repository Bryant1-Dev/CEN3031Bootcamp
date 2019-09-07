/* Add all the required libraries*/
var mongoose = require('mongoose');
var Listing = require('./ListingSchema');
var config = require('./config');
/* Connect to your database using mongoose - remember to keep your key secret*/
mongoose.connect(config.db.uri, {useNewUrlParser: true});
var database = mongoose.connection;
database.on('error', () => {console.error.bind(console, "Failed to connnect to the MongoDB.")});
/* Fill out these functions using Mongoose queries*/
//Check out - https://mongoosejs.com/docs/queries.html

var findLibraryWest = function() {
  /* 
    Find the document that contains data corresponding to Library West,
    then log it to the console. 
   */

   Listing.find({'name': 'Library West'}, function(error, person) {
      if(error) throw error;
      console.log(person);
   });
};
var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed 
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console. 
   */

   Listing.findOneAndRemove({'code': 'CABL'}, function(error, person) {
      if(error) throw error;
      console.log(person);
   });
};
var updatePhelpsMemorial = function() {
  /*
    Phelps Memorial Hospital Center's address is incorrect. Find the listing, update it, and then 
    log the updated document to the console. 
   */

   Listing.findOneAndUpdate({'name': 'Phelps Laboratory'}, {'address': '1953 Museum Rd, Gainesville, FL 32603'}, 
    function(error, person) {
      if(error) throw error;
      console.log(person);
      //database.close(); //temporarilt closes the connection after queries
   })
};
var retrieveAllListings = function() {
  /* 
    Retrieve all listings in the database, and log them to the console. 
   */
   Listing.find({}, function(error, listings) {
      if(error) throw error;
      console.log(listings);
   })
};

database.once('open', () => {
  findLibraryWest();
  removeCable();
  updatePhelpsMemorial();
  retrieveAllListings();
});

//Note, we can fix the hanging issue by adding the async library and using async.series to allow
//us to use the callback to place our database.close() call. 