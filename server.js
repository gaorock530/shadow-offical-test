const express = require('express');
const app = express();


app.use(express.static(__dirname + '/build'));


app.listen(8888, (e) => {
  console.log(e || 'Server is running on port 8888.');
})