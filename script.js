"use strict";

const search = document.querySelector(".search-form");
const searchIcon = document.querySelector("#search-btn");
const navbar = document.querySelector(".navbar");
const cartContainer = document.querySelector(".cart-item-container");
const cartItemList = document.querySelector(".cart-item-list");
const emptyCartMessage = document.querySelector(".empty-cart-message");
const continueShoppingBtn = document.querySelector(".continue-shopping");
const goToPaymentBtn = document.querySelector(".go-to-payment");
const cartBtn = document.querySelector("#cart-btn");
const menuBtn = document.querySelector("#menu-btn");
const cartIcon = document.querySelector(".fas.fa-shopping-cart");
const itemCount = document.createElement("span");
itemCount.className = "item-count";
cartIcon.appendChild(itemCount);

// Initially show the empty cart message
emptyCartMessage.style.display = "block";
continueShoppingBtn.style.display = "block";
goToPaymentBtn.style.display = "none";
itemCount.textContent = "0";

// Toggle search form
const searchBtn = () => {
  search.classList.toggle("active");
  navbar.classList.remove("active");
  cartContainer.classList.remove("active");
};
searchIcon.addEventListener("click", searchBtn);

// Toggle navbar
menuBtn.onclick = () => {
  navbar.classList.toggle("active");
  search.classList.remove("active");
  cartContainer.classList.remove("active");
};

// Toggle cart container
cartBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  cartContainer.classList.toggle("active");
  navbar.classList.remove("active");
  search.classList.remove("active");
});

// Close forms on scroll
window.onscroll = () => {
  navbar.classList.remove("active");
  search.classList.remove("active");
  cartContainer.classList.remove("active");
};

// Update cart visibility and item count
function updateCartVisibility() {
  const cartItems = cartContainer.querySelectorAll(".cart-item");
  const itemCountValue = cartItems.length;

  itemCount.textContent = itemCountValue;

  if (itemCountValue === 0) {
    emptyCartMessage.style.display = "block";
    continueShoppingBtn.style.display = "block";
    goToPaymentBtn.style.display = "none";
  } else {
    emptyCartMessage.style.display = "none";
    continueShoppingBtn.style.display = "none";
    goToPaymentBtn.style.display = "block";
  }
}

// Add item to cart
const addToCartButtons = document.querySelectorAll(".menu .btn");
addToCartButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    const box = button.closest(".box");
    const itemName = box.querySelector("h3").textContent;
    const itemPrice = box.querySelector(".price").textContent;

    const cartItemHTML = `
      <div class="cart-item">
          <img class="beans-img" src="${
            box.querySelector("img").src
          }" alt="${itemName}">
          <span class="fas fa-times"></span>
          <div class="cart-content">
              <h3>${itemName}</h3>
              <div class="cart-item-price">${itemPrice}</div>
          </div>
      </div>
    `;

    cartItemList.insertAdjacentHTML("beforeend", cartItemHTML);
    updateCartVisibility();

    const cancelBtn = cartItemList.querySelector(
      ".cart-item:last-child .fa-times"
    );
    cancelBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      const cartItem = e.currentTarget.closest(".cart-item");
      if (cartItem) {
        cartItem.remove();
        updateCartVisibility();
      }
    });
  });
});

// Continue Shopping button functionality
continueShoppingBtn.addEventListener("click", function () {
  const menuSection = document.getElementById("menu");
  menuSection.scrollIntoView({ behavior: "smooth" });
  cartContainer.classList.remove("active");
});

// Go to Payment button functionality
goToPaymentBtn.addEventListener("click", function () {
  alert("Redirecting to payment page...");
});

// Close containers when clicking outside
document.addEventListener("click", function (e) {
  if (!navbar.contains(e.target) && e.target !== menuBtn) {
    navbar.classList.remove("active");
  }
  if (!search.contains(e.target) && e.target !== searchIcon) {
    search.classList.remove("active");
  }
  if (!cartContainer.contains(e.target) && e.target !== cartBtn) {
    cartContainer.classList.remove("active");
  }
});

// Feedback form submission
document
  .getElementById("feedbackForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Thank you for your feedback!");

    // Clear the input fields
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("feedback").value = "";
  });
