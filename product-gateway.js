//products-gateway.js

let products = [];
  
  export const getDataProducts = () => products;
  
  export const getDataProductById = (id) => products.find((p) => p.id === id);
  
  export const getIndexDataProductById = (id) => products.findIndex((p) => p.id === id);
  
  export const addDataNewProduct = (name, price, stock, description, category) => {
    const newProduct = {
      id: products.length + 1,
      name,
      price,
      stock,
      description,
      category
    };
    products.push(newProduct);
    return newProduct;
  };
  
  export const updateDataProduct = (idx, name, price, stock, description, category) => {
    products[idx].name = name;
    products[idx].price = price;
    products[idx].stock = stock;
    products[idx].description = description;
    products[idx].category = category;
    return products[idx];
  };
  
  export const deleteDataProduct = (idx) => products.splice(idx, 1)[0];
  