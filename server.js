var express = require('express');
var multer = require('multer');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/cms';
var db = null;
var upload = multer({ dest: './uploads/' })


MongoClient.connect(url, function(err, database) {
    db = database;
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', function (req, res) {

    res.render('index');

});

app.post('/content', function(req,res){
         
     console.log("Yay! content saved.")    
     console.log("===================");
     console.log(req.body);
     console.log("===================");
     res.send("saved");
});


app.post('/upload', upload.single('upl'), function(req,res){
	console.log(JSON.parse(req.body.test));
	console.log(req.file); 
	res.status(204).end();
});

app.listen(3000, function () {
  
    console.log('App listening on port 3000!');

});