import { observable } from "mobx";

function isJSON(x) {
  try {
    JSON.parse(x);
    return true;
  } catch (parseException) {
    return false;
  }
}

class Storage {
  constructor() {
    this.inMemoryStore = observable.map();
  }

  set(key, value) {
    const finalValue =
      typeof value === "object" ? JSON.stringify(value) : value;
    window.localStorage.setItem(key, finalValue);
    this.inMemoryStore.set(key, value);
    return this;
  }

  get(key) {
    if (this.inMemoryStore.has(key)) {
      return this.inMemoryStore.get(key);
    } else {
      const value = window.localStorage.getItem(key);
      return isJSON(value) ? JSON.parse(value) : value;
    }
  }

  has(key) {
    return (
      this.inMemoryStore.has(key) ||
      window.localStorage.getItem(key) !== undefined
    );
  }

  delete(key) {
    window.localStorage.removeItem(key);
    this.inMemoryStore.delete(key);
    return this;
  }
}

export default Storage;
