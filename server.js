var express = require('express');
var app = express();

var server  = require("http").createServer(app);
var io = require("socket.io")(server);
var session = require("express-session")({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true});
var sharedsession = require("express-socket.io-session");
var redis = require('redis');
var client = redis.createClient();
var cookieParser = require('cookie-parser');
var regexmail = require('regex-email');

//Database
dbLocation = '127.0.0.1:27017/PathfinderDB';
var db = require('monk')(dbLocation);
//Models
var users = db.get('users');
var games = db.get('games');
var characters = db.get('characters');
var stories = db.get('stories');
var manual = db.get('manual');



var async = require('async');

var prefix = "toto";
var suffix = "toto";

//Crypto
var crypto = require('crypto');
var sha256 = require('sha256');


//Date
var jsDate=require("js-date");

//Body Parser
var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(cookieParser());

//random
var random = require('node-random');

function launchD(quantity,min,max){
  return new Promise(function(resolve,reject){
    random.integers({"number":quantity,"minimum":min,"maximum":max},function(error,data){
      if(error){
        reject(error);
      }
      else{
        resolve(data);
      }
    });
  });
}

function getNextUserID(callback){
  async.series([
    function(callback){
        users.find({}).then((user)=>{
          id=user.length;
          callback(null,id);
        });
    }],function(err,result){
      callback(parseInt(result,10)+1);
    });
}

//static dir
app.use(express.static(__dirname+'/public'));
// Attach session
app.use(session);
// Share session with io sockets
io.use(sharedsession(session));
// req.session. => express 
// socket.handshake.session => socket

io.use((socket, next)=>{

  console.log(socket.handshake.session.user);
  console.log('toto');

  if(socket.handshake.session.user!=null){
    return next();
  }
  else{
    next(new Error('Need to authenticate'));
  }
});

var isAuthenticated = function (req, res, next) {
  if (req.session.user)
    return next();
  res.render('unauthenticatedIndex.ejs');
//  res.redirect('/');
}

app.get('/',isAuthenticated,function(req,res){
  res.render('index.ejs');
});

app.get('/login',function(req,res){
  res.render('login.ejs');
});

app.post('/login',function(req,res){
  //check auth
  var username=req.body.username.toString().toLowerCase();
  var password=sha256(prefix+req.body.password+suffix);

  if(username==""){
    res.render('unauthenticatedIndex.ejs',{loginError:true});
  }

  else{
    users.findOne({'username':username}).then((utilisateur)=>{
      if(utilisateur==null){
        res.render('unauthenticatedIndex.ejs',{loginError:true});
      }

      else if(utilisateur.password!=password){
        res.render('unauthenticatedIndex.ejs',{loginError:true});   }
      else{
        req.session.user=utilisateur;
        res.redirect('/');
      }
    })
    .catch((err)=>{
      res.render('unauthenticatedIndex.ejs',{loginError:true}); 
    });
  }
});

app.get('/register',function(req,res){
  res.render('register.ejs');
});

app.post('/register',function(req,res){
    var username=req.body.username.toString().toLowerCase();
    var password=sha256(prefix+req.body.password+suffix);
    var email=req.body.email.toString().toLowerCase();
  // recaptcha.verify(req, function(error){
  //   if(!error){
    if(regexmail.test(email)){
        users.findOne({ $or: [ {'email':email},{'username': username}]}).then((utilisateur)=>{
          if(utilisateur!=null){
            if(utilisateur.email==email){
              res.end(JSON.stringify({status:0,text:"L'utilisateur "+utilisateur.username+" est déjà enregistré avec l'adresse mail "+utilisateur.email+"."}));
            }else{
              res.end(JSON.stringify({status:0,text:"L'utilisateur "+utilisateur.username+" est déjà enregistré."}));
            }

          }
          else{
            async.waterfall([
                    function(callback){
                        getNextUserID(function(NextCatID){
                            callback(null,NextCatID);
                        });
                    }
                ],function(err,result){
                    users.insert({ id:result, username: username, password: password, email: email, description:""})
              .then((doc)=>{
                res.end(JSON.stringify({status:1,text:'Vous pouvez maintenant vous logger :)'}));
            })
              .catch((doc)=>{
                res.end(JSON.stringify({status:0,text:'Erreur, merci de contacter un admin.'}));
                    });
                });
          }
        }).catch((err)=>{console.log(err);res.end('Error')});
    }else{
        res.end(JSON.stringify({status:0,text:"Ceci n'est pas une adresse mail ."}));
    }
 // }
//  else{
//    res.end(JSON.stringify({status:0,text:"Erreur de captcha !"}));
//  }
//  });
});

app.get('/profil',isAuthenticated,function(req,res){
  characters.find({user_id:req.session.id}).then((Characters)=>{
    stories.find({'players':{$elemMatch:{$eq:req.session.user.id}}}).then((Stories)=>{
      res.render('profil.ejs',{characters:Characters,stories:Stories});
    }).catch((err)=>{console.log(err);res.end('Error')});
  }).catch((err)=>{console.log(err);res.end('Error')});
});

function take3Best(arr){
  return new Promise(function(resolve,reject){
    resolve(arr.splice(arr.indexOf(Math.min.apply(Math,arr)),1));
    if("a"==="b"){
      reject("Oups");
    }
  });
}


app.get('/new/character',isAuthenticated,function(req,res){
  res.render('newCharacter.ejs');
});

app.get('/new/character/caracs',function(req,res){
  launchD(4,1,6).then((result)=>{
    take3Best(result).then((res1)=>{
      launchD(4,1,6).then((result)=>{
        take3Best(result).then((res2)=>{
          launchD(4,1,6).then((result)=>{
            take3Best(result).then((res3)=>{
              launchD(4,1,6).then((result)=>{
                take3Best(result).then((res4)=>{
                  launchD(4,1,6).then((result)=>{
                    take3Best(result).then((res5)=>{
                      launchD(4,1,6).then((result)=>{
                        take3Best(result).then((res6)=>{
                          res.json(res1,res2,res3,res4,res5,res6);
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  }).catch((err)=>{console.log(err)});
});


app.get('/help/:where/:what/:precise',function(req,res){
  var where = req.params.where.toString().toLowerCase();
  var what = req.params.what.toString().toLowerCase();
  var precise =req.params.precise.toString().toLowerCase();

  if(where==="manual"){
    console.log(precise);

    manual.findOne({type:what,title:precise}).then((obj)=>{
      console.log(obj);
      res.json({'error':false,'text':obj.text});
    }).catch((err)=>{
      res.json({'error':true});
    });
  }
  else{
    res.json({error:1});
  }
  
  
});

const ejsLint = require('ejs-lint');


app.get('/mj',function(req,res){
  res.render('mj/index.ejs');
});

app.get('/mj/newstory',function(req,res){
  res.render('mj/newStory.ejs');
  //ejsLint.lint('/mj/newStory.ejs');

});







//a game is started ! 

io.on("connection", function(socket) {
  console.log('Yo !');
    // Accept a login event with user's data
    socket.on("login", function(userdata) {
        console.log(socket.handshake.session.user);
        console.log('receive login');
        // socket.handshake.session.userdata = userdata;
        //socket.handshake.session.save();
    });
    socket.on("logout", function(userdata) {
      console.log('receive logout');
        if (socket.handshake.session.userdata) {
            delete socket.handshake.session.userdata;
            socket.handshake.session.save();
        }
    });

    socket.on('getMaster',function(){
      console.log('getmasterAsked');
      client.set("master",socket.id,redis.print);
    });

    socket.on('amIMaster',function(){
      client.get('master',function(err,reply){
        if(reply===socket.id){
          socket.emit('master',{'txt':'you are the master !'});
        }
        else{
          socket.emit('master',{'txt':'you are not the master !'});
        }
      });
    });


    socket.on('test',function(userdata){
      console.log(userdata);
      console.log('--');
      console.log(socket.id);
      io.sockets.emit('everybody',{'user':socket.id}); //parler a tous
      io.to(socket.id).emit('yeah'); // parler a 1 user

    });
    socket.on('pouet',function(){ // par défaut socket répond a l'éméteur
      socket.emit('pouet');
    });        
});

server.listen(3000);