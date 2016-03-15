(function (global, $, Rx, bank) {
  demo('Bank account demo', 'Simple transactions.', 'transactions.js');

  var $overview = $("#overview");
  var $selector = $("#selector");

  var selected = Rx.Observable
      .fromEvent($selector, 'change')
      .map(function(evt) {
        return $(evt.target).val();
      })
      .map(function(x) {
        return parseInt(x);
      })
      .startWith(0)
      .do(function(x) {
        $overview.empty();
      });

  var selected_txs = selected
      .map(function(id) {
        return bank.transactionsByAccountNumber(id);
      })
      .switch()
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
