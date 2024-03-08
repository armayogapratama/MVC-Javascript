class View {
  // parameter tambahkan sesuai kebutuhan
  static printError(err) {
    console.log(err.message);
  }
  static showList(list) {
    console.log(list);
  }
  static read(customers) {
    console.table(
      customers.map((customer) => {
        return {
          name: customer.name,
          ktp: customer.ktp,
          depositAmount: customer.depositRupiahFormat(),
        };
      })
    );
  }
  static deletedCustomer(deleteCustomer) {
    console.log(`Customer with ${deleteCustomer.name} deleted successfully`);
  }
  static successAddCustomer(addCustomer) {
    console.log(`Customer ${addCustomer.name} added successfully`);
  }
}

module.exports = View;
