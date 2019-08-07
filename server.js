//Install express server
const express = require('express');
const path = require('path');
var cors = require('cors');

const app = express();

var allowedOrigins = ['http://localhost:3000','http://localhost:4200','https://marvelapi-sydney.herokuapp.com/','http://marvelapi-sydney.herokuapp.com/'];




// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/'));

app.use(cors({
	origin: function(origin, callback){
	  // allow requests with no origin 
	  // (like mobile apps or curl requests)
	  if(!origin) return callback(null, true);
	  if(allowedOrigins.indexOf(origin) === -1){
		var msg = 'The CORS policy for this site does not ' +
				  'allow access from the specified Origin.';
		return callback(new Error(msg), false);
	  }
	  return callback(null, true);
	}
  }));

app.get('/*', function(req,res) {
res.sendFile(path.join(__dirname+'/dist/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);