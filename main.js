var productName = document.getElementById('product-name');
var productPrice = document.getElementById('product-price');
var productCategory = document.getElementById('product-category');
var productDescription = document.getElementById('product-description');
var productBtn = document.getElementById('product-btn');
var productSearch = document.getElementById('product-search');
var products;
var updating = false;
var updatedProductIndex;

// console.log(productName);
// console.dir(productName);

if (localStorage.getItem('products')) {
  products = JSON.parse(localStorage.getItem('products'));
  displayData(products);
} else {
  products = [];
}

function addData() {
  if (updating) {
    addUpdatedItem(updatedProductIndex);
  } else {
    if (productName.value && productPrice.value && productDescription.value) {
      var product = {
        productName: myTextRules(productName.value),
        productPrice: myTextRules(productPrice.value),
        productCategory: myTextRules(productCategory.value),
        productDescription: myTextRules(productDescription.value),
      };

      products.unshift(product);
      saveToLocalStorage('products', products);
      displayData(products);
    } else {
      alert('Please Fill All Needed Data');
    }
  }
}

function displayData(displayList) {
  var data = '';

  for (let i = 0; i < displayList.length; i++) {
    data += `
      <tr>
        <td>${displayList[i].productName}</td>
        <td>$ ${displayList[i].productPrice}</td>
        <td>${displayList[i].productCategory}</td>
        <td>${displayList[i].productDescription}</td>
        <td><button class="btn btn-warning" onclick="updateItem(${i});">Update</button></td>
        <td><button class="btn btn-danger" onclick="deleteItem(${i});">Delete</button></td>
      </tr>
`;
  }

  document.getElementById('display-data').innerHTML = data;
  clearInputs();
}

function clearInputs() {
  productName.value = '';
  productPrice.value = '';
  productCategory.value = `${productCategory.options[0].value}`;
  productDescription.value = '';
}

function updateItem(index) {
  updating = true;
  productBtn.innerHTML = 'Update Product';

  var updatedProduct = products.concat().splice(index, 1);

  productName.value = updatedProduct[0].productName;
  productPrice.value = updatedProduct[0].productPrice;
  productCategory.value = updatedProduct[0].productCategory;
  productCategory.value = `${updatedProduct[0].productCategory}`;
  productDescription.value = updatedProduct[0].productDescription;

  updatedProductIndex = index;
}

function addUpdatedItem(index) {
  if (productName.value && productPrice.value && productDescription.value) {
    var updatedProduct = {
      productName: myTextRules(productName.value),
      productPrice: myTextRules(productPrice.value),
      productCategory: myTextRules(productCategory.value),
      productDescription: myTextRules(productDescription.value),
    };

    products.splice(index, 1, updatedProduct);
    saveToLocalStorage('products', products);
    displayData(products);

    updating = false;
    productBtn.innerHTML = 'Add Product';
  } else {
    alert('Please Fill All Needed Data');
  }
}

function deleteItem(index) {
  products.splice(index, 1);
  saveToLocalStorage('products', products);
  displayData(products);

  if (products.length === 0) {
    localStorage.clear();
  }

  updating = false;
  productBtn.innerHTML = 'Add Product';
}

function saveToLocalStorage(myKey, myValue) {
  localStorage.setItem(`${myKey}`, JSON.stringify(myValue));
}

function myTextRules(text) {
  return `${text}`.trim().toLowerCase();
}

function searchItems() {
  var searchItems = [];
  var searchValue = myTextRules(productSearch.value);
  var isCategory = searchValue.includes(':');

  for (let i = 0; i < products.length; i++) {
    if (isCategory) {
      if (products[i].productCategory.includes(searchValue.substring(1))) {
        searchItems.push(products[i]);
      }
    } else {
      if (products[i].productName.includes(searchValue)) {
        searchItems.push(products[i]);
      }
    }
  }

  displayData(searchItems);
}
