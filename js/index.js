import {
    addToCart,
    getCart,
    setProductList,
    removeFromCart,
    updateCartQuantity,
} from "./cartStore.js";
import {
    renderHeader,
    renderProducts,
    renderFooter,
    renderCartPage,
} from "./ui.js";

const API_URL =
    "https://raw.githubusercontent.com/elynzx/lulu-co-api/refs/heads/main/products.json";

let activeFilter = "All";
let searchQuery = "";

function matchesCategory(product) {
    return activeFilter === "All" || product.category === activeFilter;
}

function matchesSearch(product) {
    return product.name.toLowerCase().includes(searchQuery.toLowerCase());
}

function getFilteredProducts(productList) {
    return productList.filter(
        (product) => matchesCategory(product) && matchesSearch(product),
    );
}

async function loadApp() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Response error: ${response.status}`);
        }

        const productList = await response.json();
        setProductList(productList);

        renderProducts(productList);
        renderHeader(getCart());
        renderFooter();
        renderCartPage(getCart());

        document.querySelectorAll(".filter-btn").forEach((btn) => {
            btn.addEventListener("click", () => {
                activeFilter = btn.dataset.filter;
                renderProducts(getFilteredProducts(productList));
                document
                    .querySelectorAll(".filter-btn")
                    .forEach((b) => b.classList.remove("active-filter"));
                btn.classList.add("active-filter");
            });
        });

        const searchInput = document.getElementById("search-input");
        searchInput?.addEventListener("input", (e) => {
            searchQuery = e.target.value;
            renderProducts(getFilteredProducts(productList));
        });
    } catch (error) {
        console.error("Failed to fetch:", error.message);

        const productsGrid = document.getElementById("products-grid");
        if (productsGrid) {
            productsGrid.innerHTML = `
            <p class="col-span-full text-center py-20 text-gray-500">
                We're sorry, we couldn't load the treats right now. Please try again later.
            </p>
          `;
        }
    }
}

/* Event Listeners */
const productsGrid = document.getElementById("products-grid");
productsGrid?.addEventListener("click", (e) => {
    const addButton = e.target.closest(".add-btn");
    if (!addButton) return;

    const productId = Number(addButton.dataset.id);
    addToCart(productId);
    renderHeader(getCart());
});

document.addEventListener("click", (e) => {
    const quantityBtn = e.target.closest(".js-qty-btn");
    if (quantityBtn) {
        const productId = Number(quantityBtn.dataset.id);
        const action = quantityBtn.dataset.action;
        updateCartQuantity(productId, action);
        renderCartPage(getCart());
        renderHeader(getCart());
        return;
    }

    const removeBtn = e.target.closest(".js-remove-btn");
    if (removeBtn) {
        const productId = Number(removeBtn.dataset.id);
        removeFromCart(productId);
        renderCartPage(getCart());
        renderHeader(getCart());
    }
});

loadApp();
