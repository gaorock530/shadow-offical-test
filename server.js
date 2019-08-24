const https = require('https');
const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();


app.use(express.static(__dirname + '/build'));

const options = {
  key: fs.readFileSync(path.join(__dirname, '/ssl/www/2_www.yingxitech.com.key')),
  cert: fs.readFileSync(path.join(__dirname, '/ssl/www/1_www.yingxitech.com_bundle.crt'))
};

const server = https.createServer(options, app);


server.listen(8888, (e) => {
  console.log(e || 'Server is running on port 8888.');
});