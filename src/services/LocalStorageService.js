export default {
    get: function(key) {
      return Promise.resolve(JSON.parse(sessionStorage.getItem(key)));
    },
    set: function(key, data) {
      sessionStorage.setItem(key, JSON.stringify(data));
      return Promise.resolve(data);
    },
    delete: function(key) {
      sessionStorage.removeItem(key);
      return Promise.resolve('Deleted');
    },
  };