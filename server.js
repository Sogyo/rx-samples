var express = require('express');
var app = express();
var fs = require('fs');

app.use(express.static('.'));

var wordlist = JSON.parse(fs.readFileSync('./words/wordlist.json', 'utf8'));

function randomInt(low, high) {
    return Math.random() * (high - low) + low;
}

app.get('/s', function (req, res) {
  var exp = "";
  var s = req.query.search;
  if(s) {
    exp = s.toLowerCase();
  }

  var fn = function() {
    res.json(wordlist.filter(function(word) {
      return word.startsWith(exp);
    }));
  }

  // Random delay to simulate network jitter.
  setTimeout(fn, randomInt(5, 1500));
});

app.listen(8000, function () {
  console.log('Listening on :8000');
});
