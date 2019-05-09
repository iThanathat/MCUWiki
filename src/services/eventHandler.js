const handleMessage = require('./MessageHandler.js')
const handleFollow = require('./FollowHandler.js')

module.exports = function (client, event) {
  switch (event.type) {
    case 'message':
      const message = event.message;
      return handleMessage(client, event.replyToken, message)
    case 'follow':
      return handleFollow(client, event);
    case 'unfollow':
      return console.log(`Unfollowed this bot: ${JSON.stringify(event)}`);
    case 'join':
      return client.replyMessage(event.replyToken, `Joined ${event.source.type}`);
    case 'leave':
      return console.log(`Left: ${JSON.stringify(event)}`);
    case 'postback':
      let data = event.postback.data;
      return client.replyMessage(event.replyToken, `Got postback: ${data}`);
    case 'beacon':
      const dm = `${Buffer.from(event.beacon.dm || '', 'hex').toString('utf8')}`;
      return client.replyMessage(event.replyToken, `${event.beacon.type} beacon hwid : ${event.beacon.hwid} with device message = ${dm}`);
    default:
      throw new Error(`Unknown event: ${JSON.stringify(event)}`);
  }
}