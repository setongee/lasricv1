const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded ( {extended : true} ) )

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/api', (req,res)=>{
  res.send('This is the send mail and data house of lasricv2 API')
})

app.listen(9000);