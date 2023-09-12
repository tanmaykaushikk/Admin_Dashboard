const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
// const themeToggler = document.querySelector(".theme-toggler");

//Show sidebar menu
menuBtn.addEventListener("click", () => {
  sideMenu.style.display = "block";
});

//Close sidebar menu

closeBtn.addEventListener("click", () => {
  sideMenu.style.display = "none";
});



let Orders = [];

let myForm = document.querySelector(".myForm");
let productName = document.querySelector(".productName");
let productQuantity = document.querySelector(".productQuantity");
let price = document.querySelector(".price");
// let uniqueId = document.querySelector(".uniqueId");

myForm.addEventListener("submit", function (ev) {
  ev.preventDefault();
  let data = JSON.parse(localStorage.getItem("Orders")) || [];

  var alreadyPresent = data.find(
    (product) =>
      product.productName === productName.value && product.price === price.value
  );
  const productQuantityValue = parseFloat(alreadyPresent?.productQuantity);
  const quantityToAdd = parseFloat(productQuantity.value);

  if (alreadyPresent) {
    alreadyPresent.productQuantity = (
      productQuantityValue + quantityToAdd
    ).toString();

    localStorage.setItem("Orders", JSON.stringify(data));
    showProduct(data);
  } else {
    let id=data[Object(data).length - 1]?.uniqueId || 0;

    let newProduct = {
      uniqueId: id + 1,
      productName: productName.value,
      productQuantity: productQuantity.value,
      price: price.value,
    };

    let productData = JSON.parse(localStorage.getItem("Orders")) || [];
    productData.push(newProduct);
    localStorage.setItem("Orders", JSON.stringify(productData));
    showProduct(productData);
  }
  productName.value="";
  productQuantity.value="";
  price.value="";
});

let tableList = document.querySelector("table tbody");

let productJsonData = JSON.parse(localStorage.getItem("Orders")) || [];

function showProduct(productData) {
  tableList.innerHTML = "";
  for (let i = 0; i < productData.length; i++) {
    let order = productData[i];
    let tr = document.createElement("tr");
    tr.classList.add("trElement");
    tr.setAttribute("id", order.uniqueId);
    tr.innerHTML = `
        <td>${order.uniqueId}</td>
        <td>${order.productName}</td>
        <td>${order.productQuantity}</td>
        <td>${order.price}</td>
        <td class="primary" onclick="popup(${order.uniqueId})">Delete</td>
        `;
    document.querySelector("table tbody").appendChild(tr);
  }
}

showProduct(productJsonData);

function popup(idToDelete) {
  var popup = document.getElementById("popup");

  if (popup.style.display == "none") {
    popup.style.display = "flex";
    popup.innerHTML = `<div class="content">
            <div class="popup-top">
                <h2>
                    Delete Product
                </h2>
                <h2 class="popClose" onclick="popup()">
                    X
                </h2>
            </div>
            <div class="deleteContent">
                <h3>
                    Enter quantity of product that you want to delete?
                </h3>
                <input type="number" id="qty">
                <button type="button" onclick="updateButton(${idToDelete})">Update</button>
            </div>`;
  } else {
    popup.style.display = "none";
  }
}
function updateButton(idToDelete) {
  var qty = document.getElementById("qty");
  var value = qty.value || "";
  deleteEle(idToDelete, value);
  popup();
}
function deleteEle(count, value) {
  const trDelElement = document.getElementById(count);
  if (trDelElement) {
    var tdElements = trDelElement.getElementsByTagName("td");
    var firstTd = tdElements[0];
    var thirdTd = tdElements[2];
    const currentThirdTdValue = parseFloat(thirdTd.textContent);
    
    if (!isNaN(currentThirdTdValue)) {
      var newThirdTdValue = currentThirdTdValue - value;
      if (newThirdTdValue <= 0) {
        trDelElement.remove();
      } else {
        thirdTd.textContent = newThirdTdValue;
      }
      let productData = JSON.parse(localStorage.getItem("Orders")) || [];
      var orderToUpdate = productData.find(
        (order) => order.uniqueId == firstTd.textContent
      );
      if (orderToUpdate) {
        if (newThirdTdValue <= 0) {
          productData.splice(firstTd.textContent - 1, 1);
        } else {
          orderToUpdate.productQuantity = newThirdTdValue;
        }
        localStorage.setItem("Orders", JSON.stringify(productData));
      }
      showProduct(JSON.parse(localStorage.getItem("Orders")) || []);
    }
  }
}

//Showing showAddForm

let addForm = document.querySelector(".addForm");
let mainDash = document.querySelector(".mainDash");
let dispForm = document.querySelector(".form");
let recentOrders = document.querySelector(".recent-orders");

addForm.addEventListener("click",()=>{
  dispForm.style.display = "block";
  recentOrders.style.display = "none";
  mainDash.classList.remove("active");
  addForm.classList.add("active");
})
mainDash.addEventListener("click",()=>{
  recentOrders.style.display = "block";
  dispForm.style.display = "none";
  addForm.classList.remove("active");
  mainDash.classList.add("active");
})
