var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var Wit = require('node-wit').Wit;
var log = require('node-wit').log;
var Bot =  require('./bot');
var users=[];
var onlineuser=[];


//
//Bot.sendMessage();
//Bot.recieveMessage();

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");

});



client = new Wit({
    accessToken: "EYZZTIG4PZAP3HUC2KRN6AOYSYZHXEKB",
    logger: new log.Logger(log.DEBUG) // optional
  });
io.on("connection",function(socket){
    users.push(socket);
    console.log("New User Connected "+users.length); 

    socket.on("disconnect",function(){
        users.splice(users.indexOf(socket),1);
        onlineuser.splice(onlineuser.indexOf(socket.username),1);
        console.log("User Disconnected "+users.length);



    });
    socket.on("new user",function(data){
        socket.username = data;
        onlineuser.push(socket.username);
        console.log("user connected "+socket.username);   
        updateuser();
 


    });
    socket.on("msg",function(name,msg){
        client.message('set an alarm tomorrow at 7am').then(function(result){
            console.log("abdul wassay",result);
            
            io.sockets.emit("rmsg",{name:name,msg:msg,result});
        } ).catch(function(){
            console.log("fsdfsd",error);
        })
        


    });

    function updateuser(){ 
        io.sockets.emit("get user",onlineuser);
    
    }

 });
 
//  client = new Wit({
//     accessToken: "PVS6VTT2ECT43WDWBB5YM2R6NJP33W35",
//     logger: new log.Logger(log.DEBUG) // optional
//   });
  
// console.log(client.message('set an alarm tomorrow at 7am'));

  
//console.log(client.message('which type of laptop u want'));

http.listen(1234,function(){
console.log("server created with port 1234");
});