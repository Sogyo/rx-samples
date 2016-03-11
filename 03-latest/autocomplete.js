(function (global, $, Rx) {

  function main() {
    demo('03-latest', 'Only show the latest search query.');
    
    var $input = $('#searchbox');
    var $results = $('#results');

    var latest = 0;

    var search = function(ts, query) {
      if (query.length < 2) {
        return;
      }
      
      var xhr = new XMLHttpRequest();
      
      xhr.open('GET', 'http://localhost:8000/s?search=' + query);
      xhr.onload  = function(event) {
        if(xhr.status !== 200) {
          console.error('error: ' + xhr.status);
        } else {
          if(ts > latest) {
            latest = ts
          } else {
            return;
          }
          var json = JSON.parse(xhr.responseText);
          if(json.constructor === Array) {
            $results.empty();
            json.forEach(function(item) {
              $results.append($('<li>').text(item));
            });
          } else {
            console.error('Not an array: ' + json);
          }
        }
      };
      xhr.send(null);
    };

    $('#searcher').on('keyup', function(event) {
      search(event.timeStamp, $input.val());
      event.preventDefault;
    });
  }

  $(main);
}(window, jQuery, Rx));
