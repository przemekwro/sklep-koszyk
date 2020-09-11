<template>
    <div id="product_details">
        <v-container style="max-width: 1200px" class="pa-0">
            <v-row no-gutters>
                <Menu></Menu>
                <v-container class="col-lg-10 col-md-10 col-sm-12 pt-5 pa-0 mb-0" id="right">
                    <v-row id="top" no-gutters align="center" justify="end">
                        <router-link to="/">
                            <v-btn color="white" tile depressed>
                                <v-icon large>mdi-home-outline</v-icon>
                            </v-btn>
                        </router-link>
                        <router-link to="/cart">
                            <v-btn color="white" tile class="" depressed>
                                <v-icon large>mdi-cart-outline</v-icon>
                                <div class="mt-5 d-flex justify-center align-center"
                                     style="margin-left: -5px; z-index: 6; width: 20px; height:20px; border-radius: 25px; border: 1px solid">
                                    <span>{{cart_counter}}</span>
                                </div>
                            </v-btn>
                        </router-link>
                    </v-row>
                    <div class="mt-5" v-if="product">
                        <v-row no-gutters>
                            <div class="col-lg-6 col-md-6 d-flex justify-center justify-sm-center justify-lg-start">
                                <v-img max-width="400" max-height="500"
                                       :src="product.image"></v-img>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12">
                                <div class="pa-5 pt-0">
                                    <h1 class="">{{product.product_name}}</h1>
                                    <h2>{{product.company}}</h2>
                                    <h2 class="mt-2">{{product.price}}</h2>
                                    <div class="mt-16">
                                        <div class="row d-flex align-center justify-space-around mt-10">
                                            <div>
                                                <h1>
                                                    {{price|productPrice}}
                                                </h1>
                                            </div>
                                            <div class="d-flex align-center justify-center">
                                                <v-btn @click="decreaseCounter" icon large>
                                                    <v-icon>mdi-minus</v-icon>
                                                </v-btn>
                                                <h1 class="mr-3 ml-3">{{counter}}</h1>
                                                <v-btn @click="increaseCounter" icon large>
                                                    <v-icon>mdi-plus</v-icon>
                                                </v-btn>
                                            </div>
                                        </div>
                                        <div class="row d-flex justify-center ma-10">
                                            <v-btn @click="addToCart"> Add to cart</v-btn>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </v-row>

                        <h3 class="mt-2">{{product.description}}</h3>
                    </div>
                </v-container>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import store from "@/store";
    import Menu from "@/components/Menu";
    import axios from "axios";

    export default {
        name: 'Product',
        components: {
            Menu
        },

        data() {
            return {
                drawer: false,
                counter: 1,
                product:null,
            }
        },
        computed: {
            price() {
                let product_price = this.product.price.slice(1)
                let priceFloat = parseFloat(product_price)
                return (priceFloat * this.counter).toFixed(2)
            },

            cart_counter() {
                return store.getters.getItemsInCart;
            },
        },

        created(){
            this.product = store.getters.getProduct

            if(!this.product){
                axios.get('http://www.mocky.io/v2/5ab0d1882e0000e60ae8b7a6')
                    .then(result => {
                        const to_filter = result.data
                        this.product = to_filter.filter(p => p.id === Number(this.$route.params.id))[0]
                    })
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
        },

        filters: {
            productPrice: function (value) {
                return `$${value}`
            }
        }

    }
</script>

<style lang="scss">
    #menubar {
        position: sticky;
        top: 0;
        z-index: 7;
    }

</style>
