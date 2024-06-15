export default {
    get: function(key) {
      return Promise.resolve(JSON.parse(window.sessionStorage.getItem(key)));
    },
    set: function(key, data) {
      window.sessionStorage.setItem(key, JSON.stringify(data));
      return Promise.resolve(data);
    },
    delete: function(key) {
      window.sessionStorage.removeItem(key);
      return Promise.resolve('Deleted');
    },
  };