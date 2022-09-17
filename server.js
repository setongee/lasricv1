const express = require('express');
const path = require('path');
const cors = require("cors")
const nodemailer = require("nodemailer");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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");

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
    from: 'lasric@feather.africa', 
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
  //ES8
  (async () => {
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error(error);
  
      if (error.response) {
        console.error(error.response.body)
      }
    }
  })();


})



app.listen(9000);