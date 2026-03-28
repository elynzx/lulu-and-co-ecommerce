import { addToCart, getCart, setProductList } from "./cartStore.js";
import { renderHeader, renderFooter } from "./ui.js";
import { renderProductDetail } from "../components/ProductDetail/productDetail.js";

const API_URL =
    "https://raw.githubusercontent.com/elynzx/lulu-co-api/refs/heads/main/products.json";

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

let selectedVariant = null;
let quantity = 1;

async function loadProductPage() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Response error: ${response.status}`);

        const productList = await response.json();
        setProductList(productList);

        const product = productList.find(
            (p) => String(p.id) === String(productId),
        );

        if (!product) {
            window.location.href = "./index.html";
            return;
        }

        selectedVariant = product.variants[0];

        renderHeader(getCart());
        renderFooter();
        renderProductDetail(product);
        setupListeners(product);
    } catch (error) {
        console.error("Failed to load product:", error.message);
    }
}

function setupListeners(product) {
    document
        .getElementById("variant-container")
        ?.addEventListener("click", (e) => {
            const btn = e.target.closest(".variant-btn");
            if (!btn) return;

            selectedVariant = product.variants[Number(btn.dataset.index)];
            document.getElementById("product-price").textContent =
                `$${selectedVariant.price.toFixed(2)}`;

            document
                .querySelectorAll(".variant-btn")
                .forEach((b) =>
                    b.classList.remove("bg-[#C92B5D]", "text-white"),
                );
            btn.classList.add("bg-[#C92B5D]", "text-white");
        });

    document.getElementById("qty-decrease")?.addEventListener("click", () => {
        if (quantity <= 1) return;
        quantity--;
        document.getElementById("product-quantity").textContent = quantity;
    });

    document.getElementById("qty-increase")?.addEventListener("click", () => {
        if (quantity >= selectedVariant.stock) return;
        quantity++;
        document.getElementById("product-quantity").textContent = quantity;
    });

    document
        .getElementById("add-to-cart-btn")
        ?.addEventListener("click", () => {
            for (let i = 0; i < quantity; i++) {
                addToCart(product.id, selectedVariant);
            }
            renderHeader(getCart());

            const btn = document.getElementById("add-to-cart-btn");
            const original = btn.textContent;
            btn.textContent = "Added !";
            btn.classList.add("bg-[#09346d]");
            setTimeout(() => {
                btn.textContent = original;
                btn.classList.remove("bg-[#09346d]");
            }, 1500);
        });
}

loadProductPage();
