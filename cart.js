function updateCartDisplay() {
  const sel_table = document.querySelector(".table_item");
  sel_table.innerHTML = "";

  //Parsed the JSON that was stringified from index.js page
  //This is done so that you have to take data from one page to other
  //so as you can see LocalStorage was used later data base can be used for the same.

  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  let subtotal = 0;
  let GST = 0;
  let finalTotal = 0;

  cartItems.forEach((product) => {
    const crt_td = document.createElement("tr");
    const eleme_inside_crt_td = (crt_td.innerHTML = `
      <td>
        <div class="cart-info">
          <img src="${product.image}" alt="" width="120px">
          <div>
            <p>${product.name}</p>
            <small>${product.price}</small>
            <br>
            <a href="">Remove</a>
          </div>
        </div>
      </td>
      <td><input type="number" value="1"></td>
      <td>${product.price}</td>
    `);

    sel_table.appendChild(crt_td);

    //price section

    //subtotal

    //here as prices had rupee symbol and . used regex to remove them

    const remSymbols = product.price.replace(/[^\d.]/g, "");

    let storeSubTotal = (subtotal += parseInt(remSymbols));

    //tax
    GST = parseInt((18 / 100) * storeSubTotal);

    //total
    finalTotal = parseInt(storeSubTotal + GST);
  });

  //Updating the cart price table

  //price update;
  const subtotalElement = document.querySelector(".subtotal");
  subtotalElement.innerText = "₹" + subtotal;

  //tax update;
  const taxElement = document.querySelector(".GST");
  taxElement.innerText = "₹" + GST;

  //final Total Price to pay
  const final_total = document.querySelector(".finalTotal");
  final_total.innerText = "₹" + finalTotal;
  // Get all remove buttons
  const removeButtons = document.querySelectorAll(".cart-info a");

  // Add event listener to each remove button
  removeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      const index = Array.from(removeButtons).indexOf(button);

      let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

      cartItems.splice(index, 1);

      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      updateCartDisplay();
    });
  });

  //If cart is Empty this will get triggered
  if (cartItems.length == 0) {
    let noItems = (document.getElementById("noItems").innerText =
      "No items on cart 😢");
  }
}

updateCartDisplay();
