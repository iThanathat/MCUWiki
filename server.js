var express = require('express')
var line = require('@line/bot-sdk')
var config = require('./config/config.json')
var eventHandler = require('./src/services/EventHandler')
var app = express();

const client = new line.Client(config)

const port = config.port

app.post('/webhook', line.middleware(config), (req, res) => {
  if (!Array.isArray(req.body.events)) {
    return res.status(500).end();
  }
  Promise.all(req.body.events.map(event => {
    console.log('event', event);
    // check verify webhook event
    if (event.replyToken === '00000000000000000000000000000000' ||
      event.replyToken === 'ffffffffffffffffffffffffffffffff') {
      return;
    }
    return eventHandler(client, event)
  }))
    .then(() => res.end())
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
})

app.listen(process.env.PORT || port)

module.exports = app;

console.log(`Server runnning at port ${port}`)