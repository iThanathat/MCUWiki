const constantVariable = require('./ConstantVariables')
const replyServices = require('./ReplyServices')
const MESSAGE = constantVariable.MESSAGE
const STICKER = constantVariable.STICKER_PACKAGE
const MIN_STICKER = constantVariable.MIN_STICKER_ID
const MAX_STICKER = constantVariable.MAX_STICKER_ID

module.exports = function handleMessage(client, replyToken, message) {
    let isUnsuportedMessageType = MESSAGE.MESSAGE_TYPES.some(type => {
        return (message.type == type && (message.type != 'text' && message.type != 'sticker'))
    })
    let messageType = isUnsuportedMessageType ? 'unsupported' : message.type
    switch (messageType) {
        case 'text':
            return replyServices.replyMessage(client, replyToken, handleText(message.text))
        case 'sticker':
            return replyServices.replyMessage(client, replyToken, handleSticker())
        case 'unsupported':
            return replyServices.replyMessage(client, replyToken, MESSAGE.UNSUPPORTED_MESSAGE)
        default:
            throw new Error(`Unknown message: ${JSON.stringify(message)}`)
    }
}

function handleText(textMessages) {
    textMessages = Array.isArray(textMessages) ? textMessages: [textMessages]
    return textMessages.map((textMessage) => ({
            type : 'text', 
            text : replyServices.getCharacterInformation(textMessage.trim())
        }
    ))
}

function handleSticker() {
    let packageId = randomNumberInRange(STICKER.STICKER_PACKAGE_1, STICKER.STICKER_PACKAGE_3)
    let stickerId;
    switch (packageId) {
        case STICKER.STICKER_PACKAGE_1:
            stickerId = randomNumberInRange(MIN_STICKER.MIN_STICKER_ID_1, MAX_STICKER.MAX_STICKER_ID_1)
            break
        case STICKER.STICKER_PACKAGE_2:
            stickerId = randomNumberInRange(MIN_STICKER.MIN_STICKER_ID_2, MAX_STICKER.MAX_STICKER_ID_2)
            break
        case STICKER.STICKER_PACKAGE_3:
            stickerId = randomNumberInRange(MIN_STICKER.MIN_STICKER_ID_3, MAX_STICKER.MAX_STICKER_ID_3)
            break
        default:
            throw new Error("Function randomSticker is failed !!")
    }
    return {
        type : 'sticker',
        packageId : packageId,
        stickerId : stickerId
    }
}

function randomNumberInRange(minRange, maxRange) {
    let numberInRange = Math.floor(Math.random() * ( maxRange - minRange + 1)) + minRange
    return numberInRange
}