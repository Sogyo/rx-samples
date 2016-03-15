(function (Rx) {
  demo('Map', 'A map example.', 'operator.js');
  
  var output = document.querySelector('#output');

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
