<template>
    <div id="product_card">
        <v-hover>
            <template v-slot:default="{ hover }">
                <v-card class="product_card" rounded="0">
                    <v-img style="max-width: inherit"
                           :src="product.image">
                    </v-img>
                    <p class="ma-0" style="font-size: 15px; height: 2em; line-height: 1.1">{{product.product_name}}</p>
                    <p style="font-size: 20px">{{product.price}}</p>
                    <v-overlay v-if="hover" absolute color="#c9c9c9">
                        <div class="row ">
                            <div class="col-12 d-flex justify-center">
                                <v-btn color="white" tile @click="addToCartOnce">Buy now</v-btn>
                            </div>
                            <div class="col-12 d-flex justify-center">
                                <v-btn color="white" tile :to="{name: 'Product', params:{id: product.id}}">Details</v-btn>
                            </div>
                        </div>
                    </v-overlay>
                </v-card>
            </template>
        </v-hover>
    </div>
</template>

<script>
    import store from "@/store";

    export default {
        name: 'product',
        props: ['prop_product'],

        data: () => ({
            dialog: false,
            counter: 1,
        }),

        computed: {
            price() {
                var product_price = this.product.price.slice(1)
                var priceFloat = parseFloat(product_price)
                return (priceFloat * this.counter).toFixed(2)
            },
            product() {
                return this.$props['prop_product']
            }
        },

        methods: {
            addToCart() {
                this.$toasted.show(`Added ${this.product.product_name} to cart`, {
                    theme: "toasted-primary",
                    position: "top-right",
                    duration: 2000
                });
                store.commit('addToCartMultiply', {product: this.product, number: this.counter})
                this.counter = 1
                this.offDialog()
            },
            addToCartOnce() {
                this.$toasted.show(`Added ${this.product.product_name} to cart`, {
                    theme: "toasted-primary",
                    position: "top-right",
                    duration: 2000
                });
                store.commit('addToCartOnce', {product: this.product, number: 1})
            },
            increaseCounter() {
                this.counter++
            },
            decreaseCounter() {
                if (this.counter > 1) this.counter--
            },
            onDialog() {
                this.dialog = true
            },
            offDialog() {
                this.dialog = false
            }
        },

        filters: {
            productPrice: function (value) {
                return `$${value}`
            }
        }
    }
</script>

<style lang="scss" scoped>

    .product_card {
        .v-btn {
            background-color: black !important;
        }
        .v-btn:hover {
            color: black;
            background-color: #ccc !important;
        }
    }


</style>
