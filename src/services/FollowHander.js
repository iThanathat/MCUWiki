const replyServices = require('./ReplyServices')

module.exports = function handleFollow(client, replyToken, message) {
    return replyServices.replyMessage(
        client,
        replyToken,
        {
            type : 'text',
            text : message
        }
    )
}