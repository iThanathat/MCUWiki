const characterInfomations = require('../mockdb/characterDb.js').CharacterInfomations
const MESSAGE = require('./ConstantVariables').MESSAGE

function getCharacterInformation (textMessage) {
    let character = characterInfomations.find(characterData => {
        return compareStringIgnoreCase(characterData.Name, textMessage)
    });
    if (character instanceof Object) {
        return `ประวัติตัวละคร \n${character.Name} \n${character.Info}`
    }
    return MESSAGE.NOT_FOUND_CHARACTER_MESSAGE
}

function getCharacterCasting (textMessage) {
    let character = characterInfomations.find(characterData => {
        return compareStringIgnoreCase(characterData.Name, textMessage)
    });
    if (character instanceof Object) {
        return `ชื่อของนักแสดงตัวละครนี้ \n${character.Casting}`
    }
    return MESSAGE.NOT_FOUND_CHARACTER_MESSAGE
}

function getAppearMovies (textMessage) {
    let character = characterInfomations.find(characterData => {
        return compareStringIgnoreCase(characterData.Name, textMessage)
    });
    if (character instanceof Object) {
        return `รายชื่อหนังที่ตัวละครนี้ปรากฎ \n ${character.Movie}`
    }
    return MESSAGE.NOT_FOUND_CHARACTER_MESSAGE
}

function compareStringIgnoreCase(string1, string2) {
    let isEqual = false
    if (string1.toLowerCase() == string2.toLowerCase()) {
        isEqual = true
    }
    return isEqual
}

function replyMessage(client, replyToken, messages) {
    messages = Array.isArray(messages) ? messages: [messages]
    return messages.map(message => {
        return client.replyMessage(replyToken, message)
    })
}

function replyGreetingMessage(client, replyToken, message) {
    return client.replyMessage(replyToken, message)
}

module.exports.replyMessage = replyMessage
module.exports.replyGreetingMessage = replyGreetingMessage
module.exports.getCharacterInformation = getCharacterInformation
module.exports.getCharacterCasting = getCharacterCasting
module.exports.getAppearMovies = getAppearMovies