'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

/* Connect to your database using mongoose - remember to keep your key secret*/
//see https://mongoosejs.com/docs/connections.html
//See https://docs.atlas.mongodb.com/driver-connection/

/*const MongoClient = require('mongodb').MongoClient;
const uri = config.db.uri;
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
   //perform actions on the collection object
  client.close();
});*/
mongoose.connect(config.db.uri, { useNewUrlParser: true});
var database = mongoose.connection;
database.on('error', console.error.bind(console, 'Couldn\'t connect to the database.'));
 
/* 

  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
  //see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

  Remember that we needed to read in a file like we did in Bootcamp Assignment #1.
 */
database.once('open', () => {
  fs.readFile('listings.json', 'utf8', (err, data) => {
    if (err) throw err;
    var listingsData = JSON.parse(data);
    console.log('first json element: ' + JSON.stringify(listingsData.entries[0]));
    listingsData.entries.forEach(function(listing) {
      var newListing = new Listing(listing);
      newListing.save(function(err) {
        if (err) throw err;
        //Successfully saved a listing to the database
      });
    });
    //Ensure it's an object then iterate through and give each listing a model instance.
  });
});


/*  
  Check to see if it works: Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */