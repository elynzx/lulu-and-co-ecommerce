import {
    getCartCount,
    getCartTotal,
    getCartSubtotal,
} from "./cartStore.js";

const Logo = () => `<img class="w-24 md:w-auto" src="./assets/logo.svg" />`;

const NavLinks = () => `
  <nav>
    <ul class="flex flex-col md:flex-row gap-8 md:gap-10 items-center">
      <li><a class="uppercase hover:underline underline-offset-12" href="index.html">Home</a></li>
      <li><a class="uppercase hover:underline underline-offset-12" href="#">Shop</a></li>
      <li><a class="uppercase hover:underline underline-offset-12" href="#">Blog</a></li>
      <li><a class="uppercase hover:underline underline-offset-12" href="#">Contact</a></li>
    </ul>
  </nav>
`;

const CartBadge = (count) => `
    <div class="absolute w-5 h-5 bottom-0 md:-bottom-1 -right-2 md:-right-3 bg-[#09346d] rounded-full flex items-center justify-center">
      <span id="cart-count" class="text-xs text-white">${count}</span>
    </div>
`;

const CartButton = (count, isMobile) => `
  <div class="relative flex items-center">
    <a href="./cart.html" ${isMobile ? "" : 'id="cart-btn-desktop"'} class="flex items-center">
      <i class="fa-solid fa-cart-shopping text-2xl"></i>
    </a>
    ${CartBadge(count)}
  </div>      
`;

const CartModalProduct = (item) => `
    <div class="border border-gray-400/50 w-full px-4 h-32 flex gap-2 items-center">
      <img class="w-25 h-auto object-contain p-3 shrink-0" src="${item.image}">
      <div class="flex flex-col justify-center h-32 min-w-0 gap-1">
        <span class="text-[#09346d] text-lg font-semibold font-[League_Spartan]">${item.name}</span>
        <div>
          <p class="text-gray-400 text-sm">Quantity: <span class="font-bold">${item.quantity}</span></p>
        </div>
        <div>
          <p class="text-gray-400 text-sm">Total: <span class="font-bold">$ ${(item.price * item.quantity).toFixed(2)}</span></p>
        </div>
      </div>
    </div>
`;

const CartModal = (cartList) => `
  <div id="cart-modal" class="absolute z-51 md:top-22 md:right-30 px-4 bg-white/95 h-160 w-100 shadow-xl hidden text-[#09346d]">
    <div id="cart-modal-content" class="flex flex-col gap-4 p-2 items-center max-h-125 overflow-y-auto mt-6">
      ${
          cartList.length > 0
              ? cartList.map((item) => CartModalProduct(item)).join("")
              : '<p class="py-10 text-gray-400">Your cart is empty.</p>'
      }
    </div>
    <div class="flex justify-center items-center h-30">
       <a href="./cart.html" class="text-center border-2 border-[#FF6D91] text-[#FF6D91] font-bold uppercase w-50 py-3 rounded-full">View Cart</a>
    </div>
  </div>
`;

export function renderHeader(cartList = []) {
    const container = document.getElementById("main-header-container");
    if (!container) return;

    const cartCount = getCartCount();

    container.innerHTML = `
    <header class="text-white w-full">
      
    <!-- Desktop -->
      <div class="hidden md:flex w-full md:max-w-432 md:mx-auto md:px-30 justify-between items-center md:h-26 relative">
        ${Logo()}
        <div class="flex gap-12 items-center">
          ${NavLinks()}
          <button class="border-2 border-white rounded-full w-50 h-12 uppercase">Login / Signup</button>
          <div class="flex gap-10 relative">
            <a href="#"><i class="fa-solid fa-magnifying-glass transition duration-100 hover:scale-110"></i></a>
            <a href="#"><i class="fa-solid fa-heart transition duration-100 hover:scale-110"></i></a>
            ${CartButton(cartCount, false)}
          </div>
        </div>
        ${CartModal(cartList)}
      </div>

      <!-- Mobile -->
      <div class="flex md:hidden col-span-1 justify-between items-center py-4 px-5 font-medium text-white">
        ${Logo()}
        <div class="flex gap-4 relative">
          ${CartButton(cartCount, true)}
          <button id="mobile-menu-btn" class="text-3xl focus:outline-none"><i class="fa-solid fa-bars"></i></button>
        </div>
      </div>
    </header>

    <!-- Mobile Menu-->
    <div id="mobile-menu" class="text-white  fixed inset-0 bg-[#FF6D91] z-60 flex flex-col items-center justify-center hidden">
      <button id="mobile-close-menu" class="absolute top-6 right-6 text-3xl"><i class="fa-solid fa-xmark"></i></button>
      ${NavLinks()}
      <button class="bg-white text-[#FF6D91] rounded-full px-8 py-2 mt-6 uppercase">Login/Signup</button>
    </div>
  `;

    setupEventListeners();
}

function setupEventListeners() {
    const menuBtn = document.getElementById("mobile-menu-btn");
    const closeBtn = document.getElementById("mobile-close-menu");
    const mobileMenu = document.getElementById("mobile-menu");

    const desktopCartBtn = document.getElementById("cart-btn-desktop");
    const cartModal = document.getElementById("cart-modal");

    menuBtn?.addEventListener("click", () =>
        mobileMenu.classList.remove("hidden"),
    );
    closeBtn?.addEventListener("click", () =>
        mobileMenu.classList.add("hidden"),
    );

    desktopCartBtn?.addEventListener("click", (e) => {
        e.preventDefault();
        cartModal?.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
        if (!cartModal || cartModal.classList.contains("hidden")) return;
        if (
            !cartModal.contains(e.target) &&
            !desktopCartBtn.contains(e.target)
        ) {
            cartModal.classList.add("hidden");
        }
    });
}

/* Products */
export function renderProducts(productList) {
    const productsGrid = document.getElementById("products-grid");

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

/* Cart page */

const CartTableRow = (item) => `
  <tr class="border-b border-gray-100">
    <td class="py-4 px-4 flex items-center gap-3">
      <img class="w-16 h-16 object-contain border border-gray-200 rounded" src="${item.image}" alt="${item.name}">
      <span class="font-semibold text-[#09346d]">${item.name}</span>
    </td>
    <td class="py-4 px-4 text-center font-medium">
      <div class="flex gap-4 items-center justify-center">
      <button class="js-qty-btn bg-[#C92B5D] cursor-pointer text-white w-6 h-6 rounded-md flex items-center justify-center" data-id="${item.id}" data-action="decrease">-</button>
      <span class="inline-block min-w-6 text-center">${item.quantity}</span>
      <button class="js-qty-btn bg-[#C92B5D] cursor-pointer text-white w-6 h-6 rounded-md flex items-center justify-center" data-id="${item.id}" data-action="increase">+</button>
      </div>
    </td>
    <td class="py-4 px-4 text-center text-gray-600">$${item.price.toFixed(2)}</td>
    <td class="py-4 px-4 text-center font-bold text-[#09346d]">$${(item.price * item.quantity).toFixed(2)}</td>
    <td class="text-center">
      <button class="js-remove-btn text-[#C92B5D] hover:scale-110 transition-transform cursor-pointer" data-id="${item.id}">
        <i class="fa-solid fa-trash"></i>
      </button>
    </td>
  </tr>
`;

const OrderSummary = (subtotal) => {
    const shipping = 5;
    const total = getCartTotal(subtotal, shipping);
    const productCount = getCartCount();

    return `
    <div class="w-full max-h-full bg-white rounded-xl shadow-lg border border-gray-400/20 p-6 flex flex-col gap-4 md:top-32">
      <h4 class="text-lg font-bold text-[#C92B5D] mb-2 text-center underline underline-offset-8">Order Summary</h4>
      <div class="flex flex-col gap-3 mt-4 border-b border-gray-100">
        <div class="flex justify-between text-sm text-gray-600 space-y-3">
          <span>Products (${productCount})</span>
          <span class="font-bold text-[#09346d]">$${subtotal.toFixed(2)}</span>
        </div>
      </div>
      <div class="flex flex-col gap-3 mt-4">
        <div class="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span class="font-bold text-[#09346d]">$${subtotal.toFixed(2)}</span>
        </div>
        <div class="flex justify-between text-sm text-gray-600">
          <span>Shipping</span>
          <span class="font-bold text-[#09346d]">$${shipping.toFixed(2)}</span>
        </div>
        <div class="flex justify-between w-full text-base font-bold border-t border-gray-100 pt-4 mt-2 text-[#09346d]">
          <span>Total</span>
          <span class="text-xl">$${total.toFixed(2)}</span>
        </div>
      </div>
      <button class="mt-6 py-2 w-full md:h-14 font-bold rounded-full bg-[#C92B5D] cursor-pointer text-white hover:bg-[#af234f] transition-colors uppercase">
        Proceed to checkout
      </button>
    </div>
  `;
};

export function renderCartPage(cartList = []) {
    const tableBody = document.getElementById("cart-table-body");
    const summaryContainer = document.getElementById("order-summary-container");
    const cartSection = document.getElementById("cart-section");

    if (!tableBody || !summaryContainer) return;

    if (cartList.length === 0) {
        cartSection.innerHTML = `
      <div class="flex flex-col items-center py-20 gap-6">
        <i class="fa-solid fa-cart-shopping text-6xl text-gray-200"></i>
        <p class="text-xl text-gray-500 italic">Your shopping cart is empty</p>
        <a href="index.html" class="bg-[#FF6D91] text-white px-8 py-3 rounded-full font-bold uppercase">Go back to shop</a>
      </div>
    `;
        return;
    }

    tableBody.innerHTML = cartList.map((item) => CartTableRow(item)).join("");
    summaryContainer.innerHTML = OrderSummary(getCartSubtotal());
}
