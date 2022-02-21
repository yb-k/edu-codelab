(function () {

  var xhr = function xhr(options) {
    var _default = {
      url: '',
      path: '',
      method: 'POST',
      data: {},
      succ: function(){},
      error: function(){},
    }
    var _options = extend(_default, options);
    var http = new XMLHttpRequest();
    var url = _options.url + _options.path;
    // var params = 'orem=ipsum&name=binny';
    http.open(_options.method, url, true);

    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/json');

    http.onreadystatechange = function () { //Call a function when the state changes.
      if (http.readyState == http.DONE) {
        if (http.status == 200) {
          _options.succ(JSON.parse(http.responseText));
        } else {
          _options.error(http.status, http.responseText);
        }
      } 
    }
    http.send(JSON.stringify(_options.data));
  };

  var extend = function extend(target, obj) {
    for (var prop in obj) {
      if(Object.prototype.hasOwnProperty.call(obj, prop)) {
        if (Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
          extend(target[prop], obj[prop]);
        } else {
          target[prop] = obj[prop];
        }
      }
    }
    return target;
  }

  window.onload = function () {

    var listEl = document.getElementById('todos-ul');

    var getListBtn = document.getElementById('get-list-btn');

    getListBtn.addEventListener('click', function () {
      xhr({
        path: '/todos',
        method: 'GET',
        succ: function (data) {
          listEl.innerHTML = '';
          var bodyData = data || [];
          for(var i = 0; i < bodyData.length; i += 1 ) {
            var liEl = document.createElement('li');
            var todo = bodyData[i]
            if (todo.completed) {
              liEl.setAttribute('class', 'completed');
            }
            liEl.innerHTML = '<span>'+todo.content+'</span>';
            listEl.appendChild(liEl);
          }
        },
        error: function (code, msg) {
          alert(code, msg);
        }
      });
    });
  }

})();