import {
    addToCart,
    cart,
    getCartTotal,
    getCartCount,
    setProductList,
} from "./cartStore.js";
import { renderHeader, renderCartPage } from "./ui.js";

const API_URL =
    "https://raw.githubusercontent.com/elynzx/lulu-co-api/refs/heads/main/products.json";
const productsGrid = document.getElementById("products-grid");

async function loadApp() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Response error: ${response.status}`);
        }

        const productList = await response.json();

        setProductList(productList);
        renderProducts(productList);
        renderHeader(cart);
        renderCartPage(cart);
    } catch (error) {
        console.error("Failed to fetch:", error.message);

        const productsGrid = document.getElementById("products-grid");
        if (productsGrid) {
            productsGrid.innerHTML = `
            <p class="col-span-full text-center py-20 text-gray-500 italic">
                We're sorry, we couldn't load the treats right now. Please try again later.
            </p>
          `;
        }
    }
}

function renderProducts(productList) {
    if (!productsGrid || !productList) {
        return;
    }

    productsGrid.innerHTML = productList
        .map(
            (product) => `
    <div class="col-span-1 md:col-span-4 relative">
      <div class="border border-gray-400/50 px-6 gap-4 py-10 md:p-10 w-full flex flex-col justify-between md:h-110 ">
        <div>
          <span class="text-[#09346d] text-xl md:text-2xl font-semibold font-[League_Spartan]">${product.name}</span>
          <div class="text-gray-400 text-sm">
          ${product.tags
              .map(
                  (tag, index) => `
          <span>${tag}</span>
          ${index < product.tags.length - 1 ? "<span> | </span>" : ""}
          `,
              )
              .join("")}
          </div>
        </div>
        <div class="flex w-full items-center justify-center">
          <img class="max-h-60 object-contain transition-transform duration-500 hover:scale-105"
            src="${product.image}">
        </div>
        <div class="text-[#C92B5D] text-3xl font-bold flex"> 
  ${
      product.variants.length > 1
          ? `$${product.variants[0].price.toFixed(2)} - $${product.variants[product.variants.length - 1].price.toFixed(2)}`
          : `$${product.variants[0].price.toFixed(2)}`
  }
        </div>
      </div>
      <button data-id="${product.id}"  
        class="add-btn absolute w-18 h-auto cursor-pointer md:w-22 md:h-22 z-50 -top-4 md:-top-7 -right-7 rounded-full bg-white flex items-center justify-center transition-transform duration-300 hover:scale-110">
        <i class="fa fa-plus-circle text-[#C92B5D] text-5xl md:text-6xl pointer-events-none"></i>
      </button>
    </div>
  `,
        )
        .join("");
}

productsGrid?.addEventListener("click", (e) => {
    const addButton = e.target.closest(".add-btn");
    if (addButton) {
        const id = Number(addButton.dataset.id);
        addToCart(id);
        renderHeader(cart);
    }
});

loadApp();
