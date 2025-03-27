import config from "./config.js";
import { formatPrice } from "./utils.js";

let products = [];
let productsLength = 0;
let limit = 20;
let pageCount = 0;
let page = 1;

let cartOpen = false;
let userOpen = false;
let cartProducts = [];
let cartCount = 0;

/* Pagination DOM Elements */
const increaseEl = document.getElementById("increase");
const decreaseEl = document.getElementById("decrease");
const pageEl = document.getElementById("page");

/* Products DOM Elements */
const productsListEl = document.getElementById("products-list-container");
const template = document.getElementById("product-card-template");

/* Menu (Cart/User) DOM Elements */
const cartCounter = document.getElementById("cart-counter");
const cartEl = document.getElementById("cart");
const userEl = document.getElementById("user");
const cartMenuEl = document.getElementById("cart-menu");
const userMenuEl = document.getElementById("user-menu");
const cartItemTemplate = document.getElementById("cart-item-template");
const cartListEl = document.getElementById("cart-list");
const emptyCartWarningEl = document.getElementById("empty-cart-warning");
const sideMenuContainer = document.getElementById("side-menu-container");

console.log("cartListEl", cartListEl);

const bodyEl = document.getElementById("body");

body.addEventListener("click", handleOutsideClick);

increaseEl.addEventListener("click", function () {
  if (page >= pageCount) {
    return;
  }
  page += 1;
  pageEl.innerText = page;
  renderProducts(products);
});
decreaseEl.addEventListener("click", function () {
  if (page <= 1) {
    return;
  }
  page -= 1;
  pageEl.innerText = page;

  renderProducts(products);
});

cartEl.addEventListener("click", handleCartMenu);
userEl.addEventListener("click", handleUserMenu);

/* Menu Functions */
function handleCartMenu(event) {
  console.log("handleCartMenu");
  event.preventDefault();
  event.stopPropagation();
  if (cartOpen) {
    // Close the cart side menu
    cartOpen = false;
    cartMenuEl.classList.remove("open");
    cartMenuEl.classList.add("close");

    sideMenuContainer.classList.add("container-close");
    sideMenuContainer.classList.remove("container-open");
  } else {
    // Open the cart side menu
    if (userOpen) {
      // First close the open user side menu and than open the cart
      userOpen = false;
      userMenuEl.classList.remove("open");
      userMenuEl.classList.add("close");
    }

    cartOpen = true;
    cartMenuEl.classList.remove("close");
    cartMenuEl.classList.add("open");

    sideMenuContainer.classList.remove("container-close");
    sideMenuContainer.classList.add("container-open");
  }
}

function handleUserMenu() {
  console.log("handleCartMenu");

  if (userOpen) {
    // Close the cart side menu
    userOpen = false;
    userMenuEl.classList.remove("open");
    userMenuEl.classList.add("close");

    sideMenuContainer.classList.add("container-close");
    sideMenuContainer.classList.remove("container-open");
  } else {
    // Open the cart side menu
    if (cartOpen) {
      // First close the open cart side menu and than open the cart
      cartOpen = false;
      cartMenuEl.classList.remove("open");
      cartMenuEl.classList.add("close");
    }
    userOpen = true;
    userMenuEl.classList.remove("close");
    userMenuEl.classList.add("open");

    sideMenuContainer.classList.remove("container-close");
    sideMenuContainer.classList.add("container-open");
  }
}

function handleOutsideClick(event) {
  event.preventDefault();
  event.stopPropagation();
  if (
    userOpen &&
    !userMenuEl.contains(event.target) &&
    !userEl.contains(event.target)
  ) {
    userMenuEl.classList.remove("open");
    userMenuEl.classList.add("close");
    userOpen = false;

    sideMenuContainer.classList.add("container-close");
    sideMenuContainer.classList.remove("container-open");
  }
  if (
    cartOpen &&
    !cartMenuEl.contains(event.target) &&
    !cartEl.contains(event.target) &&
    !event.target.id.startsWith("product-cart-button-")
  ) {
    cartMenuEl.classList.remove("open");
    cartMenuEl.classList.add("close");
    cartOpen = false;

    sideMenuContainer.classList.add("container-close");
    sideMenuContainer.classList.remove("container-open");
  }
}

function addToCart(product) {
  try {
    const index = cartProducts.indexOf((el) => el.id === product.productID);
    console.log(index);
    console.log("index !== -1", index !== -1);

    if (index !== -1 && cartProducts[index] && cartProducts[index]?.count) {
      cartProducts[index] = {
        id: product.productID,
        count: cartProducts[index].count + 1,
        name: product.productName,
        image: product.productData.productMainImage,
        price: product.buyPrice,
      };
    } else {
      cartProducts.push({
        id: product.productID,
        count: 1,
        name: product.productName,
        image: product.productData.productMainImage,
        price: product.buyPrice,
      });
    }
    cartCount = cartProducts.length;
    cartCounter.innerText = cartCount;

    if (cartCount === 0) {
      if (!cartListEl.classList.contains("hidden"))
        cartListEl.classList.add("hidden");
      if (emptyCartWarningEl.classList.contains("hidden")) {
        emptyCartWarningEl.classList.remove("hidden");
      }
    } else {
      if (cartListEl.classList.contains("hidden"))
        cartListEl.classList.remove("hidden");
      if (!emptyCartWarningEl.classList.contains("hidden")) {
        emptyCartWarningEl.classList.add("hidden");
      }
    }

    renderCartItems();
  } catch (err) {
    console.log("addToCartErr", err);
  }
}

function getCartItem(product, itemIndex) {
  if (!product || !template) return null;

  try {
    const card = cartItemTemplate.cloneNode(true);
    card.id = product.name;

    const img = card.querySelector("img");
    img.src = product.image;
    img.alt = product.name;

    card.querySelector("h2").innerText = product.name;
    card.querySelector("h3").innerText = `${formatPrice(
      product.price * product?.count ?? 1
    )} ₺`;
    card.querySelector("#cart-item-count").innerText = product.count;

    const increaseButton = card.querySelector("#cart-item-increase");
    const decreaseButton = card.querySelector("#cart-item-decrease");

    if (product.count === 1) {
      if (!decreaseButton.classList.contains("disabled"))
        decreaseButton.classList.add("disabled");
    } else if (product.count > 1) {
      if (decreaseButton.classList.contains("disabled"))
        decreaseButton.classList.remove("disabled");
    }

    increaseButton.id = `cart-item-increase-${product.id}`;
    decreaseButton.id = `cart-item-decrease-${product.id}`;

    increaseButton.addEventListener("click", function () {
      console.log(
        "cartProducts[itemIndex].count",
        cartProducts[itemIndex].count
      );
      const _newCount = cartProducts[itemIndex].count + 1;
      card.querySelector("#cart-item-count").innerText = _newCount;
      card.querySelector("h3").innerText = `${formatPrice(
        product.price * _newCount ?? 1
      )} ₺`;
      cartProducts[itemIndex] = {
        ...cartProducts[itemIndex],
        count: _newCount,
      };
      if (_newCount > 1) {
        if (decreaseButton.classList.contains("disabled")) {
          decreaseButton.classList.remove("disabled");
        }
      }
    });
    decreaseButton.addEventListener("click", function () {
      const _newCount = cartProducts[itemIndex].count - 1;

      if (cartProducts[itemIndex].count === 1) {
        if (!decreaseButton.classList.contains("disabled"))
          decreaseButton.classList.add("disabled");
        return;
      } else {
        card.querySelector("#cart-item-count").innerText = _newCount;
        card.querySelector("h3").innerText = `${formatPrice(
          product.price * _newCount ?? 1
        )} ₺`;
        cartProducts[itemIndex] = {
          ...product,
          count: _newCount,
        };
        if (_newCount === 1) {
          if (!decreaseButton.classList.contains("disabled"))
            decreaseButton.classList.add("disabled");
        }
      }
    });

    card.classList.remove("hidden");

    return card;
  } catch (err) {
    console.log("err", err);
    return null;
  }
}

function renderCartItems() {
  if (!cartListEl) return;
  cartListEl.innerHTML = "";
  console.log("handleCartItems");

  try {
    console.log("cartProducts", cartProducts);
    cartProducts.map((el, index) => {
      const cartItem = getCartItem(el, index);
      console.log("cartItem", cartItem);
      if (cartItem) {
        cartListEl.appendChild(cartItem);
      }
    });
  } catch (err) {
    console.log("renderCart err", err);
  }
}

/* Product Functions */
function getProductCard(product) {
  if (!product || !template) return null;

  try {
    const card = template.cloneNode(true);
    card.id = product.productName;

    const img = card.querySelector("img");
    img.src = product.productData.productMainImage;
    img.alt = product.productName;

    const button = card.querySelector("button");

    button.id = `product-cart-button-${product.productID}`;
    button.addEventListener("click", function (event) {
      event.stopPropagation();
      event.preventDefault();
      addToCart(product);
    });

    card.querySelector("h2").innerText = product.productName;
    const priceEl = card.querySelector("h3");
    if (product.buyPrice === 0) {
      priceEl.innerText = "Bedava";
      priceEl.classList.add("text-green-500");
    } else {
      priceEl.innerText = `${formatPrice(product.buyPrice)} ₺`;
    }
    if (product.marketPrice > product.buyPrice) {
      card.querySelector("h4").innerText = `${formatPrice(
        product.marketPrice
      )} ₺`;
    }
    card.classList.remove("hidden");
    const percentage =
      product.buyPrice === 0
        ? 100
        : (parseFloat(`${product.buyPrice}`) * 100) /
          parseFloat(`${product.marketPrice}`);
    if (
      product.marketPrice > product.buyPrice &&
      product.buyPrice !== 0 &&
      percentage !== 0
    ) {
      card.querySelector("h5").innerText = `%${formatPrice(
        percentage
      )} İndirim`;
    }
    return card;
  } catch (err) {
    console.log("err", err);
    return null;
  }
}

function renderProducts(list) {
  productsListEl.innerHTML = "";

  try {
    const range = {
      start: (page - 1) * limit,
      end: page * limit,
    };

    const _products = list.slice(range.start, range.end);

    _products.map((el) => {
      const card = getProductCard(el);

      if (card) {
        productsListEl.appendChild(card);
      }
    });
  } catch (err) {
    console.log("renderProducts err", err);
  }
}

async function loadProducts() {
  try {
    const response = await fetch(`${config.API_BASE_URL}products/list`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.API_TOKEN}`,
        accept: "application/json",
      },
    });

    if (!response.ok) {
      //TODO: handle error
    }
    const json = await response.json();
    products = json?.data ?? [];

    // For Pagination
    productsLength = products.length;
    pageCount = Math.ceil(productsLength / limit);

    renderProducts(products);
  } catch (error) {
    console.error(error);
    return [];
  }
}

loadProducts();
