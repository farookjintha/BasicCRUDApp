async function addProduct(event) {
  try {
    event.preventDefault();
    let myForm = document.getElementById("myForm");

    let productName = document.getElementById("productName").value;
    let category = document.getElementById("category").value;
    let imgUrl = document.getElementById("imgURL").value;
    let price = document.getElementById("price").value;
    let quantity = document.getElementById("quantity").value;
    let description = document.getElementById("productDescription").value;

    let payload = {
      productName,
      category,
      imgUrl,
      price,
      quantity,
      description,
    };

    let response = await fetch("http://localhost:8000/products", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let data = await response.json();
    if (data) {
      myForm.reset();
      window.location.reload();
    }
  } catch (error) {
    console.log("Error while adding a new product: ", error);
  }
}

async function getProducts() {
  try {
    let response = await fetch("http://localhost:8000/products");
    let result = await response.json();

    if (result.data.length > 0) {
      let productsContainer = document.createElement("div");
      productsContainer.setAttribute("class", "products-container");

      result.data.forEach((product, index) => {
        let productContainer = document.createElement("div");
        productContainer.setAttribute("class", "product");

        productContainer.innerHTML = `
        <div class='img-container'>
            <img src="${product.imgUrl}" alt="${product.productName}" class="product-img"/>
        </div>
        <div class="productInfo-container">
            <div class='product-name'>${product.productName}</div>
            <div class='product-category'>${product.category}</div>
            <div class='product-price'>${product.price}</div>
            <div class='product-quantiy'>${product.quantity}</div>
        </div>
        `;

        productsContainer.appendChild(productContainer);
      });

      document.body.appendChild(productsContainer);
    }
  } catch (error) {
    console.log("Error while getting products: ", error);
  }
}

getProducts();
