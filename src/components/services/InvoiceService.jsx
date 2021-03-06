import GenericService from "./GenericService";

class InvoiceService extends GenericService {
  constructor() {
    super();
  }
  getCustomerByInvoice = (value) =>
    this.post("/customers/getCustomerByInvoice", { value });
  getInvoiceNumber = () => this.get("/sales/getInvoiceNum/");
  getInvoice = () => this.get("/sales/");
  getInvoiceCustomer = () => this.get("/customers/");
  Profit = (data) => this.Data("/sales/profit/", data);
  getSingleInvoice = (id) => this.get("/sales/" + id);
  getSingleCustomer = (id) => this.get("/customers/" + id);
  updateSingleCustomer = (id, remaining, amount_desc) =>
    this.put("/customers/" + id, { remaining, amount_desc });
  addInvoice = (costPriceTotal, salePriceTotal, name, data) =>
    this.post("/sales/", { costPriceTotal, salePriceTotal, name, data });
  addInvoiceCustomer = (data) => this.post("/customers/", data);
  updateInvoiceCustomer = (_id, data) =>
    this.put("/customers/invoice/" + _id, data);

  deleteInvoice = (_id) => this.delete("/api/novels/delete/" + _id);
  updateInvoice = (_id, formData, config) =>
    this.putData("/api/novels/update/" + _id, formData, config);
  // getStories = () => this.get("/api/novels/mystories");
  // getCart = (formData, config) => this.post("/api/novels/cart", formData);
  // addCart = (formData, config) =>
  //   this.postData("/api/novels/cart", formData, config);
}

let invoiceService = new InvoiceService();
export default invoiceService;
