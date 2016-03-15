function demo(title, description, url) {
  if(!url) {
    url = './autocomplete.js';
  }
  document.title = title;
  $('#titleheader').append(title);
  
  $('#description').append(description);
  
  Rx.Observable
    .fromPromise($.ajax({
      url: url,
      dataType: 'text'
    }).promise())
    .subscribe(function(data) {
      $('#source').text(data);
    }, function(e) {
      console.error(e);
    });
};

// http://codepen.io/gabrieleromanato/pen/Jgoab
function randomId() {
	this.length = 8;
	this.timestamp = +new Date;
	var _getRandomInt = function( min, max ) {
		return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
	}
		 
	this.generate = function() {
		var ts = this.timestamp.toString();
		var parts = ts.split( "" ).reverse();
		var id = "";
		
		for( var i = 0; i < this.length; ++i ) {
			var index = _getRandomInt( 0, parts.length - 1 );
			id += parts[index];	 
		}
		
		return id;
	}
}
