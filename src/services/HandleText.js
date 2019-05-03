var replyServices = require('./ReplyServices');

module.exports = function (client, message, replyToken){
  return replyServices(
      client, 
      replyToken, 
      message.type, 
      setReplyTextFomat(message.text)
    );
}

function setReplyTextFomat(textMsgs) {
    textMsgs = Array.isArray(textMsgs) ? textMsgs : [textMsgs];
    return textMsgs.map((text) => ({type: 'text', text}));
}