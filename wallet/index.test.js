const Wallet = require("./index");
const TransactionPool = require("./transaction-pool");
const { INITIAL_BALANCE } = require("../config");

describe("Wallet", () => {
  let wallet, tp;

  beforeEach(() => {
    wallet = new Wallet();
    tp = new TransactionPool();
  });

  describe("creating a transaction", () => {
    let transaction, recipient, sendAmount;

    beforeEach(() => {
      sendAmount = INITIAL_BALANCE / 10;
      recipient = "r4nd-4ddr355";
      transaction = wallet.createTransaction(recipient, sendAmount, tp);
    });

    describe("and doing the same transaction", () => {
      beforeEach(() => {
        wallet.createTransaction(recipient, sendAmount, tp);
      });

      it("doubles the `sendAmount` subtracted from the wallet balance", () => {
        expect(
          transaction.outputs.find(
            (output) => output.address === wallet.publicKey
          ).amount
        ).toEqual(wallet.balance - sendAmount * 2);
      });

      it("clones the `sendAmount` output for the recipient", () => {
        expect(
          transaction.outputs
            .filter((output) => output.address === recipient)
            .map((output) => output.amount)
        ).toEqual([sendAmount, sendAmount]);
      });
    });
  });
});