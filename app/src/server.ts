import express from 'express';
import expressListEndpoints from 'express-list-endpoints';
import user from './routes/user';
import pair from './routes/pair';
import team from './routes/team';
import issue from './routes/issue';
import userIssue from './routes/userIssue';
const app = express();
app.use('/user', user);
app.use('/pair', pair);
app.use('/team', team);
app.use('/issue', issue);
app.use('/userissue', userIssue);

// express4.xx以降で以下を同梱
// https://expressjs.com/ja/api.html
// This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.json());

/* 5000番ポートで待ち受け */
const server = app.listen(5000, function () {
  console.log(`Node.js is listening to PORT: ${String(server.address())}`);
  console.log(expressListEndpoints);
});
