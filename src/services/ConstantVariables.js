const MESSAGE_TYPES = ['text', 'sticker', 'image', 'video', 'audio', 'location']

const UNSUPPORTED_MESSAGE = [
    {
        type : 'text',
        text : 'Your message type isn\'t support in this chatbot.'
    },
    {
        type : 'sticker',
        packageId : '11537',
        stickerId : '52002770'
    },
    {
        type : 'text',
        text : 'Please try another message.'
    }
]
const JOIN_GROUP_MESSAGE = "Thank you for add MCUWiki to your group."
const NOT_FOUND_CHARACTER_MESSAGE = "Not found this character, Please try another character."
const HOW_TO_USE_MESSAGE = "To use me\n Please, typing your interest character name\nThen choose title that you want to know about that character"

const STICKER_PACKAGE_1 = 11537
const STICKER_PACKAGE_2 = 11538
const STICKER_PACKAGE_3 = 11539
const MIN_STICKER_ID_1 = 52002734
const MIN_STICKER_ID_2 = 51626494
const MIN_STICKER_ID_3 = 52114110
const MAX_STICKER_ID_1 = 52002779
const MAX_STICKER_ID_2 = 51626533
const MAX_STICKER_ID_3 = 52114149

module.exports.MESSAGE = {MESSAGE_TYPES, HOW_TO_USE_MESSAGE, JOIN_GROUP_MESSAGE, UNSUPPORTED_MESSAGE, NOT_FOUND_CHARACTER_MESSAGE}
module.exports.STICKER_PACKAGE = {STICKER_PACKAGE_1, STICKER_PACKAGE_2, STICKER_PACKAGE_3}
module.exports.MIN_STICKER_ID = {MIN_STICKER_ID_1, MIN_STICKER_ID_2, MIN_STICKER_ID_3}
module.exports.MAX_STICKER_ID = {MAX_STICKER_ID_1, MAX_STICKER_ID_2, MAX_STICKER_ID_3}