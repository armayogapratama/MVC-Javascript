const Model = require("../models/model");
const View = require("../views/view");

class Controller {
  // parameter tambahkan sesuai kebutuhan
  static async list() {
    try {
      const list = await Model.readBank();
      View.showList(list);
    } catch (err) {
      View.printError(err);
    }
  }
  static async addCustomer(id, name, ktp, depositAmount) {
    try {
      const addCustomer = await Model.createCustomer(
        id,
        name,
        ktp,
        depositAmount
      );
      View.successAddCustomer(addCustomer);
    } catch (err) {
      View.printError(err);
    }
  }
  static async deleteCustomer(id, ktp) {
    try {
      const deletedCustomer = await Model.deleteCustomerByKtp(id, ktp);
      View.deletedCustomer(deletedCustomer);
    } catch (err) {
      View.printError(err);
    }
  }
  static async detail(id) {
    try {
      const customers = await Model.readCustomerByBankId(id);
      View.read(customers);
    } catch (err) {
      View.printError(err);
    }
  }
  static async addInterest(id) {
    try {
      const customers = await Model.addInterest(id);
      View.read(customers);
    } catch (err) {
      View.printError(err);
    }
  }
}

module.exports = Controller;
