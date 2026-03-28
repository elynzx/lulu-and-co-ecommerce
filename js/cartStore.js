let productList = [];
let cart = JSON.parse(localStorage.getItem("cartUser")) || [];

export function setProductList(products) {
    productList = products;
}

export function getCart() {
    return cart;
}

const saveCart = () => localStorage.setItem("cartUser", JSON.stringify(cart));

const createCartProduct = (product, variant) => ({
    id: product.id,
    name: product.name,
    size: variant.size,
    price: variant.price,
    image: product.image,
    quantity: 1,
});

export function addToCart(productId, variant = null) {
    const selectedProduct = productList.find(
        (product) => String(product.id) === String(productId),
    );
    if (!selectedProduct) return;

    const productVariant = variant ?? selectedProduct.variants[0];
    const cartItemId = `${productId}-${productVariant.sku}`;

    const existingProduct = cart.find((product) => product.id === cartItemId);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            ...createCartProduct(selectedProduct, productVariant),
            id: cartItemId,
        });
    }
    saveCart();
}

export function removeFromCart(productId) {
    const productIndex = cart.findIndex(
        (product) => String(product.id) === String(productId),
    );
    if (productIndex !== -1) cart.splice(productIndex, 1);
    saveCart();
}

export function updateCartQuantity(productId, action) {
    const item = cart.find(
        (product) => String(product.id) === String(productId),
    );
    if (!item) return;

    if (action === "increase") {
        item.quantity += 1;
    } else if (action === "decrease") {
        item.quantity -= 1;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        }
    }
    saveCart();
}

export function getCartCount() {
    const incrementTotalQuantity = (total, item) => total + item.quantity;
    return cart.reduce(incrementTotalQuantity, 0);
}

export function getCartSubtotal() {
    const incrementTotalPrice = (total, item) =>
        total + item.price * item.quantity;
    return cart.reduce(incrementTotalPrice, 0);
}

export function getCartTotal(subtotal, shipping) {
    return subtotal + shipping;
}

export function clearCart() {
    cart.splice(0, cart.length);
    saveCart();
}
