const dictEncr = require('..')
const _ = require('lodash')
const fs = require('fs')
let t1, t2

const dict2 = {}
_.forEach(_.range(25), (k) => {
  dict2['k_'+k] = _.map(_.range(4), (v) => 'v_'+(k*4+v))
})

console.log('Stress test 1, generate 25 random entries.')
t1 = new Date().getTime()
JSON.stringify(dictEncr.encryptDict({}, 25))
t2 = new Date().getTime()
console.log('Execution time:', t2 - t1, 'ms\n')

console.log('Stress test 2, encrypt 25 entries.')
t1 = new Date().getTime()
const encrDict2 = dictEncr.encryptDict(dict2)
t2 = new Date().getTime()
console.log('Execution time:', t2 - t1, 'ms\n')

console.log('Stress test 3, encrypt 25 entries with 25 randomEntries.')
t1 = new Date().getTime()
const encrDict3 = dictEncr.encryptDict(dict2, numGarbageEntries=25)
t2 = new Date().getTime()
console.log('Execution time:', t2 - t1, 'ms\n')

console.log('Stress test 4, decrypt 25 entries from 25 entry dict.')
t1 = new Date().getTime()
_.forEach(_.range(25), (k) => {
   dictEncr.decryptDictEntry(encrDict2, 'k_'+k)
})
t2 = new Date().getTime()
console.log('Execution time:', t2 - t1, 'ms\n')

console.log('Stress test 5, decrypt 25 entries from 50 entry dict.')
t1 = new Date().getTime()
_.forEach(_.range(25), (k) => {
   dictEncr.decryptDictEntry(encrDict3, 'k_'+k)
})
t2 = new Date().getTime()
console.log('Execution time:', t2 - t1, 'ms\n')

console.log('Stress test 6, encrypt 25 entries with 5000 randomEntries. It may take some time...')
t1 = new Date().getTime()
const encrDict4 = dictEncr.encryptDict(dict2, numGarbageEntries=5000)
t2 = new Date().getTime()
console.log('Execution time:', t2 - t1, 'ms\n')
fs.writeFileSync('test/fixtures/large_dict.json', JSON.stringify(encrDict4))
