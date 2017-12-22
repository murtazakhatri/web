var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var users=[];
var onlineuser=[];


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");

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
        
        io.sockets.emit("rmsg",{name:name,msg:msg});



    });

    function updateuser(){ 
        io.sockets.emit("get user",onlineuser);
        


       
       



    }

 });

http.listen(1234,function(){
console.log("server created with port 1234");
});