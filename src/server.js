var http = require('http');
var fs = require('fs');
var url = require('url');
var minDistance= 200;
var geolib = require('geolib');


http.createServer(function (req, res) {
  fs.readFile('list.json','utf8', function(err, data) {
    if(err) throw err;
    res.writeHead(200, {'Content-Type': 'text/html'});
    
    var bodyParser = require('body-praser');
    var app = express();
    app.use(myParser.urlencoded({extended : true}));
    app.post("/yourpath", function(request, response) {
        console.log(request.body); //This prints the JSON document received (if it is a JSON document)
    });
    
    var q = url.parse(req.url, true).query;
    var centerX = q.x; //url x
    var centerY = q.y; // url y 

    var query = {latitude:q.x,
        longitude:q.y};

    data = JSON.parse(data);
    for ( i = 0; i< data.length; i++) // jason 
    {
        item = data[i];
        //console.log(data[i]);
        var point = {latitude:item.location.latitude,
            longitude:item.location.longitude};
        var distance = geolib.getDistance(point, query);
        // var distance = Math.sqrt(
        //     Math.pow((centerX-jason_x),2) + 
        //     Math.pow((centerY-jason_y),2));
         if ( distance < minDistance) {
            console.log(distance);
        }
         else
         console.log("else"+ distance );

    } 
    //console.log(q);
    //res.write(data);
    res.end();
  });
}).listen(8080); 