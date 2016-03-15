(function (global, $, Rx, bank) {
  demo('Bank account demo', 'Simple transactions.', 'transactions.js');

  var $overview = $("#overview");

  var txrow = function(sign) {
    return function(observable) {
      return observable.map(function(tx) {
        var $tr = $('<tr>');
        $tr.append($('<td>').text(sign));
        $tr.append($('<td>').text(tx.amount));
        $tr.append($('<td>').text(tx.timestamp));
        $tr.append($('<td>').text(tx.to));
        $tr.append($('<td>').text(tx.message));
        return $tr;
      });
    };
  };

  var selected_txs = bank
      .transactions()
      .map(function(tx) {
        var $tr = $('<tr>');
        $tr.append($('<td>').text(''));
        $tr.append($('<td>').text(tx.amount));
        $tr.append($('<td>').text(tx.timestamp));
        $tr.append($('<td>').text(tx.from));
        $tr.append($('<td>').text(tx.to));
        $tr.append($('<td>').text(tx.message));
        return $tr;
      })
      .subscribe(function($tr) {
        $overview.append($tr);
      });
  
  console.log(bank);

}(window, jQuery, Rx, window.bank));
