var express = require("express");
var app = express();
var request = require("request");
var exphbs  = require("express-handlebars");
var path = require("path");
var cons = require('consolidate')
var hbs = exphbs.create({defaultLayout: 'layout'});
var animedata = require('./data/animename.json');
var manga = require('./data/manga.json');
//static files
app.use(express.static((__dirname, 'public')));
//view engine
app.engine('ejs', cons.ejs);
app.engine('handlebars', hbs.engine);
app.set('view engine','ejs');



app.get("/movie",function(req,res){
  res.render("movie");
});
app.get("/game",function(req,res){
  res.render("gamesearch");
});

app.get("/",function(req,res){
  res.render("home");
});
app.get("/song",function(req,res){
  res.render("song");
})


app.get("/results",function(req,res){
  // console.log(req.query.search);
  var query = req.query.search;
  var url = "http://www.omdbapi.com/?s="+query+"&apikey=thewdb";
  request(url,function (error,response,body) {
    if(!error && response.statusCode == 200){
      var data = JSON.parse(body);
    //  res.send(results["Search"][0]["Title"]);
      res.render("movie",{data:data});
    }
  });
});

app.get("/lyrics",function(req,res){
  // console.log(req.query.search);
  var query = req.query.search;
  var song = req.query.song;
  var url = "http://api.lololyrics.com/0.5/getLyric?artist="+query+"&track="+song;
  request(url,function (error,response,body) {
    if(!error && response.statusCode == 200){

var data1 = body.replace(/\n/gi, '<br />');


      res.render("lyrics",{data:data1});
    }
  });
});

app.get("/Games",function(req,res){
  // console.log(req.query.search);
  var query = req.query.search;
  var url = "http://thegamesdb.net/api/GetGamesList.php?name="+query;
  request(url,function (error,response,body) {
    if(!error && response.statusCode == 200){
var data1 = body.replace(/\n/gi, '<br />');
      res.render("game",{data:data1});
    }
  });
});
app.get("/artist",function(req,res){
  // console.log(req.query.search);
  var query = req.query.search;
  var url = "http://www.theaudiodb.com/api/v1/json/1/search.php?s="+query;
  request(url,function (error,response,body) {
    if(!error && response.statusCode == 200){
  var data = JSON.parse(body);
      res.render("artist",{data:data});
    }
  });
});
app.get("/anime",function(req,res){
  // console.log(req.query.search);
  var query = req.query.search;
var animedata = require('./data/animename.json');
      res.render("anime",{data:animedata,
                          query:query});

  });
  app.get("/manga",function(req,res){
    // console.log(req.query.search);
    var query = req.query.search;
        res.render("manga",{data:manga,
                            query:query});

    });


//http://www.theaudiodb.com/api/v1/json/1/search.php?s=selena%20gomez

var PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log("Discover");
