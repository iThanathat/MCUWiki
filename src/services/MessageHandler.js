const constantVariable = require('./ConstantVariables')
const replyServices = require('./ReplyServices')
var LocalStorage = require('node-localstorage').LocalStorage,
storage = new LocalStorage('./LocalStorage');
const MESSAGE = constantVariable.MESSAGE
const STICKER = constantVariable.STICKER_PACKAGE
const MIN_STICKER = constantVariable.MIN_STICKER_ID
const MAX_STICKER = constantVariable.MAX_STICKER_ID

module.exports = function handleMessage(client, replyToken, message, event) {
    let isUnsuportedMessageType = MESSAGE.MESSAGE_TYPES.some(type => {
        return (message.type == type && (message.type != 'text' && message.type != 'sticker'))
    })
    let messageType = isUnsuportedMessageType ? 'unsupported' : message.type
    switch (messageType) {
        case 'text':
            return replyServices.replyMessage(client, replyToken, handleText(message.text, client, event))
        case 'sticker':
            return replyServices.replyMessage(client, replyToken, handleSticker())
        case 'unsupported':
            return replyServices.replyMessage(client, replyToken, MESSAGE.UNSUPPORTED_MESSAGE)
        default:
            throw new Error(`Unknown message: ${JSON.stringify(message)}`)
    }
}

function handleText(textMessages, client, event) {
    textMessages = Array.isArray(textMessages) ? textMessages: [textMessages]
    let userEvent = storage.getItem(`${event.source.userId}`)
    let character = userEvent ? JSON.parse(userEvent).message.text : null
    const homeRichMenuId = 'richmenu-2a777e6392acf7362be0822428c50d3f'
    const HERO_INFO = '1'
    const PLAY_IN = '2'
    const CASTING = '3'
    const CANCEL = '4'
    if(character) {
        return textMessages.map(text => {
            switch(text) {
                case HERO_INFO:
                    return [
                        {
                            type : 'text',
                            text : replyServices.getCharacterInformation(character),
                        },
                        {
                            type: 'text',
                            text: `อยากรู้อะไรเพิ่มเติมเกี่ยวกับ ${character} กดเลขต่อได้เลย หรือ กด 4 เพื่อยกเลิกตัวละครนี้`
                        }
                    ]
                case PLAY_IN:
                    return [
                        {
                            type : 'text',
                            text : replyServices.getAppearMovies(character),
                        },
                        {
                            type: 'text',
                            text: `อยากรู้อะไรเพิ่มเติมเกี่ยวกับ ${character} กดเลขต่อได้เลย หรือ กด 4 เพื่อยกเลิกตัวละครนี้`
                        }
                    ]
                case CASTING:
                    return [
                        {
                            type : 'text',
                            text : replyServices.getCharacterCasting(character),
                        },
                        {
                            type: 'text',
                            text: `อยากรู้อะไรเพิ่มเติมเกี่ยวกับ ${character} กดเลขต่อได้เลย หรือ กด 4 เพื่อยกเลิกตัวละครนี้`
                        }
                    ]
                case CANCEL:
                    storage.removeItem(`${event.source.userId}`)
                    client.unlinkRichMenuFromUser(event.source.userId).catch(error => {
                        console.error(err);
                    })
                    return {
                        type : 'text', 
                        text : `ขอบคุณที่ใช้บริการ MCUWikiจ้า`
                    }
                default:
                    return {
                        type : 'text', 
                        text : 'กรุณาพิมพ์เลขที่ระบุไว้เท่านั้น'
                    }
            }
        })
    } else {
        return textMessages.map(text => {
            if(replyServices.getCharacterInformation(text.trim()) !== MESSAGE.NOT_FOUND_CHARACTER_MESSAGE ) {
                client.linkRichMenuToUser(event.source.userId, homeRichMenuId).catch(error => {
                    console.error(err);
                })
                storage.setItem(`${event.source.userId}`, JSON.stringify(event))
                return {
                    type : 'text', 
                    text : `คุณเลือกตัวละคร ${text.trim()} กรุณาเลือกว่าคุณอยากทราบข้อมูลอะไร \n 1.ประวัติ \n 2.ภาพยนตร์ที่ปรากฎตัว \n 3.ชื่อนักแสดง \n 4.ยกเลิกตัวละครนี้
                    \nหรือคุณสามารถเลือกกดจาก \nrich menu ที่ชื่อ MCU Choice ได้\nปล. MCU Choice จะหายไปเมื่อกดยกเลิกตัวละครนี้`.trim()
                }
            } else {
                return {
                    type: 'text',
                    text: MESSAGE.NOT_FOUND_CHARACTER_MESSAGE
                }
            }
        })
    }

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