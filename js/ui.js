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
    <a href="./cart.html" ${isMobile ? '' : 'id="cart-btn-desktop"'} class="flex items-center">
      <i class="fa-solid fa-cart-shopping text-2xl"></i>
    </a>
    ${CartBadge(count)}
  </div>      
`;

const CartModal = () => `
  <div id="cart-modal" class="absolute z-51 md:top-22 md:right-30 px-4 bg-white/95 w-85 shadow-xl hidden text-[#09346d]">
    <div id="cart-modal-content" class="flex flex-col gap-4 p-2 items-center">
      <!-- Product -->
      <div class="border border-gray-400/50 w-full p-4 flex gap-6">
        <img class="w-25" src="./assets/products/cuchareable-lucuma.png">
        <div class="flex flex-col justify-center">
          <span class="text-[#09346d] text-lg font-semibold font-[League_Spartan]">Lucuma Cuchareable Cup</span>
          <div>
            <p class="text-gray-400 text-sm">Cantidad: <span class="font-bold">1</span></p>
          </div>
          <div>
            <p class="text-gray-400 text-sm">Total: <span class="font-bold">$ 25.00</span></p>
          </div>
        </div>
      </div>
    </div>
    <div class="p-4 flex justify-center">
       <a href="./cart.html" class="text-center border-2 border-[#FF6D91] text-[#FF6D91] font-bold uppercase w-50 py-3 rounded-full">View Cart</a>
    </div>
  </div>
`;

export function renderHeader(cartCount = 0) {
    const container = document.getElementById("main-header-container");
    if (!container) return;

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
            ${CartButton(cartCount , false)}
          </div>
        </div>
        ${CartModal()}
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

    menuBtn?.addEventListener("click", () => mobileMenu.classList.remove("hidden"));
    closeBtn?.addEventListener("click", () => mobileMenu.classList.add("hidden"));

    desktopCartBtn?.addEventListener("click", (e) => {
        e.preventDefault();
        cartModal?.classList.toggle("hidden");
    });
}
