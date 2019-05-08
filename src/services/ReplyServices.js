const characterInfomations = require('../mockdb/characterDb.js').CharacterInfomations
const MESSAGE = require('./ConstantVariables').MESSAGE

function getCharacterInformation (textMessage) {
    let character = characterInfomations.find(characterData => {
        return compareStringIgnoreCase(characterData.Name, textMessage)
    });
    if (character instanceof Object) {
        return character.Name + '\n' + character.Type + '\n' + character.Info
    }
    return MESSAGE.NOT_FOUND_CHARACTER_MESSAGE
}

function compareStringIgnoreCase(string1, string2) {
    let isEqual = false
    if (string1.toLowerCase() == string2.toLowerCase()) {
        console.log("Equal")
        isEqual = true
    }
    return isEqual
}

function replyMessage(client, replyToken, message) {
    return client.replyMessage(replyToken, message)
}

module.exports.replyMessage = replyMessage
module.exports.getCharacterInformation = getCharacterInformation