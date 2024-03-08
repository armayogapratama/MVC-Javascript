// code here for class release 0

class Bank {
  constructor(id, name, type, limit, customers = []) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.limit = limit;
    this.customers = customers;
  }
}

class LocalBank extends Bank {
  constructor(id, name, customers) {
    super(id, name, "LocalBank", 3, customers);
  }
}

class NationalBank extends Bank {
  constructor(id, name, customers) {
    super(id, name, "NationalBank", 5, customers);
  }
}

class Customers {
  #ktp;
  #depositAmount;
  constructor(name, ktp, depositAmount) {
    this.name = name;
    this.#ktp = ktp;
    this.#depositAmount = depositAmount;
  }

  depositRupiahFormat() {
    return this.#depositAmount.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  }

  get ktp() {
    return this.#ktp;
  }

  set ktp(value) {
    this.#ktp = value;
  }

  get depositAmount() {
    return this.#depositAmount;
  }

  set depositAmount(value) {
    this.#depositAmount = value;
  }

  addInterest() {
    this.#depositAmount += 0.1 * this.#depositAmount;
  }
}

class FactoryBank {
  static createBank(id, name, type, customers) {
    const instance = this.createBulkCustomers(customers);
    if (type === "LocalBank") {
      return new LocalBank(id, name, instance);
    }
    if (type === "NationalBank") {
      return new NationalBank(id, name, instance);
    }
  }

  static createBulkBank(banks) {
    return banks.map((bank) => {
      const { id, name, type, customers } = bank;
      return this.createBank(id, name, type, customers);
    });
  }

  static createCustomer(name, ktp, depositAmount) {
    return new Customers(name, ktp, depositAmount);
  }

  static createBulkCustomers(customers) {
    return customers.map((customer) => {
      const { name, ktp, depositAmount } = customer;
      return this.createCustomer(name, ktp, depositAmount);
    });
  }
}

const banks = [
  {
    id: 1,
    name: "Bank Banten",
    type: "LocalBank",
    customers: [
      {
        name: "John",
        ktp: "123456789",
        depositAmount: 15000,
      },
      {
        name: "Jane",
        ktp: "012345678",
        depositAmount: 30000,
      },
    ],
  },
  {
    id: 2,
    name: "Bank BCA",
    type: "NationalBank",
    customers: [
      {
        name: "Johnny",
        ktp: "323456789",
        depositAmount: 50000,
      },
      {
        name: "Jennie",
        ktp: "512345678",
        depositAmount: 40000,
      },
      {
        name: "Jake",
        ktp: "612345678",
        depositAmount: 5000000,
      },
    ],
  },
];

// const { id, name, type, customers } = banks[0];
// const data = FactoryBank.createBulkBank(banks);
// console.log(data);

module.exports = FactoryBank;
