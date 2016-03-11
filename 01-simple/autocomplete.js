(function (global, $, Rx) {
  
  function main() {
    demo('01-simple', 'A simple callback-based searchbox');
    
    var $input = $('#searchbox');
    var $results = $('#results');

    var search = function() {
      var xhr = new XMLHttpRequest();
      
      xhr.open('GET', 'http://localhost:8000/s?search=' + $input.val());
      xhr.onload  = function() {
        if(xhr.status !== 200) {
          console.error('error: ' + xhr.status);
        } else {
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

    $('#searcher').on('submit', function(event) {
      event.preventDefault();
      search();
    });
  }

  $(main);
}(window, jQuery, Rx));
