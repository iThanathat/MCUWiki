const replyServices = require('./ReplyServices')
const MESSAGE = require('./ConstantVariables').MESSAGE

module.exports = function handleFollow(client, event) {
    client.getProfile(event.source.userId).then(profile => {
        let userName = profile.displayName
        let followMessage =[
            {
                type : 'text',
                text : `สวัสดีคุณ, ${userName}. ขอบคุณที่เพิ่มMCUWikiเป็นเพื่อน!.`
            },
            {
                type : 'text',
                text : MESSAGE.HOW_TO_USE_MESSAGE
            }
        ]
        return replyServices.replyGreetingMessage(client, event.replyToken, followMessage)
    })
}