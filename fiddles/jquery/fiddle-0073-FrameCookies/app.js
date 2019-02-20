(function (app, $, undefined) {
    "use strict";

  // region cookies
  window.app.cookies = window.app.cookies || {

    content: null,
    name: 'fiddle-0073',
    path: '/',

    init: function () {
      if (this.exists()) {
        this.read();
        this.delete();
      }
    },

    delete: function () {
      this.write('', -1, );
    },

    exists: function () {
      return !(this.parseCookie(this.name) === null);
    },

    read: function () {
      if (this.exists()) {
        this.content = this.parseCookie(this.name);
        console.log('content=' + this.content);
      }
    },

    write: function (value, days = 1) {
      const expires = new Date(Date.now() + days * 864e5).toUTCString();
      window.top.document.cookie = this.name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=' + this.path;
    },

    parseCookie: function (name) {
      return window.top.document.cookie.split('; ').reduce((r, v) => {
        console.log('r=' + r);
        console.log('v=' + v);
        const parts = v.split('=');
        console.log('parts = ' + parts.toString());
        return parts[0] === name ? decodeURIComponent(parts[1]) : r
      }, '');
    }

  };
  // endregion

  // region config

  window.app.config = window.app.config || {

    parameters: null,

    read: function(hash) {
      console.log('read');
      console.log('hash = ' + hash);
      if (hash) {
        this.parameters = {};
        let paramSplit = [];
        try {
          paramSplit = decodeURIComponent(hash).split('&');
        } catch (e) {
          throw new Error(e);
        }
        console.log('paramSplit = ' + paramSplit.toString());

        paramSplit.forEach((pair) => {
          let pairSplit = pair.split('=');
          console.log(pairSplit.toString());
          if (pairSplit && pairSplit.length > 1) {
            try {
              let value = pairSplit[1].indexOf('}')!== -1 || pairSplit[1].indexOf('[')!== -1 ? JSON.parse(pairSplit[1]) : pairSplit[1];
              if (value.constructor === Array) {
                value.forEach((item, index) => {
                  value[index] = decodeURIComponent(value[index]);
                });
              } else {
                value = decodeURIComponent(value);
              }
              if (value === 'true') {
                value = true;
              } else if (value === 'false') {
                value = false;
              }
              this.parameters[pairSplit[0]] = value;
            } catch (e) {
              console.log(e);
              this.parameters[pairSplit[0]] = null;
            }
          }
        });
      }
      console.log(JSON.stringify(this.parameters));
    },

    readFromCookie: function() {
      if(window.app.cookies.content) {
        this.parameters = JSON.parse(window.app.cookies.content);
      }
    },

    readFromQuery: function() {
      let pathSplit = window.location.search ? window.location.search.split('?') : null,
        hash = pathSplit && pathSplit.length > 1 ? pathSplit[1] : null;

      console.log(window.location.search);
      console.log(hash);

      this.read(hash);

    },

  };

  // endregion

  // region view

  window.app.view = window.app.view || {
    render: function (hook) {
      if (app.config.parameters) {
        hook.append(JSON.stringify(app.config.parameters));
      } else {
        hook.append('NO COOKIES!!!');
      }
    },
    onCreateClick: function () {
      let valueInput = document.getElementById('cookieValue'),
        cookieValue = valueInput ? valueInput.value : null,
        baseUrl = window.top.location.origin + window.app.cookies.path,
        baseQuery = '?val=',
        url = null,
        query = null;

      if (cookieValue) {
        query = baseQuery + encodeURIComponent(cookieValue);
        url = baseUrl + query;
      }
      window.location = url;
    },
    init: function () {
      let hook = $('#fiddleHook');
      this.render(hook);
    },
    frameRedirect: function() {
      window.setTimeout(() => {
        window.top.location.assign(window.top.location.origin + window.app.cookies.path);
      }, 1000);
    },
    isTop: function () {
      return window.self === window.top;
    },
    isQuery: function () {
      return window.location.search ? true : false;
    }
  };

  // endregion


  $(document).ready(function () {
    // is Top and is Query
    if(window.app.view.isQuery()) {
      // get parameters
      window.app.config.readFromQuery();
      // create cookie
      window.app.cookies.write(JSON.stringify(window.app.config.parameters), 1);
      // redirect to frame
      window.app.view.frameRedirect();
    } else {
      console.log(window.top.document.cookie);
      window.app.cookies.init();
      window.app.config.readFromCookie();
      window.app.view.init();
    }
  });
})(window.app = window.app || {}, jQuery);
