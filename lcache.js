class LCache {
  constructor(limit) {
    this.limit = limit;
    this.size = 0;
    this.head = this.tail = undefined;
    this.map = {};
  }

  put(key, value) {
    let shifted;
    let entry = this.get(key, true);
    if (!entry) {
      if (this.size === this.limit) {
        shifted = this.shift();
      }
      entry = {
        key,
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
  }

  get(key, _returnObject) {
    const entry = this.map[key];
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
  }

  shift(key) {
    const entry = key != null ? this.get(key, true) : this.head;
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
  }
}

export default LCache;
