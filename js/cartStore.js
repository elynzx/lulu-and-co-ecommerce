import { productList } from './data'

const createProduct = (product) => ({
  id: product.id,
  name: product.name,
  price: product.variants[0].price,
  image: product.image,
  quantity: 1,
})

export let cart = JSON.parse(localStorage.getItem("cartUser")) || []

export function addToCart(idProduct) {
  const selectedProduct = productList.find(product => product.id === idProduct)
  const existingProduct = cart.find(product => product.id === idProduct)

  if (existingProduct) {
    existingProduct.qty += 1
  } else {
    cart.push(createProduct(selectedProduct))
  }

  saveCart()
}

const saveCart = () => localStorage.setItem("cartUser", JSON.stringify(cart))

export function getCartTotal() {
  const incrementTotalPrice = (total, item) => total + (item.price * item.quantity)
  return cart.reduce(incrementTotalPrice, 0)
}