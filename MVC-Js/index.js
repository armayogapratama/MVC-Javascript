// your code start here..

const Controller = require("./controllers/controller");

const [cmd, ...params] = process.argv.slice(2);

switch (cmd) {
  case "detail": {
    const [id] = params;
    Controller.detail(+id);
    break;
  }
  case "list": {
    Controller.list();
    break;
  }
  case "deleteCustomer": {
    const [id, ktp] = params;
    Controller.deleteCustomer(+id, ktp);
    break;
  }
  case "addCustomer": {
    const [id, name, ktp, depositAmount] = params;
    Controller.addCustomer(+id, name, ktp, +depositAmount);
    break;
  }
  case "addInterest": {
    const [id] = params;
    Controller.addInterest(+id);
    break;
  }
}
