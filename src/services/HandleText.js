var characterInfo = require('../mockdb/characterDb').CharacterInfomations;
var replyServices = require('./ReplyServices');

module.exports = function (client, message, replyToken){
  return replyServices(
      client, 
      replyToken, 
      message.type, 
      setReplyTextFomat(message.text)
    );
}

function setReplyTextFomat(textMsgs) {
    textMsgs = Array.isArray(textMsgs) ? textMsgs : [textMsgs];
    return textMsgs.map((text) => ({type: 'text', text: getCharacterInfo(text)}));
}

function getCharacterInfo(textMsgs) {
  let character = characterInfo.find(characterData => {
    if (compareStringIgnoreCase(characterData.Name, textMsgs)) {
      return characterData;
    }
  });
  if (character === undefined) {
    character = "Not found this character please try another character";
  return character;
  } else {
  return character.Name + '\n' + character.Type + '\n' + character.Info;
  }
}


function compareStringIgnoreCase(str1, str2) {
  let equal = false;
  if (str1.toLowerCase() == str2.toLowerCase()) {
    equal = true;
  }
  return equal;
}