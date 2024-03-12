// Uncomment the code below and write your tests
import { BankAccount, getBankAccount, InsufficientFundsError,TransferFailedError, SynchronizationFailedError } from '.';
let balance = 100
const bankAccount: BankAccount = getBankAccount(balance)
const secondBankAccount: BankAccount = getBankAccount(balance)

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    // Write your test here
    expect(bankAccount.getBalance()).toBe(balance)
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    // Write your test here
    expect(() => bankAccount.withdraw(110)).toThrow(InsufficientFundsError)
  });

  test('should throw error when transferring more than balance', () => {
    // Write your test here
    expect(() => bankAccount.transfer(110,bankAccount)).toThrow(TransferFailedError)
  });
  

  test('should throw error when transferring to the same account', () => {
    // Write your test here
    expect(() => bankAccount.transfer(50,bankAccount)).toThrow(TransferFailedError)
  });

  test('should deposit money', () => {
    // Write your test here
    let balanceBefore = bankAccount.getBalance()
    expect(bankAccount.deposit(50).getBalance()).toBe(balanceBefore+50)
  });

  test('should withdraw money', () => {
    // Write your test here
    let balanceBefore = bankAccount.getBalance()
    expect(bankAccount.withdraw(50).getBalance()).toBe(balanceBefore - 50)
  });

  test('should transfer money', () => {
    // Write your test here
    let transferAmount = 20
    let balanceBeforeTransfer = bankAccount.getBalance()
    let secondBankBalanceBeforeTransfer = secondBankAccount.getBalance()
    expect(bankAccount.transfer(transferAmount,secondBankAccount).getBalance()).toBe(balanceBeforeTransfer - transferAmount)
    expect(secondBankAccount.getBalance()).toBe(secondBankBalanceBeforeTransfer + transferAmount)
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
    await expect(bankAccount.fetchBalance()).resolves.toBeLessThanOrEqual(100)
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
      jest
        .spyOn(bankAccount, 'fetchBalance')
        .mockResolvedValueOnce(50)

      await bankAccount.synchronizeBalance()
      expect(bankAccount.getBalance()).toBe(50)
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
    jest
      .spyOn(bankAccount,'fetchBalance')
      .mockResolvedValueOnce(null)
      await expect(bankAccount.synchronizeBalance()).rejects.toThrow(SynchronizationFailedError)
  });
});
