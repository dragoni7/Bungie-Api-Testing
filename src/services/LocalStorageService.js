export default {
    get: function(key) {
      return Promise.resolve(JSON.parse(window.localStorage.getItem(key)));
    },
    set: function(key, data) {
      window.localStorage.setItem(key, JSON.stringify(data));
      return Promise.resolve(data);
    },
    delete: function(key) {
      window.localStorage.removeItem(key);
      return Promise.resolve('Deleted');
    },
  };