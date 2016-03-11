function demo(title, description) {
  document.title = title;
  $('#titleheader').append(title);
  
  $('#description').append(description);
  
  Rx.Observable
    .fromPromise($.ajax({
      url: 'autocomplete.js',
      dataType: 'text'
    }).promise())
    .subscribe(function(data) {
      $('#source').text(data);
    }, function(e) {
      console.error(e);
    });
};
