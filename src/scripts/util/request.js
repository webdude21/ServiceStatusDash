module.exports = function request(url) {
  var core = {
    ajax: function (method, args) {
      return new Promise(function (resolve, reject) {
        var client = new XMLHttpRequest();
        var uri = url;

        if (args && (method === 'POST' || method === 'PUT')) {
          uri += '?';
          var argumentsCount = 0;
          for (var key in args) {
            if (args.hasOwnProperty(key)) {
              if (argumentsCount++) {
                uri += '&';
              }
              uri += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
            }
          }
        }

        client.open(method, uri);
        client.send();
        client.onload = function () {
          if (this.status >= 200 && this.status < 300) {
            resolve(this.response);
          } else {
            reject(this.statusText);
          }
        };
        client.onerror = function () {
          reject(this.statusText);
        };
      });
    }
  };

  return {
    'get': function (args) {
      return core.ajax('GET', args);
    },
    'post': function (args) {
      return core.ajax('POST', args);
    },
    'put': function (args) {
      return core.ajax('PUT', args);
    },
    'delete': function (args) {
      return core.ajax('DELETE', args);
    }
  };
};
