import config from "./config.js";
import { formatPrice } from "./utils.js";

let products = [];
let productsLength = 0;
let limit = 20;
let pageCount = 0;
let page = 1;

const increaseEl = document.getElementById("increase");
const decreaseEl = document.getElementById("decrease");
const pageEl = document.getElementById("page");
const productsListEl = document.getElementById("products-list-container");
const template = document.getElementById("product-card-template");

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

function getProductCard(product) {
  if (!product || !template) return null;

  try {
    const card = template.cloneNode(true);
    card.id = product.productName;

    const img = card.querySelector("img");
    img.src = product.productData.productMainImage;
    img.alt = product.productName;

    card.querySelector("h2").innerText = product.productName;
    const priceEl = card.querySelector("h3");
    if (product.buyPrice === 0) {
      priceEl.innerText = "Bedava";
      priceEl.classList.add("text-green-500");
    } else {
      priceEl.innerText = `${formatPrice(product.buyPrice)}  ₺`;
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
