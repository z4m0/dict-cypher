const expect = require('chai').expect
const rewire = require('rewire')
const _ = require('lodash')
const fs = require('fs')

const index = rewire('../index.js')
const encryptKeyValue = index.__get__('encryptKeyValue')
const decryptEntry = index.__get__('decryptEntry')
const encryptDict = require('..').encryptDict
const decryptDictEntry = require('..').decryptDictEntry


describe('encrypt/decrypt entry', () => {
  it('should return a new key-value pair for the dict', () => {
    dict = _.zipObject(..._.zip(encryptKeyValue('bla', JSON.stringify([1,2,3]))))
    expect(dict).to.deep.equal({ '5794b977': 'tmqBDIcNWkJFyz1ilaC1vA==' })
    expect(JSON.parse(decryptEntry(dict, 'bla'))).to.deep.equal([1,2,3])
  })
})

describe('encryptDict', () => {
  it('should encrypt dict in file', () => {
    const ec = encryptDict(JSON.parse(fs.readFileSync('test/fixtures/testDict.json')))
    expect(ec).to.deep.equal(JSON.parse(fs.readFileSync('test/fixtures/testEncrDict.json')))
  })
})

describe('decryptDictEntry', () => {
  it('should decryptDictEntry a dict entry', () => {
    const de = decryptDictEntry(JSON.parse(fs.readFileSync('test/fixtures/testEncrDict.json')), 'key2')
    expect(de).to.deep.equal(['v4','v5', 'v6'])
  })

  it('should decryptDictEntry a dict entry and not find it', () => {
    expect(() => {
      decryptDictEntry(JSON.parse(fs.readFileSync('test/fixtures/testEncrDict.json')), 'fake_key')
    }).to.throw('Key not found.')
  })
})
