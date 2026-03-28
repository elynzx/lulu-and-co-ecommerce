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
let loadedProducts = [];

function matchesCategory(product) {
    return activeFilter === "All" || product.category === activeFilter;
}

function normalizeText(text) {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "");
}

function matchesSearch(product) {
    return normalizeText(product.name).includes(normalizeText(searchQuery));
}

function getFilteredProducts() {
    return loadedProducts.filter(
        (product) => matchesCategory(product) && matchesSearch(product),
    );
}

function clearSearchInput() {
    const searchInput = document.getElementById("search-input");
    if (searchInput) searchInput.value = "";
}

function setupFilterButtons() {
    document.querySelectorAll(".filter-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            activeFilter = btn.dataset.filter;
            if (activeFilter === "All") {
                searchQuery = "";
                clearSearchInput();
            }
            renderProducts(getFilteredProducts());
            document
                .querySelectorAll(".filter-btn")
                .forEach((b) =>
                    b.classList.remove("bg-[#C92B5D]", "text-white"),
                );
            btn.classList.add("bg-[#C92B5D]", "text-white");
        });
    });
}

async function loadApp() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Response error: ${response.status}`);
        }

        const productList = await response.json();
        loadedProducts = productList;
        setProductList(productList);

        renderProducts(productList);
        renderHeader(getCart());
        renderFooter();
        renderCartPage(getCart());
        setupFilterButtons();
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
    const product = loadedProducts.find(
        (p) => String(p.id) === String(productId),
    );
    if (!product) return;
    if (product.variants.length > 1) {
        window.location.href = `./product.html?id=${product.id}`;
        return;
    }
    addToCart(productId);
    renderHeader(getCart());
});

document.addEventListener("click", (e) => {
    const quantityBtn = e.target.closest(".js-qty-btn");
    if (quantityBtn) {
        const productId = quantityBtn.dataset.id;
        const action = quantityBtn.dataset.action;
        updateCartQuantity(productId, action);
        renderCartPage(getCart());
        renderHeader(getCart());
        return;
    }

    const removeBtn = e.target.closest(".js-remove-btn");
    if (removeBtn) {
        const productId = removeBtn.dataset.id;
        removeFromCart(productId);
        renderCartPage(getCart());
        renderHeader(getCart());
    }
});

document.addEventListener("input", (e) => {
    if (e.target.id !== "search-input") return;
    searchQuery = e.target.value;
    renderProducts(getFilteredProducts());
});

loadApp();
