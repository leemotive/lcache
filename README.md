# LCache
a cache library

## usage
### get instance
call newInstance to get a cache instance and pass a num as the max size of the cache instance  
```
  import LCache from 'lcache';
  var lcache = new LCache(100);
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
