const express = require('express');
const path = require('path');
const cors = require("cors")
const nodemailer = require("nodemailer");

const hbs = require('nodemailer-express-handlebars');
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded ( {extended : true} ) )

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/api/sendEmail', (req,res)=>{

  var transporter = nodemailer.createTransport({
    service : 'gmail',
    auth: {
      user: "seth.featherapp@gmail.com",
      pass: "ericxwiotqltwqdn@"
    }

  });
  
  var mailOptions = {
    from: 'seth.featherapp@gmail.com',
    to: 'seth@giroct.com',
    subject: "Hello bro",
    text : "Hello"
  };

  console.log(req.body)
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log("sent...");
    }
  }); 

})

app.listen(9000);