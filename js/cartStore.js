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
        (product) => product.id === idProduct,
    );
    const existingProduct = cart.find((product) => product.id === idProduct);

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
