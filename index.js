const fs = require("fs");

class ProductManager {
  constructor() {
    this.products = [];
    this.id = 0;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error("All fields are required");
      return;
    }

    const product = this.products.find(p => p.code === code);
    if (product) {
      console.error("Code already exists");
      return;
    }

    const newProduct = {
      id: ++this.id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    };

    this.products.push(newProduct);

    this.saveToFile();
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(p => p.id === id);
    if (!product) {
      console.error("Not found");
      return;
    }
    return product;
  }

  deleteProduct(id) {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) {
      console.error("Not found");
      return;
    }

    this.products.splice(index, 1);

    this.saveToFile();
  }

  saveToFile() {
    const data = JSON.stringify(this.products, null, 2);
    fs.writeFile("products.json", data, err => {
      if (err) {
        console.error("Error writing to file", err);
      } else {
        console.log("File saved");
      }
    });
  }
}

const productManager = new ProductManager();

productManager.addProduct("Product 1", "Description 1", 10, "thumbnail1.jpg", "code1", 20);


const products = productManager.getProducts();
console.log(products);


const product = productManager.getProductById(1);
console.log(product);