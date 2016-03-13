(function (global, $, Rx) {
  var output = document.querySelector('#output');

  demo('Timer stream', 'A stream of timer events.', 'timerstream.js');

  Rx.Observable
      .timer(0, 150)
      .timeInterval()
      .subscribe(
          function(next) {
            output.innerHTML = "Timer: " + JSON.stringify(next);
          },
          function(error) {
            console.error(error);
          }
      );
}(window, jQuery, Rx));
