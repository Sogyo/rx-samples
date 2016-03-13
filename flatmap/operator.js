(function (Rx) {
  var output = document.querySelector('#output');

  var mouseLogger = function(loc) {
    console.log(loc);
  };

  demo('flatMap', 'A flatMap example.', 'operator.js');

  Rx.Observable
    .fromArray([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]])
    .flatMap(function(s) {
      return s;
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
