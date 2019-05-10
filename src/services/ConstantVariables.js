const MESSAGE_TYPES = ['text', 'sticker', 'image', 'video', 'audio', 'location']

const UNSUPPORTED_MESSAGE = [
    {
        type : 'text',
        text : 'ขออภัยบอทของเราไม่รองรับข้อความประเภทนี้'
    },
    {
        type : 'sticker',
        packageId : '11537',
        stickerId : '52002770'
    },
    {
        type : 'text',
        text : 'กรุณาพิมพ์เป็นข้อความนะครับ :)'
    }
]
const JOIN_GROUP_MESSAGE = "ขอบคุุณที่เพิ่ม MCUWiki เข้ามาในกลุ่มของคุณ มาเริ่มใช้งาน MCUWiki กันเถอะ."
const NOT_FOUND_CHARACTER_MESSAGE = "ไม่พบตัวละครนี้, กรุณาลองพิมพ์ชื่อตัวละครใหม่อีกครั้งหนึ่ง."
const HOW_TO_USE_MESSAGE = "วิธีการใช้งาน Bot MCUWiki\nเพียงพิมพ์ชื่อตัวละครที่คุณสนใจเป็นภาษาอังกฤษ\nจากน้ันพิมพ์ตัวเลขตามหัวข้อที่คุณต้องการ ง่ายๆเพียงเท่านี้"

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