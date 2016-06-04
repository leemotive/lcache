# lcache
a cache library

##usage
####1.get instance
call newInstance to get a cache instance and pass a num as the max size of the cache instance  
`var lcache = lCache.newInstance(100);`

####2.put a new entry
`lcache.put('key', value);`  
if the size is over the limit, return the head

####3.get an existed entry
`lcache.get('key');`  
return undefined if the key is not exists

####4.remove an entry
`lcache.shift('key')`  
remove the specified entry or the head if key is undefined
