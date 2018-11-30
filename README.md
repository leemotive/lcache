# LCache
a cache library

## install
```
$ npm install lcache
```
or
```
$ yarn add lcache
```

## usage
### new instance 
```
  import LCache from 'lcache';
  var lcache = new LCache(100);
```
or
```
const LCache = require('lcache').default;
```

### put a new entry
`lcache.put('key', value);`  
if the size is over the limit, return the head

### get an existed entry
`lcache.get('key');`  
return undefined if the key is not exists

### remove an entry
`lcache.shift('key')`  
remove the specified entry or the head if key is undefined
