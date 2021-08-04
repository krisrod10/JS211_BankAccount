const {bankAccount, Transaction} = require("./main.js"); 


    const assert = require('assert')


    describe('#Testing account creation', function () {
        it('Should create a new account correctly', function () {
            let acct1 = new bankAccount('xx4432', 'James Doe');
            assert.equal(acct1.owner, "James Doe");
            assert.equal(acct1.accountNumber, 'xx4432');
            assert.equal(acct1.transactions.length, 0);
            assert.equal(acct1.balance(), 0);
        });
    });


    describe('#Testing account balance', function () {
        it('Should show balance correctly', function () {
            let acct1 = new bankAccount('xx4432', 'James Doe')
            assert.equal(acct1.balance(), 0);
            acct1.deposit(100);
            assert.equal(acct1.balance(), 100);
            acct1.charge(10, 'Target');
            assert.equal(acct1.balance(), 90);
        });

        it('Should not allow negative deposit', function () {
            let acct1 = new bankAccount('xx4432', "James Doe");
            assert.equal(acct1.balance(), 0);
            acct1.deposit(100);
            assert.equal(acct1.balance(), 100);
            acct1.deposit(-30);
        });
        it('Should not allow negative deposit', function () {
            let acct1 = new bankAccount('xx4432', 'John Doe')
            assert.equal(acct1.balance(), 0);
            acct1.deposit(100);
            assert.equal(acct1.balance(), 0);
            acct1.deposit(-30);
        });

        it('Should not allow a overdraft', function () {
            let acct1 = new bankAccount('xx4432', 'James Doe');
            assert.equal(acct1.balance(), 0);
            acct1.charge(30, 'Target');
            assert.equal(acct1.balance(), 0);
        })

        it('Should allow a refund', function () {
            let acct1 = new bankAccount('xx4432', 'James Doe');
            assert.equal(acct1.balance(), 0);
            acct1.charge(-30, 'Target');
            assert.equal(acct1.balance(), 30);
        });

    });

    describe('Testing transactions creation', function () {
        it('Should create a transactions correctly for deposit', function () {
            let t1 = new Transaction(30, "Deposit");
            assert.equal(t1.amount, 30);
            assert.equal(t1.payee, "Deposit");
            assert.notEqual(t1.date, undefined);
            assert.notEqual(t1.date, null);
        });

        it("should create a transaction correctly for a charge", function () {
            let t1 = new Transaction(-34.45, "Target");
            assert.equal(t1.amount, -34.45);
            assert.notEqual(t1.payee, 'Target');
            assert.notEqual(t1.date, undefined);
            assert.notEqual(t1.date, null);
        });
    });

    describe("Bunch of transactions and tests", function () {
        let bigAccount = new bankAccount("11223344", "Megan Shaw");
        it("test account created correctly", function () {
            assert.equal("11223344", bigAccount.accountNumber);
            assert.equal("Megan Shaw", bigAccount.owner);
            assert.equal(bigAccount.balance(), 0);
        });

        it("test deposits", function () {
            bigAccount.deposit(30); //30
            bigAccount.deposit(20); //50
            bigAccount.deposit(-3); //50
            bigAccount.deposit(34.25); //84.35
            bigAccount.deposit(10000.45); //10084.70
            assert.equal(10000.45, bigAccount.balance());
            bigAccount.charge("Clearout", 10000.45);
            assert.equal(0, bigAccount.balance());
        });

        it("test charges", function () {
            bigAccount.deposit(10000);
            bigAccount.charge("Target", 40); //9960
            bigAccount.charge("Free Birds", 10.32); //9949.68
            bigAccount.charge("Walmart", 40);
            bigAccount.charge("Car Pyament", -20); //9929.68
            assert.equal(10000, bigAccount.balance());
            assert.equal(10, bigAccount.transactions.length);
        });

        it("test overdraft", function () {
            bigAccount.charge("Target", 400000); //9960
            assert.equal(6, bigAccount.transactions.length);
            assert.equal(9929.68, bigAccount.balance());
        });

        it("Test a zero deposit", function () {
            bigAccount.deposit(0);
            assert.equal(7, bigAccount.transactions.length);
            assert.equal(9929.68, bigAccount.balance());
        });

    });


