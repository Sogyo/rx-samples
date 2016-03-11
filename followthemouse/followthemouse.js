(function (Rx) {
  var output = document.querySelector('#output');

  var mouseLogger = function(loc) {
    console.log(loc);
  };

  demo('Follow the mouse', 'Your mouse is a database.', 'followthemouse.js');

  Rx.Observable
    .fromEvent(document, 'mousemove')
    .map(function(evt) {
      return {
        x: evt.clientX,
        Y: evt.clientY,
      };
    })
    .do(mouseLogger)
      .subscribe(
        function(loc) {
          output.innerHTML = "Location: " + JSON.stringify(loc);
        },
        function(err) {
          console.error(err);
        }
      );
}(Rx));
