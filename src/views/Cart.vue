<template>
    <div>
        <v-container style="max-width: 1200px" id="page" class="pa-0">
            <v-row no-gutters>
                <MenuCart class="pa-0"></MenuCart>
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

                    <div class="container">
                        <h2>Your cart</h2>
                        <div v-if="cart.length === 0">
                            Your cart is empty.
                        </div>
                        <div v-if="cart.length">
                            <v-row v-for="item in cart" class="pb-5" no-gutters :key="item.id">
                                <Cart_item :prop_product="item"></Cart_item>
                            </v-row>
                        </div>
                    </div>
                    <div v-if="cart.length">
                        <div class="row">
                            <Address></Address>

                            <Payments></Payments>
                        </div>
                        <v-row class="mb-10" justify="end" align-content="center" no-gutters>
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

                        <v-dialog max-width="800px" v-model="summary">
                            <v-card class="" tile>
                                <v-container class="pt-0">
                                    <div class="row d-flex justify-space-between align-center">
                                        <div></div>
                                        <div>
                                            <h2>Summary</h2>
                                        </div>
                                        <div class="">
                                            <v-btn @click="offSummary" large icon tile>
                                                <v-icon>mdi-close</v-icon>
                                            </v-btn>
                                        </div>
                                    </div>

                                    <div class="row mt-5 mb-5">
                                        <div v-if="address" class="col-lg-6 col-md-6 col-sm-12 col-12 d-flex justify-center">
                                            <p>
                                                {{address.name}}<br>
                                                {{address.street}}<br>
                                                {{address.post}} {{address.city}}<br>
                                                {{address.email}}
                                            </p>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-12 d-flex justify-center">
                                            <div v-if="payments === 'transfer'">
                                                <p>Account number: <br>12 1234 4321 1234 1234 4213 1234</p>
                                                <p>Title: <br>1808200012</p>
                                                <p>Address:<br>LOGO<br>123 Somewhere Place<br>Nothest PA 12345-4321
                                                </p>
                                            </div>
                                            <div v-else>
                                                <div v-if="payments">
                                                    <p>
                                                        <span class="font-weight-bold">Number:</span>
                                                        {{payments.number}}<br>
                                                        <span class="font-weight-bold">Validity:</span>
                                                        {{payments.month}}/{{payments.year}}<br>
                                                        <span class="font-weight-bold">CVV:</span> {{payments.cvv}}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <v-row v-for="item in cart" class="" no-gutters :key="item.id">
                                            <Confirm_item :prop_product="item"></Confirm_item>
                                        </v-row>
                                    </div>

                                    <div class="row d-flex justify-space-around ma-4">
                                        <v-btn @click="offSummary">Reject</v-btn>
                                        <v-btn>Confirm</v-btn>
                                    </div>
                                </v-container>
                            </v-card>
                        </v-dialog>
                    </div>
                </v-container>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import store from "@/store";
    import Cart_item from "@/components/Cart_item";
    import Confirm_item from "@/components/Confirm_item";
    import MenuCart from "@/components/MenuCart";
    import Address from "@/components/Address";
    import Payments from "@/components/Payments";
    import VueScrollTo from "vue-scrollto";

    export default {
        name: 'cart',

        components: {
            Cart_item,
            MenuCart,
            Address,
            Payments,
            Confirm_item
        },

        data() {
            return {
                summary: false,
            }
        },

        methods: {
            buy() {
                const address = store.getters.getAddress
                const payments = store.getters.getCard

                if (!address) {
                    VueScrollTo.scrollTo('#address', {duration: 500, offset: -100})
                    this.$toasted.show(`Save address first`, {
                        theme: "toasted-primary",
                        position: "top-right",
                        duration: 2000
                    });

                    return false
                }
                if (!payments) {
                    VueScrollTo.scrollTo('#payments', {duration: 500, offset: -100})
                    this.$toasted.show(`Save card first`, {
                        theme: "toasted-primary",
                        position: "top-right",
                        duration: 2000
                    });
                    return false
                }

                this.summary = true;
            },

            offSummary() {
                this.summary = false;
            }
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

            cart_counter() {
                return store.getters.getItemsInCart;
            },

            cart_price() {
                return store.getters.getCartValue
            },

            address() {
                return store.getters.getAddress
            },

            payments() {
                console.log(store.getters.getCard)
                return store.getters.getCard
            },
        },
    }
</script>

<style lang="scss" scoped>

    .fade-enter-active {
        transition: all 0.3s ease;
    }

    .fade-leave-active {
        transition: all 0.3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .fade-enter, .fade-leave-to
        /* .slide-fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }

</style>
