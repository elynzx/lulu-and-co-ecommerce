const RelatedProductCard = (product) => `
    <div class="col-span-1 md:col-span-3">
        <a href="./product.html?id=${product.id}"
           class="block transition overflow-hidden border border-gray-400/50 h-80">
            <img src="${product.image}" alt="${product.name}"
                class="w-full h-48 object-contain p-4 hover:scale-105 transition-transform duration-200">
            <div class="p-4 flex flex-col gap-2 ">
                <span class="text-gray-400 text-sm">${product.tags[0]}</span>
                <h3 class="text-[#09346d] text-md font-semibold font-[League_Spartan]">${product.name}</h3>
                <span class="text-[#C92B5D] font-bold">
                    ${
                        product.variants.length > 1
                            ? `from $${product.variants[0].price.toFixed(2)}`
                            : `$${product.variants[0].price.toFixed(2)}`
                    }
                </span>
            </div>
        </a>
    </div>
`;

export function renderRelatedProducts(products) {
    const container = document.getElementById("related-products-container");
    if (!container) return;

    container.innerHTML = products
        .map((product) => RelatedProductCard(product))
        .join("");
}
