(function (global, $, Rx) {

  function now() {
    return new Date().getTime();
  };

  // Taken from SinonJS
  function throttle(callback, interval) {
    var timer;
    return function () {
        clearTimeout(timer);
        var args = [].slice.call(arguments);
        timer = setTimeout(function () {
            callback.apply(this, args);
        }, interval);
    };
  }

  function main() {
    demo('05-throttle', 'Throttle queries to prevent useless queries.');
    
    var $input = $('#searchbox');
    var $results = $('#results');

    var latest = 0;

    var search = function(ts, query) {
      if (query.length < 2) {
        return;
      }

      $.ajax({
        url: 'http://localhost:8000/s',
        data: {
          search: query
        }
      }).done(function(json) {
        if(ts > latest) {
          latest = ts
        } else {
          return;
        }
        
        if(json.constructor === Array) {
          $results.empty();
          json.forEach(function(item) {
            $results.append($('<li>').text(item));
          });
        } else {
          console.error('Not an array: ' + json);
        }
      });
    };

    var f = function(event) {
      search(event.timeStamp, $input.val());
      event.preventDefault;
    };
    
    $('#searcher').on('keyup', throttle(f, 1000));
  }

  $(main);
  
}(window, jQuery, Rx));
