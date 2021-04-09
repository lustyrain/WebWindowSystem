// nodeのコアモジュールのhttpを使う
const express = require("express");
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const userDataDir = './tmp/';

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
/* 2. listen()メソッドを実行して3000番ポートで待ち受け。*/
app.use(express.static(path.join(__dirname, 'dist')));
var server = app.listen(3000, function(){
  console.log("Node.js is listening to PORT:" + server.address().port);
});
app.get('/get', async (req, res, next) => {
  let userData = {};
  const userDataPath = userDataDir + req.connection.remoteAddress + '.json';
  if (fs.existsSync(userDataPath)) {
    userData = await fs.readFileSync(userDataPath);
  }
  res.send(userData);
});

app.post('/save', async (req, res, next) => {
  const data = req.body.data;
  const userDataPath = userDataDir + req.connection.remoteAddress + '.json';
  await fs.writeFileSync(userDataPath ,data);
  res.send('');
  // パラメータ名、nameを出力
});

