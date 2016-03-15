(function (global, Rx) {
  function randomInt(low, high) {
    return Math.random() * (high - low) + low;
  }

  function randomTransaction(from, to) {
    var amount = randomInt(-500, 2500).toFixed(2);
    return new Transaction(from, to, amount, "random");
  }

  // Transaction
  var Transaction = function (from, to, amount, message) {
    this.from = from;
    this.to = to;
    this.amount = amount;
    this.message = message;
    this.timestamp = new Date();
  };

  // Bank
  var Bank = function (name) {
    this.name = name;

    this._transactions = [];
    this._cbs = [];
  };

  Bank.prototype.transactions = function() {
    var that = this;

    return Rx.Observable.create(function(observer) {
      var cb = function(t) {
        if(observer.isStopped) {
          // unregister
          var idx = that._cbs.indexOf(cb);
          if (idx > -1) {
            that._cbs.splice(idx, 1);
          }
          return;
        }
        observer.onNext(t);
      };
      // Register for future updates
      that._cbs.push(cb);
      // propagate existing data
      that._transactions.forEach(function(t) {
        observer.onNext(t);
      });
    }).publish().refCount();
  };

  Bank.prototype.transactionsByAccountNumber = function(id) {
    return this
      .transactions()
      .filter(function(tx) {
        return (tx.to == id) || (tx.from == id);
      });
  };

  Bank.prototype.accounts = function() {
    return this.transactions()
      .flatMap(function(t) {
        return Rx.Observable.fromArray([t.from, t.to]);
      })
      .distinct();
  }

  Bank.prototype.addTransaction = function(from, to, amount, message) {
    var t = new Transaction(from, to, amount, message);
    this._addTransaction(t);    
  }

  Bank.prototype._addTransaction = function(t) {
    this._transactions.push(t);
    this._cbs.forEach(function(cb) {
      cb(t);
    });
    
  }

  var b = new Bank("My awesome bank");

  setTimeout(function() {
    b.addTransaction(0, 1, 500, "A gift");
  }, 10);

  setTimeout(function() {
    b.addTransaction(0, 2, 14, "Groceries");
  }, 150);
  
  setTimeout(function() {
    b.addTransaction(1, 2, 2, "Sandwiches");
  }, 1250);
  
  setTimeout(function() {
    b.addTransaction(2, 0, 25, "Dinner");
  }, 2500);

  setTimeout(function() {
    b.addTransaction(2, 1, 37, "Tickets for the concert");
  }, 3000);

  setTimeout(function() {
    b.addTransaction(1, 2, 75, "Clothing");
  }, 5000);

  setTimeout(function() {
    b.addTransaction(1, 0, 125, "Marktplaats - bought foo");
  }, 7500);

  setTimeout(function() {
    b.addTransaction(0, 3, 15, "A new account");
  }, 10000);

  setTimeout(function() {
    b.addTransaction(3, 0, 5, "Sponsor event");
  }, 12000);

  setTimeout(function() {
    b.addTransaction(3, 0, 5, "Foo bar baz quuk");
  }, 15000);

  
  global.bank = b;
}(window, Rx));
