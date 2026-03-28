const NavCategory = (item) => `
  <div class="text-[15px] text-gray-400 py-4 flex items-center border-b border-gray-300">
    <a href="./index.html" class="hover:text-[#C92B5D] transition-colors">
      <i class="fa-regular fa-house"></i>
    </a>
    <a href="./index.html#products-section" class="flex items-center gap-1 ml-1">
      <i class="fa-solid fa-angle-right text-xs"></i>
      <span class="text-md ml-2">${item.category}</span>
    </a>
  </div>
`;

const ProductDetail = (item) => `
  ${NavCategory(item)}
  <div class="grid grid-cols-1 md:grid-cols-12 gap-5 md:py-13">
    <div class="col-span-1 md:col-span-7 flex flex-col items-center justify-center border border-gray-400/50">
      <img src="${item.image}" alt="${item.name}" class="w-full md:max-h-120 object-contain p-8">
    </div>

    <div class="col-span-1 md:col-span-5 flex flex-col ml-4 md:ml-8 py-6">
      <div class="flex flex-col gap-2">
        <h1 class="text-2xl font-semibold font-[League_Spartan] text-[#09346d]">${item.name}</h1>
        <div class="text-[#C92B5D] text-sm flex gap-1">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <p class="mt-4 text-sm text-gray-600 leading-relaxed">${item.description}</p>

        <div id="variant-container" class="flex flex-wrap gap-3 mt-2">
          ${
              item.variants.length > 1
                  ? item.variants
                        .map(
                            (variant, index) => `
                <button
                  class="variant-btn px-4 py-1 border-2 border-[#C92B5D] rounded-md text-sm font-semibold cursor-pointer transition-colors
                    ${index === 0 ? "bg-[#C92B5D] text-white" : "text-[#C92B5D] hover:bg-[#C92B5D] hover:text-white"}"
                  data-index="${index}">
                  ${variant.size}
                </button>
              `,
                        )
                        .join("")
                  : `<span class="text-sm text-gray-500">Size: <strong>${item.variants[0].size}</strong></span>`
          }
        </div>

        <div class="mt-8">
          <span id="product-price" class="text-3xl font-semibold text-[#C92B5D]">
            $${item.variants[0].price.toFixed(2)}
          </span>
        </div>

        <div class="flex items-center justify-between gap-15 mt-6">
          <div class="flex gap-6 items-center">
            <button id="qty-decrease"
              class="w-8 h-8 bg-[#C92B5D] cursor-pointer text-white rounded-md flex items-center justify-center hover:bg-[#ad214e] transition-colors">-</button>
            <span id="product-quantity" class="min-w-4 font-bold text-xl text-center">1</span>
            <button id="qty-increase"
              class="w-8 h-8 bg-[#C92B5D] cursor-pointer text-white rounded-md flex items-center justify-center hover:bg-[#ad214e] transition-colors">+</button>
          </div>
          <button id="add-to-cart-btn"
            class="py-2 w-65 md:h-14 bg-[#C92B5D] uppercase cursor-pointer rounded-full text-white font-semibold hover:bg-[#ad214e] transition-colors text-lg">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
`;

export function renderProductDetail(item) {
    const productDetail = document.getElementById("product-detail");
    if (!productDetail) return;
    productDetail.innerHTML = ProductDetail(item);
}
