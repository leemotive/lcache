;(function (global, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(factory);
    } else {
        global.lCache = factory();
    }
})(typeof window !== 'undefined' ? window : this, function () {
    function LCache (limit) {
        this.limit = limit;
        this.size = 0;
        this.head = this.tail = undefined;
        this.map = {};
    }

    (function () {
        this.put = function(key, value) {
            var shifted;
            var entry = this.get(key, true);
            if (!entry) {
                if (this.size === this.limit) {
                    shifted = this.shift();
                }
                entry = {
                    'key': key
                };
                if (this.head) {
                    entry.older = this.tail;
                    this.tail.newer = entry;
                } else {
                    this.head = entry;
                }
                this.tail = this.map[key] = entry;
                this.size++;
            }
            entry.value = value;
            return shifted;
        };
        this.get = function (key, _returnObject) {
            var entry = this.map[key];
            if (entry && entry != this.tail) {
                if (entry.older) {
                    entry.older.newer = entry.newer;
                } else {
                    this.head = entry.newer;
                }
                entry.newer.older = entry.older;

                entry.older = this.tail;
                this.tail.newer = entry;
                entry.newer = undefined;
                this.tail = entry;
            }
            return _returnObject ? entry : entry && entry.value;
        };
        this.shift = function (key) {
            var entry = key != null ? this.get(key, true) : this.head;
            if (entry) {
                if (entry.newer) {
                    this.head = entry.newer;
                    entry.newer = this.head.older = undefined;
                } else if (entry.older) {
                    this.tail = entry.older;
                    entry.older = this.tail.newer = undefined;
                } else {
                    this.head = this.tail = undefined;
                }
                this.size--;
                delete this.map[entry.key];
            }
            return entry;
        };
    }).call(LCache.prototype); 

    return {
        newInstance: function (num) {
            return new LCache(num);
        }
    }
}); 