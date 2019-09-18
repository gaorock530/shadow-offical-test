const https = require('https');
const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

app.set('x-powered-by', false);
app.use(express.static(__dirname + '/build'));

const PORT = 3000;

const options = {
  key: fs.readFileSync(path.join(__dirname, '/ssl/www/2_www.yingxitech.com.key')),
  cert: fs.readFileSync(path.join(__dirname, '/ssl/www/1_www.yingxitech.com_bundle.crt'))
};

const server = https.createServer(options, app);


server.listen(PORT, (e) => {
  console.log(e || `Server is running on port ${PORT}.`);
});