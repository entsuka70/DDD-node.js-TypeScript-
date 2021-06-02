const path = require('path');
const express = require('express');
const app = express();

/* 5000番ポートで待ち受け */
const server = app.listen(5000, function () {
console.log(`Node.js is listening to PORT: ${server.address().port}`);
});
// ルーティング

const userRoutes = require('routes/user');
userRoutes(app);
// app.use('/', user);