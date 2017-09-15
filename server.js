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
    user: '*********@gmail.com', //gmail acc
    pass: '*********' //password
  }
});
allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  if ('OPTIONS' === req.method) {
    res.send(200);
  } else {
    next();
  }
};

app.use(allowCrossDomain);
app.get('/',function(req,res){
res.sendfile('index.html');
});

app.get('/send',function(req,res) {
    var mailOptions = {
      from: '*********@gmail.com', //gmail acc
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
