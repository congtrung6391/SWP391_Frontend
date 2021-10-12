/* eslint-disable no-console */
const express = require('express');
const path = require('path');

const app = express();
const publicPath = path.join(__dirname, '..', 'build');

app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode.", this.address().port, app.settings.env);
});