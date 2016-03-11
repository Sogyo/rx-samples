(function (global, $, Rx) {
  
  function search(term) {
    return Rx.Observable
      .fromPromise($.ajax({
        url: 'http://localhost:8000/s',
        data: {
          search: term
        }
      }).promise());
  }

  function main() {
    demo('06-rx', 'A complete Rx example');
    
    var $input = $('#searchbox');
    var $results = $('#results');

    // Get all distinct key up events from the input and only fire if long enough and distinct
    var keyup = Rx.Observable
        .fromEvent($input, 'keyup')
        .map(function (e) {
          return e.target.value; // Project the text from the input
        })
        .filter(function (text) {
          return text.length >= 2;
        })
        .debounce(250)
        .distinctUntilChanged(); // Only if the value has changed

    keyup
      .flatMapLatest(search)
      .doOnNext(function() {
        $results.empty();
      })
      .flatMap(function(words) {
        return words;
      })
      .subscribe(
        function (word) {
          $results.append($('<li>').text(word));
        },
        function (error) {
          console.error(error);
        });
  }

  $(main);
}(window, jQuery, Rx));
