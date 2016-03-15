(function ($, Rx) {
  demo('Combined', 'A demo with combined operators.', 'operator.js');
  
  var library = [
    {
      "genre": "Thriller",
      "movies": [
        {
          "title": "Silence of the lambs",
          "rating": 7.5,
        },
        {
          "title": "Blade Runner",
          "rating": 6
        }
      ]
    }, {
      "genre": "Comedy",
      "movies": [
        {
          "title": "The Hangover",
          "rating": 7,
        },
        {
          "title": "The Blues Brothers",
          "rating": 8
        }
      ]
    }, {
      "genre": "Fantasy",
      "movies": [
        {
          "title": "Stardust",
          "rating": 8,
        },
        {
          "title": "Twilight",
          "rating": 4
        }
      ]
    }
  ];
    
  var $results = $('#output');

  Rx.Observable
    .fromArray(library)
    .flatMap(function(section) {
      return section.movies;
    })
    .filter(function(movie) {
      return movie.rating >= 8;
    })
    .map(function(movie) {
      return movie.title;
    })
    .subscribe(
      function(title) {
        $results.append($('<li>').text(title));
      },
      function(err) {
        console.error(err);
      },
      function() {
        console.log('The end');
      }
    );
}(jQuery, Rx));
