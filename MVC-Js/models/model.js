const fs = require("fs");
const Controller = require("../controllers/controller");
const Class = require("./class");
const FactoryBank = require("./class");

class Model {
  // parameter tambahkan sesuai kebutuhan
  static async saveJSON(data) {
    const bank = data.map((bank) => {
      delete bank.limit;
      const customers = bank.customers.map((el) => {
        return {
          name: el.name,
          ktp: el.ktp,
          depositAmount: el.depositAmount,
        };
      });
      return { ...bank, customers };
    });
    const banks = JSON.stringify(bank, null, 2);
    await fs.promises.writeFile("./data.json", banks);
  }
  static async readBank() {
    const banks = await fs.promises.readFile("./data.json", "utf-8");
    const parsedBanks = JSON.parse(banks);
    const bank = FactoryBank.createBulkBank(parsedBanks);
    return bank;
  }

  static async createCustomer(id, name, ktp, depositAmount) {
    const data = await this.readBank();
    const indexBank = data.findIndex((bank) => bank.id === id);
    const newCustomer = FactoryBank.createCustomer(name, ktp, depositAmount);
    if (data[indexBank].customers.length === data[indexBank].limit) {
      throw new Error(`You can't add more Customer to this bank`);
    }
    data[indexBank].customers.push(newCustomer);
    await this.saveJSON(data);
    return newCustomer;
  }
  static async deleteCustomerByKtp(id, ktp) {
    const data = await this.readBank();
    const indexBank = data.findIndex((bank) => bank.id === id);
    const indexCustomer = data[indexBank].customers.findIndex(
      (customer) => customer.ktp === ktp
    );
    if (indexCustomer === -1) {
      throw new Error(`Customer with ktp ${ktp} is not found`);
    }
    const deletedCostomer = data[indexBank].customers.splice(indexCustomer, 1);
    await this.saveJSON(data);
    return deletedCostomer[0];
  }
  static async readCustomerByBankId(id) {
    const banks = await this.readBank();
    const customers = banks.find((bank) => bank.id === id);
    if (!customers) {
      throw new Error(`Please, check your input back!`);
    }
    return customers.customers;
  }
  static async addInterest(id) {
    const data = await this.readBank();
    const indexBank = data.findIndex((bank) => bank.id === id);
    data[indexBank].customers.forEach((customer) => {
      customer.addInterest();
    });
    await this.saveJSON(data);
    return data[indexBank].customers;
  }
}

module.exports = Model;
