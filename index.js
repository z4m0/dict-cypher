const crypto = require('crypto')
const _ = require('lodash')

HASHING = 'sha512'
CIPHER = 'AES-256-CBC'
ITERATIONS = 1714
DERIVED_KEY_LENGTH = 300
KEY_SIZE = 4  // bytes
KEY_ENCODING = 'hex'
VALUE_ENCODING = 'base64'
crypto.DEFAULT_ENCODING = VALUE_ENCODING

function encryptKeyValue(key, value, salt=''){
  const derivedKey = crypto.pbkdf2Sync(key, salt, ITERATIONS, // TODO change salt
                                       DERIVED_KEY_LENGTH, HASHING)
  const dictKey = Buffer.from(derivedKey, VALUE_ENCODING).slice(0,KEY_SIZE).toString(KEY_ENCODING)
  const cipher = crypto.createCipher(CIPHER, Buffer.from(derivedKey, VALUE_ENCODING))
  let encrypted = cipher.update(value, 'utf8', crypto.DEFAULT_ENCODING)
  encrypted += cipher.final(crypto.DEFAULT_ENCODING)
  return [dictKey, encrypted]
}

function decryptEntry(dict, key, salt=''){
  const derivedKey = crypto.pbkdf2Sync(key, salt, ITERATIONS, // TODO change salt
                                       DERIVED_KEY_LENGTH, HASHING)
  const dictKey = Buffer.from(derivedKey, VALUE_ENCODING).slice(0,KEY_SIZE).toString(KEY_ENCODING)
  const decipher = crypto.createDecipher(CIPHER, Buffer.from(derivedKey, VALUE_ENCODING))
  if(!dict[dictKey]) throw new Error('Key not found.')
  let dec = decipher.update(dict[dictKey], VALUE_ENCODING,'utf8')
  dec += decipher.final('utf8')
  return dec
}

function encryptDict(input, numGarbageEntries=0){
  let dict = input
  let lastSize = 0
  const encryptedDict = {}
  _.forEach(dict, (v, k) => {
    const sv = JSON.stringify(v)
    lastSize = sv.length
    const [ek, ev] = encryptKeyValue(k, sv)
    encryptedDict[ek] = ev
  })
  const gibDict = generateRandomEncryptedDict(numGarbageEntries, KEY_SIZE, lastSize)
  return Object.assign({}, gibDict, encryptedDict)
}

function decryptDictEntry(input, key){
  let dict = input
  return  JSON.parse(decryptEntry(dict, key))
}

function generateRandomEncryptedDict(num, keyLen, valueLen){
  const dict = {}
  _.forEach(_.range(num), () => {
    const key = crypto.randomBytes(keyLen).toString(KEY_ENCODING)
    const value = crypto.randomBytes(valueLen).toString(VALUE_ENCODING)
    const [ek, ev] = encryptKeyValue(key, value)
    dict[ek] = ev
  })
  return dict
}

module.exports = {
  encryptDict,
  decryptDictEntry
}
