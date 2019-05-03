var replyServices = require('./ReplyServices');

module.exports = function (client, message, replyToken){
  return replyServices(client, replyToken, message.type);
}