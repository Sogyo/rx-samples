(function (global, $, Rx, bank) {
  demo('Bank account demo', 'Bank account transactions.', 'transactions.js');

  var $accounts = $('#accounts');
  var $selectedid = $("#selectedid");
  var $selectedbalance = $("#selectedbalance");
  var $overview = $("#overview");

  bank
    .accounts()
    .subscribe(function(account) {
      var $el = $('<li>').text(account);
      $accounts.append($el);
    });

  var selected = Rx.Observable
    .fromEvent($accounts, 'click')
    .map(function(evt) {
      return $(evt.target).text();
    });

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

  var selected_txs = selected
      .do(function(x) {
        console.log('selection changed');
        $overview.empty();
        $selectedid.text(x);
      }).map(function(id) {
        return Rx.Observable.merge(
          bank.transactionsByAccountNumberInc(id).let(txrow('+')),
          bank.transactionsByAccountNumberDec(id).let(txrow('-'))
        )
      })
      .switch()
      .subscribe(function($tr) {
        $overview.append($tr);
      });
  
  var balance_sub = selected
      .flatMap(function(id) {
        return bank.balanceOfAccount(id);
      })
      .subscribe(function(total) {
        $selectedbalance.text(total);
    });

  console.log(bank);

}(window, jQuery, Rx, window.bank));
