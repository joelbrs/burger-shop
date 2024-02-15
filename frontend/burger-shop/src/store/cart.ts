import type { ProductCart, ProductDTOOut } from '@/@types'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: {
      products: [] as ProductCart[],
      total: ''
    }
  }),
  actions: {
    SET_CART(cart: string) {
      this.cart.products = JSON.parse(cart)

      this.SET_TOTAL()
    },
    ADD_PRODUCT(product: ProductDTOOut) {
      const cartProduct = this.cart.products.find((item) => item.id === product.id)

      if (cartProduct) {
        const index = this.cart.products.indexOf(cartProduct)
        this.cart.products[index].quantity += 1
      } else {
        this.cart.products.push({ ...product, quantity: 1 })
      }
      this.SET_TOTAL()
      localStorage.setItem('cart', JSON.stringify(this.cart.products))
    },
    FIND_PRODUCT(id: string) {
      return this.cart.products.find((item) => item.id === id)
    },
    REMOVE_PRODUCT(product: ProductDTOOut) {
      const cartProduct = this.cart.products.find((item) => item.id === product.id)

      if (cartProduct) {
        const index = this.cart.products.indexOf(cartProduct)

        if (cartProduct.quantity === 1) {
          this.cart.products.splice(index, 1)
        } else {
          this.cart.products[index].quantity -= 1
        }
        localStorage.setItem('cart', JSON.stringify(this.cart.products))

        this.SET_TOTAL()
      }
    },
    SET_TOTAL() {
      const total = this.cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0)

      this.cart.total = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
        total
      )
    },
    DESTROY_CART() {
      this.cart.products = []
      this.SET_TOTAL()
      localStorage.removeItem('cart')
    }
  }
})
