<template>
    <div id="cart">
        <v-card class="pa-6" rounded="0" color="white">
            <h2>Your cart</h2>
            <div v-if="cart.length ==0">
                Your cart is empty.
            </div>
            <div v-else>
                    <v-row v-for="item in cart" class="pb-5" no-gutters :key="item.id">
                        <Cart_item :prop_product="item"></Cart_item>
                    </v-row>
                <v-row justify="end" align-content="center" no-gutters>
                    <v-col align-self="center" class="justify-center">
                        <div class="d-flex justify-center">
                            <span>All: ${{cart_price}}</span>
                        </div>
                    </v-col>
                    <v-col>
                        <div class="d-flex justify-center">
                            <v-btn @click="buy">Buy</v-btn>
                        </div>
                    </v-col>
                </v-row>
            </div>
        </v-card>
    </div>
</template>

<script>
    import store from "@/store";
    import Cart_item from "@/components/Cart_item";

    export default {
        name: 'cart',

        components: {
            Cart_item
        },

        computed: {
            cart() {
                return store.getters.getCart
            },
            product_to_cart() {
                return {
                    product: this.$props['product'],
                    number: this.counter,
                }
            },
            cart_price() {
                return store.getters.getCartValue
            },
        },

        methods: {
            buy() {
                store.commit('clearCart')
            },
        },
    }
</script>

<style lang="scss" scoped>

</style>
