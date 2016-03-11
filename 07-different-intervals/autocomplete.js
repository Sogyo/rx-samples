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
    demo('07-different-intervals', 'A complete Rx example, but with two merged debounce streams for different intervals between long and short queries.');
    
    var $input = $('#searchbox');
    var $results = $('#results');

    var keyup = Rx.Observable.fromEvent($input, 'keyup')
      .map(function (e) {
        return e.target.value;
      });

    var longstream = keyup
        .filter(function (text) {
          return text.length >= 2;
        })
        .debounce(750);

    var shortstream = keyup
        .filter(function (text) {
          return text.length >= 5;
        })
        .debounce(100);

    var merged = Rx.Observable
        .merge(longstream, shortstream)
        .distinctUntilChanged();

    merged
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
