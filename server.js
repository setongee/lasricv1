const express = require('express');
const path = require('path');
const cors = require("cors")
const nodemailer = require("nodemailer");
const sgMail = require('@sendgrid/mail');
require('dotenv').config()

sgMail.setApiKey(process.env.REACT_APP_SENDGRID_API_KEY);

const hbs = require('nodemailer-express-handlebars');

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded ( {extended : true} ) )

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/api/sendemail', (req,res)=>{

  const link = `lasricportal.lagosstate.gov.ng/application/cohort5/${req.body.track}/${req.body.userid}/personal`

  const msg = {
    to: req.body.email,
    from: 'lasricportal@gmail.com', 
    subject: 'LASRIC Application Submitted!!!',
    html: ` <div> 
    
              <h1>Hey ${req.body.firstname},</h1> </br>
              <p> Your lasric ${req.body.track} application has been submitted successfully. </p> </br> </br>
              <p>We will kindly reach out soon to inform you if you were selcted or not. Goodluck! </p>

              </br> </br>

              <p> Here is a link to your application </p>
              <a href = ${link} >  ${link} </a>

            </div>`,
  };
  //ES6
  sgMail
    .send(msg)
    .then(() => {}, error => {
      console.error(error);
  
      if (error.response) {
        console.error(error.response.body)
      }
    });
})

//send register email

app.post('/api/sendemail/register', (req,res)=>{

  const link = `lasric.lagosstate.gov.ng/apply`

  const msg = {
    to: req.body.email,
    from: 'lasricportal@gmail.com', 
    subject: 'WELCOME TO LASRIC V5',
    html: ` <div> 
    
              <h1>Hey ${req.body.firstname} ${req.body.lastname},</h1> </br>
              <p> Welcome to LASRIC - Lagos State Science, Research & Innovation Council platform </p> </br> </br>
              <p>Create and build the next big thing for Lagos State </p>

              </br> </br>

              <p>Your login details are :  </p>
              
              </br> </br>

              email : ${req.body.email}, </br>
              password : ${req.body.password} </br>

              </br> </br>

              <p> Start Applying Today </p>
              <a href = ${link} >  ${link} </a>

            </div>`,
  };
  //ES6
  sgMail
    .send(msg)
    .then(() => {}, error => {
      console.error(error);
  
      if (error.response) {
        console.error(error.response.body)
      }
    });
})


app.post('/api/sendemails', (req,res)=>{

  const msg = [

    {
      to: req.body.emails,
      from: 'lasricportal@gmail.com', 
      subject: req.body.subject,
      html: req.body.html
    }

  ]

  sgMail
    .sendMultiple(msg)
    .then(() => {}, error => {
      console.error(error);
  
      if (error.response) {
        console.error(error.response.body)
      }
    });

})


app.post('/api/sendemail/council/create', (req,res)=>{

  const link = `lasric.lagosstate.gov.ng/council`

  const msg = {
    to: req.body.email,
    from: 'lasricportal@gmail.com', 
    subject: 'WELCOME TO LASRIC V5 Council Portal',
    html: ` <div> 
    
              <h1>Hey ${req.body.firstname} ${req.body.lastname},</h1> </br>
              <p> Welcome to LASRIC - Lagos State Science, Research & Innovation Council platform </p> </br> </br>
              <p>Kindly grade the applications attatched to your track! </p>

              </br> </br>

              <p>Your login details are :  </p>
              
              </br> </br>

              email : ${req.body.email}, </br>
              password : ${req.body.password} </br>

              </br> </br>

              <strong><p> Tap link to Start Grading Today </p></strong>
              <a href = ${link} > ${link} </a>

            </div>`,
  };
  //ES6
  sgMail
    .send(msg)
    .then(() => {}, error => {
      console.error(error);
  
      if (error.response) {
        console.error(error.response.body)
      }
    });
})



app.listen(9000);