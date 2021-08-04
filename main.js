'use strict'

class bankAccount {
    accountNumber;
    owner;
    transactions;


    constructor(iAccountNumber, iOwner) {
        this.accountNumber = iAccountNumber;
        this.owner = iOwner;
        this.transactions = [];
    }
    balance() {
        let sum = [];
        for (let i = 0; i < this.transactions.length; i++) {
            sum = this.transactions[i].amount;
        }
        return sum;
    }

    charge(payee, amt) {

        let currentBalance = this.balance();
        if (amt <= currentBalance) {
            // do nothing 
        } else {
            let chargeTransaction = new Transaction(-1 * amt, payee);
            this.transactions.push(chargeTransaction);
            
        }
    }

    deposit(amt) {
        if (amt < 0) {
            return;
        }
        let depositTransaction = new Transaction(amt, this.owner);
        this.transactions.push(depositTransaction);
    }

}



class Transaction {
    date;
    amount;
    payee;


    constructor(iAmount, iPayee) {
        this.amount = iAmount;
        this.payee = iPayee;
        this.date = new Date();
    }
}

module.exports = {bankAccount, Transaction};



    
    




