var productToBeUpdated = null;

async function addOrUpdateProduct(event) {
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

    if (!productToBeUpdated) {
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
    } else {
      let response = await fetch(
        `http://localhost:8000/products/${productToBeUpdated}`,
        {
          method: "PUT",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response.json();
      if (data) {
        productToBeUpdated = null;
        myForm.reset();
        window.location.reload();
      }
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
            <div class='product-price'>₹. ${product.price} /- </div>
            <div class='product-quantiy'>Quantity: ${product.quantity}</div>
        </div>
        <div class="icons-container">
        <div class="edit-icon icon" id="editIcon" onclick="startEditing('${product._id}')">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
            </svg>
        </div>
        <div class="delete-icon icon" id="deleteIcon" onclick="deleteProduct('${product._id}')">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            </svg>
        </div>
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

async function deleteProduct(productId) {
  try {
    let response = await fetch(`http://localhost:8000/products/${productId}`, {
      method: "DELETE",
    });
    let result = await response.json();

    if (result) {
      window.location.reload();
    }
  } catch (error) {
    console.log("Error while deleting product: ", error);
  }
}

async function startEditing(productId) {
  try {
    let response = await fetch(`http://localhost:8000/products/${productId}`);
    let result = await response.json();

    productToBeUpdated = result.data._id;
    document.getElementById("productName").value = result.data.productName;
    document.getElementById("category").value = result.data.category;
    document.getElementById("imgURL").value = result.data.imgUrl;
    document.getElementById("price").value = result.data.price;
    document.getElementById("quantity").value = result.data.quantity;
    document.getElementById("productDescription").value =
      result.data.description;
  } catch (error) {
    console.log("Error while retrieving product data for updation: ", error);
  }
}

getProducts();
