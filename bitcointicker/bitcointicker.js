(function (global, $, Rx) {
  var url = "https://api.bitcoinaverage.com/ticker/EUR/";
  
  var output = document.querySelector('#output');
  var update = document.querySelector('#update');

  function getTickerValue(url) {
    return Rx.Observable
      .fromPromise($.ajax({
        url: url,
        dataType: 'json',
        data: {
          format: 'json'
        }
      }).promise())
  };

  demo('Bitcoin exchange rate ticker', 'Bitcoin <-> EUR exchange rates..', 'bitcointicker.js');

  Rx.Observable
    .interval(2500 /* ms */)
    .startWith(Rx.Observable.just(-1))
    .flatMap(function(interval) {
      return Rx.Observable
        .just(url)
        .flatMapLatest(function(url) {
          return getTickerValue(url);
        });
    })
    .distinctUntilChanged()
    .do(function(quote) {
      console.log("Updating ticker at " + new Date());
    })
    .subscribe(
      function(quote) {
        output.innerHTML = "Ticker value: " + JSON.stringify(quote);
        update.innerHTML = "Last updated at " + new Date();
      },
      function(err) {
        console.error(err);
      }
    );
}(window, jQuery, Rx));
