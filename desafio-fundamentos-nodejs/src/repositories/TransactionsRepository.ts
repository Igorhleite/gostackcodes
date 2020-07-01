import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balanceTransactions = this.transactions.reduce(
      (accumulator: Balance, currentValue: Transaction) => {
        if (currentValue.type === 'income') {
          accumulator.income += Number(currentValue.value);
        } else if (currentValue.type === 'outcome') {
          accumulator.outcome += Number(currentValue.value);
        }
        accumulator.total = accumulator.income - accumulator.outcome;

        return accumulator;
      },
      { income: 0, outcome: 0, total: 0 },
    );
    return balanceTransactions;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;

/*
public all(): Transaction[] {
  // TODO
}

public getBalance(): Balance {
  // TODO
} */
