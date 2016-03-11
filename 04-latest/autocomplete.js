(function (global, $, Rx) {

  function main() {
    demo('04-latest', 'Only show the latest search query, but with $.ajax().');
    
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

    $('#searcher').on('keyup', function(event) {
      search(event.timeStamp, $input.val());
      event.preventDefault;
    });
  }

  $(main);
}(window, jQuery, Rx));
