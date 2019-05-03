var replyServices = require('./ReplyServices');

module.exports = function (client, message, replyToken){
    return replyServices(
        client, 
        replyToken, 
        message.type, 
        setReplyStickerFomat()
    );
}

function setReplyStickerFomat() {
    let sticker = randomSticker();
    return {
        'type': 'sticker',
        'packageId': sticker[0],
        'stickerId': sticker[1]
    }
}

//use ramdom algorithm from https://www.w3schools.com/js/js_random.asp
function randomSticker() {
    let packageId = Math.floor(Math.random() * (11539 - 11537 + 1)) + 11537;
    let stickerId;
    switch (packageId) {
        case 11537:
            stickerId = Math.floor(Math.random() * (52002779 - 52002734 + 1)) + 52002734;
            return [packageId, stickerId];
        case 11538:
            stickerId = Math.floor(Math.random() * (51626533 - 51626494 + 1)) + 51626494;
            return [packageId, stickerId];
        case 11539:
            stickerId = Math.floor(Math.random() * (52114149 - 52114110 + 1)) + 52114110;
            return [packageId, stickerId];
        default:
            throw new Error("Function randomSticker is failed !!");
    }
}