import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        category: [
            {
                name: 'Shirts',
                items: []
            },
            {
                name: 'Dresses',
                items: []
            },
            {
                name: 'Jeans',
                items: []
            },
            {
                name: 'Jackets',
                items: []
            },
            {
                name: 'Gymwear',
                items: []
            },
        ],
        cart: JSON.parse(localStorage.getItem('cart')) || [],
        products: null,
        address:JSON.parse(localStorage.getItem('address')) || null,
        card: null,
    },
    mutations: {
        setCategory(state, category) {
            state.category = category
        },

        addToCartOnce(state, item) {
            var position = -1
            for (var i in state.cart) {
                if (state.cart[i].product.id === item.product.id) {
                    position = i
                }
            }
            if (position !== -1) {
                state.cart[position].number++
            } else {
                state.cart.push(item)
            }
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },

        setProducts(state, products) {
            state.products = products
        },

        addToCartMultiply(state, item) {
            var position = -1
            for (var i in state.cart) {
                if (state.cart[i].product.id === item.product.id) {
                    position = i
                }
            }
            if (position !== -1) {
                state.cart[position].number += item.number
            } else {
                state.cart.push(item)
            }
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },

        decreaseNumber(state, item) {
            for (var i in state.cart) {
                if (item.product.id === state.cart[i].product.id) {
                    if (state.cart[i].number === 1) {
                        state.cart.splice(i, 1)
                        break
                    }
                    state.cart[i].number--
                    break
                }
            }
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },

        removeFromCart(state, item) {
            for (var i in state.cart) {
                if (state.cart[i].product.id === item.product.id) {
                    state.cart.splice(i, 1)
                    break
                }
            }
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },

        clearCart(state) {
            state.cart = []
        },

        saveAddress(state, address){
            state.address = address;
            localStorage.setItem('address', JSON.stringify(state.address));
        },

        saveCard(state, card){
            state.card = card
        },

        deleteCard(state){
            state.card = null
        },

        deleteAddress(state){
            state.address = null
            localStorage.removeItem('address')
        }
    },

    actions: {
        downloadProducts(state) {
            if (state.products){
                return state.products
            }

            axios.get('https://www.mocky.io/v2/5ab0d1882e0000e60ae8b7a6')
                .then(result => {
                    let category = this.state.category
                    state.products = [...result.data]
                    for (let i in category) {
                        category[i].items = result.data.splice(0, 7)
                    }
                    state.category=category
                    return category
                })
        },
    },

    modules: {},

    getters: {
        getCategory(state) {
            return state.category
        },

        getCart(state) {
            return state.cart
        },

        getItemsInCart(state) {
            var number = 0
            for (var i in state.cart) {
                number += state.cart[i].number
            }
            return number
        },
        getCartValue(state) {
            var value = 0
            for (var i in state.cart) {
                value += state.cart[i].product.price.slice(1) * state.cart[i].number
            }
            return value.toFixed(2)
        },
        getProduct(state, id) {
            if(!state.products) {
                return null
            }
            return state.products.filter(p => p.id === Number(id))[0]
        },

        getProducts(state) {
            return state.products;
        },

        getAddress(state){
            return state.address;
        },

        getCard(state){
            return state.card;
        },

    }
})
