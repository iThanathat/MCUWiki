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
      return replyText(client, event.replyToken, 'Got followed event');

    case 'unfollow':
      return console.log(`Unfollowed this bot: ${JSON.stringify(event)}`);

    case 'join':
      return replyText(client, event.replyToken, `Joined ${event.source.type}`);

    case 'leave':
      return console.log(`Left: ${JSON.stringify(event)}`);

    case 'postback':
      let data = event.postback.data;
      return replyText(client, event.replyToken, `Got postback: ${data}`);

    case 'beacon':
      const dm = `${Buffer.from(event.beacon.dm || '', 'hex').toString('utf8')}`;
      return replyText(client, event.replyToken, `${event.beacon.type} beacon hwid : ${event.beacon.hwid} with device message = ${dm}`);

    default:
      throw new Error(`Unknown event: ${JSON.stringify(event)}`);
  }
}

const replyText = (client, token, texts) => {
  texts = Array.isArray(texts) ? texts : [texts];
  return client.replyMessage(
    token,
    texts.map((text) => ({ type: 'text', text }))
  );
};

function handleText(client, message, replyToken) {
  return replyText(client, replyToken, message.text);
}

function handleImage(client, message, replyToken) {
  return replyText(client, replyToken, 'Got Image');
}

function handleVideo(client, message, replyToken) {
  return replyText(client, replyToken, 'Got Video');
}

function handleAudio(client, message, replyToken) {
  return replyText(client, replyToken, 'Got Audio');
}

function handleLocation(client, message, replyToken) {
  return replyText(client, replyToken, 'Got Location');
}

function handleSticker(client, message, replyToken) {
  return replyText(client, replyToken, 'Got Sticker');
}