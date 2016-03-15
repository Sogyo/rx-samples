(function ($, Rx) {
  demo('Filter', 'A filter example.', 'operator.js');

  var movies = [
    {
      name: "The Godfather",
      rating: 9,
    },
    {
      name: "The Italian Job",
      rating: 7,
    },
    {
      name: "Pulp Fiction",
      rating: 8,
    },
    {
      name: "Terminator",
      rating: 6,
    }
  ];
  
  var $results = $('#output');

  Rx.Observable
    .fromArray(movies)
    .filter(function(movie) {
      return movie.rating >= 8;
    })
    .subscribe(
      function(movie) {
        $results.append($('<li>').text(JSON.stringify(movie)));
      },
      function(err) {
        console.error(err);
      },
      function() {
        console.log('The end');
      }
    );
}(jQuery, Rx));
