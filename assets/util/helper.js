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
