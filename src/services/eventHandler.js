var replyServices = require('./ReplyServices')
var handleText = require('./HandleText')
var handleImage = require('./HandleImage')
var handleVideo = require('./HandleVideo')
var handleAudio = require('./HandleAudio')
var handleLocation = require('./HandleLocation')
var handleSticker = require('./HandleSticker')

module.exports = function(client, event) {
  switch (event.type) {
    case 'message':
      const message = event.message;
      switch (message.type) {
        case 'text':
          return handleText(client, message, event.replyToken);
        case 'image':
          return handleImage(client, message, event.replyToken);
        case 'video':
          return handleVideo(client, message, event.replyToken);
        case 'audio':
          return handleAudio(client, message, event.replyToken);
        case 'location':
          return handleLocation(client, message, event.replyToken);
        case 'sticker':
          return handleSticker(client, message, event.replyToken);
        default:
          throw new Error(`Unknown message: ${JSON.stringify(message)}`);
      }

    case 'follow':
      return replyServices(client, event.replyToken, 'text', 'Got followed event');

    case 'unfollow':
      return console.log(`Unfollowed this bot: ${JSON.stringify(event)}`);

    case 'join':
      return replyServices(client, event.replyToken, 'text', `Joined ${event.source.type}`);

    case 'leave':
      return console.log(`Left: ${JSON.stringify(event)}`);

    case 'postback':
      let data = event.postback.data;
      return replyServices(client, event.replyToken, 'text', `Got postback: ${data}`);

    case 'beacon':
      const dm = `${Buffer.from(event.beacon.dm || '', 'hex').toString('utf8')}`;
      return replyServices(client, event.replyToken, 'text', `${event.beacon.type} beacon hwid : ${event.beacon.hwid} with device message = ${dm}`);

    default:
      throw new Error(`Unknown event: ${JSON.stringify(event)}`);
  }
}