let productList = [];

export function setProductList(products) {
    productList = products;
}

const createCartProduct = (product) => ({
    id: product.id,
    name: product.name,
    price: product.variants[0].price,
    image: product.image,
    quantity: 1,
});

export let cart = JSON.parse(localStorage.getItem("cartUser")) || [];

export function addToCart(idProduct) {

    const selectedProduct = productList.find(
        (product) => String(product.id) === String(idProduct),
    );
    if (!selectedProduct) return; 

    const existingProduct = cart.find(
        (product) => String(product.id) === String(idProduct),
    );

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(createCartProduct(selectedProduct));
    }
    saveCart();
}


const saveCart = () => localStorage.setItem("cartUser", JSON.stringify(cart));

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

export function updateCartQuantity(id, action) {
    const item = cart.find((product) => String(product.id) === String(id));
    if (!item) return;
    if (action === "increase") {
        item.quantity += 1;
    } else if (action === "decrease") {
        item.quantity -= 1;
        if (item.quantity <= 0) {
            const idx = cart.findIndex(
                (product) => String(product.id) === String(id),
            );
            if (idx !== -1) cart.splice(idx, 1);
        }
    }
    saveCart();
}
