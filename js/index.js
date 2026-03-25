import { products as productList } from "./data.js";
import { addToCart, cart, getCartTotal } from "./cartStore.js";

/* Mobile Menu */
const menuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const closeMenu = document.getElementById("mobile-close-menu");

const productsGrid = document.getElementById("products-grid");

function renderProducts() {
    if (!productsGrid) {
        return;
    }

    productsGrid.innerHTML = productList
        .map(
            (product) => `
    <div class="col-span-1 md:col-span-4 relative">
      <div class="border border-gray-400/50 p-6 md:p-10 w-full flex flex-col justify-between md:h-110 ">
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
        class="add-btn absolute w-22 h-22 z-50 -top-7 -right-7 rounded-full bg-white flex items-center justify-center transition-transform duration-300 hover:scale-110">
        <i class="fa fa-plus-circle text-[#C92B5D] text-5xl md:text-6xl pointer-events-none"></i>
      </button>
    </div>
  `,
        )
        .join("");

    console.log(productList);
}

productsGrid?.addEventListener("click", (e) => {
    const addButton = e.target.closest(".add-btn");
    if (addButton) {
        const id = Number(addButton.dataset.id);
        addToCart(id);
        console.log("Producto añadido", id);
    }
});

renderProducts();
