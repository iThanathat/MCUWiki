const replyServices = require('./ReplyServices')
const MESSAGE = require('./ConstantVariables').MESSAGE

module.exports = function handleFollow(client, event) {
    client.getProfile(event.source.userId).then(profile => {
        let userName = profile.displayName
        let followMessage =[
            {
                type : 'text',
                text : `Hello, ${userName}. Thank you for being friends with MCUWiki.`
            },
            {
                type : 'text',
                text : MESSAGE.HOW_TO_USE_MESSAGE
            }
        ]
        return replyServices.replyMessage(client, event.replyToken, followMessage)
    })
}