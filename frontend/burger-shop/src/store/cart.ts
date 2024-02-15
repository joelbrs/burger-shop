import type { ProductCart, ProductDTOOut } from '@/@types'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: {
      products: [] as ProductCart[],
      total: 0
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
        this.cart.products[index].total =
          Number(this.cart.products[index].total) + Number(product.price)
      } else {
        this.cart.products.push({ ...product, quantity: 1, total: product.price })
      }
      this.SET_TOTAL()
      localStorage.setItem('cart', JSON.stringify(this.cart.products))
    },
    GET_ALL_PRODUCTS_FORMATTED() {
      const cart = this.cart.products.map((item) => {
        return {
          ...item,
          price: this.FORMAT_PRICE(item.price),
          total: this.FORMAT_PRICE(item.total)
        }
      })

      if (!cart) return []

      return cart
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
      this.cart.total = this.cart.products.reduce((acc, item) => acc + item.total, 0)
    },
    FORMAT_PRICE(price: number) {
      return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
    },
    DESTROY_CART() {
      this.cart.products = []
      this.SET_TOTAL()
      localStorage.removeItem('cart')
    }
  }
})
