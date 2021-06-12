const path = require('path');
const express = require('express');
const app = express();

// express4.xx以降で以下を同梱
// https://expressjs.com/ja/api.html
// This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.json());

/* 5000番ポートで待ち受け */
const server = app.listen(5000, function () {
    console.log(`Node.js is listening to PORT: ${server.address().port}`);
});
// ルーティング

const userRoutes = require('routes/user');
const pairRoutes = require('routes/pair');
const teamRoutes = require('routes/team');
userRoutes(app);
pairRoutes(app);
teamRoutes(app);