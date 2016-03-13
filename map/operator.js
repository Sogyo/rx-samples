(function (Rx) {
  var output = document.querySelector('#output');

  var mouseLogger = function(loc) {
    console.log(loc);
  };

  demo('Map', 'A map example.', 'operator.js');

  Rx.Observable
    .fromArray([1, 2, 3, 4, 5])
    .map(function(n) {
      return n*n;
    })
    .toArray()
    .subscribe(
      function(loc) {
        output.innerHTML = "Location: " + JSON.stringify(loc);
      },
      function(err) {
        console.error(err);
      }
    );
}(Rx));
