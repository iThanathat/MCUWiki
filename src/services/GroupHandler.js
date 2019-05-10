const MESSAGE = require('./ConstantVariables.js').MESSAGE
const replyServices = require('./ReplyServices.js')


module.exports = function handleGroup(client, event) {
    switch (event.type) {
        case 'join':
            return greetingForJoined(client, event)
        case 'memberJoined':
            return greetingMemberJoined(client, event)
        default:
            throw new Error(`Unknown event: ${JSON.stringify(event)}`);
    }
}

function greetingForJoined(client, event) {
    return replyServices.replyMessage(client, event.replyToken,[
        {
            type : 'text',
            text : MESSAGE.JOIN_GROUP_MESSAGE
        },
        {
            type : 'text',
            text : MESSAGE.HOW_TO_USE_MESSAGE
        }]
    )
}

function greetingMemberJoined(client, event) {
    let newMember = event.joined.members[event.joined.members.length - 1]
    client.getGroupMemberProfile(event.source.groupId, newMember.userId).then(profile => {
        let userName = profile.displayName
        let followMessage =[
            {
                type : 'text',
                text : `Hello, ${userName}. Welcome to this group.`
            },
            {
                type : 'text',
                text : MESSAGE.HOW_TO_USE_MESSAGE
            }
        ]
        return replyServices.replyMessage(client, event.replyToken, followMessage)
    })
}