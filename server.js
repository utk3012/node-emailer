var express=require('express');
var nodemailer = require("nodemailer");
var app=express();
var hostname = 'localhost';
var port = 3000;
app.use(express.static(__dirname + '/app'));
var transporter = nodemailer.createTransport({
  service: 'gmail',
    host: 'smtp.gmail.com',
  auth: {
    user: 'utkarsh3022@gmail.com',
    pass: 'mynameisraj'
  }
});

app.get('/',function(req,res){
res.sendfile('index.html');
});

app.get('/send',function(req,res) {
    var mailOptions = {
      from: 'utkarsh3022@gmail.com',
      to: req.query.to,
      subject: req.query.subject,
      text: req.query.text
    };
    
    transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                res.end("error");
            } 
            else {
            console.log('Email sent: ' + info.response);
              res.end("sent");
            }
        });
});

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});