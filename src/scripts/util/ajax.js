const CONNECTION_ERROR_MESSAGE = 'Cannot connect to the provided address';

module.exports = function request(url) {
  let core = {
    ajax: function (method, args) {
      return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest(),
          uri = url;

        if (args && (method === 'POST' || method === 'PUT')) {
          uri += '?';

          Object.keys(args).forEach((key, index) => {
            if (index) {
              uri += '&';
            }
            uri += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
          });
        }

        xhr.open(method, uri);
        xhr.send();
        xhr.onload = function () {
          if (this.status >= 200 && this.status < 300) {
            resolve(this.response);
          } else {
            reject(this.statusText);
          }
        };
        xhr.onerror = function () {
          reject(this.statusText || CONNECTION_ERROR_MESSAGE);
        };
      });
    }
  };

  return {
    'get': args => core.ajax('GET', args),
    'post': args => core.ajax('POST', args),
    'put': args => core.ajax('PUT', args),
    'delete': args => core.ajax('DELETE', args)
  };
};
