dict-cypher
===========

A library to encrypt dictionaries with different keys.

Algorithm
---------
To encrypt an entry:
1. Hash the key with pbkdf2.
2. Use the hashed key as password to encrypt the value
with AES.

API
---

***Encrypt***
```javascript
const encrypt = require('dict-cypher').encryptDict
const dict = {
  "key1": ["v1", "v2", "v3"],
  "key2": ["v4", "v5", "v6"],
  "key3": ["v7", "v8", "v9"]
}
encrypt(dict, numGarbageEntries=3)
// { '4d225f1f': 'r7NGeLbLpFsDj0gPUWs3N9v0dt4G4jPx0/eCWfyShqA=',
//   '5890af70': '6GyX4Qm0sq5bl0BemSZKRgH80W1UM3dmHw/hqzA48pM=',
//   '8f89597c': 'WUyepKgvSRZyiY8bSZwZYijqB31r+Pw8mQma70gMJ9o=',
//   '2f7ce7a4': 'RC7YRr9GANU7GWWyobBL6Ft+aDR2kzOJasnBf5/Af/o=',
//   '7fa5bb2f': 'sgjNPuZPfCgYwPGMU2yIMx3kRKck5yIwXoLy5CYx2tY=',
//   ec38a317: 'AG4mFWjCmirBhhhh8QMDoKp3r2HiDWwYIG+K3slWBJE=' }
```

***Decrypt key***

```javascript
const decrypt = require('dict-cypher').decryptDictEntry
const encryptedDict = {
  '4d225f1f': 'r7NGeLbLpFsDj0gPUWs3N9v0dt4G4jPx0/eCWfyShqA=',
  '5890af70': '6GyX4Qm0sq5bl0BemSZKRgH80W1UM3dmHw/hqzA48pM=',
  '8f89597c': 'WUyepKgvSRZyiY8bSZwZYijqB31r+Pw8mQma70gMJ9o=',
  '2f7ce7a4': 'RC7YRr9GANU7GWWyobBL6Ft+aDR2kzOJasnBf5/Af/o=',
  '7fa5bb2f': 'sgjNPuZPfCgYwPGMU2yIMx3kRKck5yIwXoLy5CYx2tY=',
  ec38a317: 'AG4mFWjCmirBhhhh8QMDoKp3r2HiDWwYIG+K3slWBJE='
}
decrypt(encryptedDict, 'key1')
//[ 'v1', 'v2', 'v3' ]
```

browserify
----------
```
browserify -r .:dict-cypher > build/dict-cypher.js
```
