const replyServices = require('./ReplyServices')

module.exports = function handleFollow(client, event) {
    client.getProfile(event.source.userId).then(profile => {
        let userName = profile.displayName
        return replyServices.replyMessage(
            client,
            event.replyToken,
            {
                type : 'text',
                text : `Hello, ${userName}. Thank you for being friends with MCUWiki.`
            }
        )
    })
}