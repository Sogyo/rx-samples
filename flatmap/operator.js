(function (Rx) {
  demo('flatMap', 'A flatMap example.', 'operator.js');
  
  var output = document.querySelector('#output');

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
