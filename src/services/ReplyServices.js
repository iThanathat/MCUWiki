const replyService = (client, token, type , msgs) => {
  if (msgs !== undefined) {
    return replyMsg(client, token, msgs);
  } else {
    return defaultReply(client, token, type);
  }
};

function replyMsg(client, token, msgs) {
  return client.replyMessage(token, msgs);
}

function defaultReply(client, token, type) {
  let defaultMsg = [{
    'type': 'text',
    'text': type + ' isn\'t support in this chatbot.'
    },
    {
      'type': 'sticker',
      'packageId': '11537',
      'stickerId': '52002770'
    },
    {
      'type': 'text',
      'text': 'Please try another message.'
    }
  ]
  return client.replyMessage(token, defaultMsg);
}

module.exports = replyService;