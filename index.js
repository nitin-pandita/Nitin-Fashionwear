const add_crt_btn = document.querySelector(".add_crt_btn");

add_crt_btn.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("Added to Cart");

  const prod_name = document.getElementById("product_name").innerText;
  const prod_img = document.querySelector(".small-img").src;
  const prod_price = document.getElementById("prod_price").innerText;

  //Made an object that stores all the data and later we use JSON to save data to localstorage
  const product = {
    name: prod_name,
    image: prod_img,
    price: prod_price,
  };

  // Retrieve the cart items from local storage if not then we push the product into the cartItems and then stringify and save in local storage.
  let cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];
  // Add the new product to the cart
  cartItems.push(product);

  // Save the updated cart items in local storage so we can use it in cart.js later on when updating cart
  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  //Added to cart POPUP
  const body_sel = document.querySelector(".small-container");
  let newDiv = document.createElement("div");
  newDiv.classList.add("cart_popup_sucess");
  newDiv.innerHTML = "Added to Cart ✔";
  newDiv.style.opacity = "1";

  setTimeout(() => {
    newDiv.style.opacity = "0";
  }, 2000);

  body_sel.appendChild(newDiv);
});
