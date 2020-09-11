<template>
    <div>
        <v-row id="top" no-gutters align="center" justify="end">
            <transition name="fade">
                <div v-show="search" style="max-height: 36px; max-width: 200px ">
                    <v-text-field :rules="rules" v-model="search_field" class="pa-0" color="gray"
                                  label="Search"></v-text-field>
                </div>
            </transition>
            <v-btn @click="onOffSearch" class="mr-3 ml-3"
                   tile icon>
                <v-icon color="black" large>mdi-magnify</v-icon>
            </v-btn>
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
        <transition name="slide">
            <v-img id="picture" class="mt-5" max-width="100%" alt="obrazek" src="../assets/jeans.jpg">
                <div class="ma-16">
                    <h1>New arrivals</h1>
                    <h3>COLLECTION 2016</h3>
                    <v-btn @click="$vuetify.goTo('#products')" tile> Shop here</v-btn>
                </div>
            </v-img>
        </transition>
        <transition name="fade">
            <v-container>

                <div id="products" class="pt-10" v-if="category">
                    <div :id="cat.name" v-for="cat in filteredItems" :key="cat.name">
                        <h2>{{cat.name}}</h2>
                        <div class="row">
                            <div v-if="cat.items.length==0">
                                <p>Items not found</p>
                            </div>
                            <div v-for="item in cat.items" class="col-lg-3 offset-0 col-md-4 col-6 pt-0"
                                 :key="item.id">
                                <Product :prop_product="item"></Product>
                            </div>
                        </div>
                    </div>
                </div>
            </v-container>
        </transition>
    </div>
</template>

<script>
    import store from "@/store";
    import Product from "@/components/Product";

    export default {
        name: 'page',

        components: {
            Product,
        },

        data() {
            return {
                cart_open: null,
                downloaded: false,
                search_field: '',
                search: false,
                rules: [
                    value => (value && value.length >= 3) || 'Min 3 characters'
                ],
            }
        },

        methods: {
            onOffSearch() {
                if (this.search) {
                    this.search_field = ''
                    this.search = false
                } else {
                    this.search = true
                }
            },

        },

        computed: {
            category() {
                const category = store.getters.getCategory
                if(category) {
                    return category
                }
                return null
            },

            cart_counter() {
                return store.getters.getItemsInCart;
            },

            filteredItems() {
                let list = store.getters.getCategory;

                if(!list){
                    return null
                }

                if (this.search_field.length <= 2) {
                    return list;
                }
                let newlist = [];
                const lower_search_field = this.search_field.toLowerCase()
                for (let i in list) {
                    let find_elements = list[i].items.filter(items => items.product_name.toLowerCase().includes(lower_search_field));
                    newlist.push({name: list[i].name, items: find_elements});
                }
                return newlist;
            }
        },
        created() {
            store.dispatch('downloadProducts')
        },
    }
</script>

<style lang="scss" scoped>
    a{
        text-decoration: none;
    }
    .fade-enter-active {
        transition: all .3s ease;
    }

    .fade-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .fade-enter, .fade-leave-to
        /* .slide-fade-leave-active below version 2.1.8 */
    {
        transform: translateY(-60px);
    }

    #picture {
        h1, h3, h4, h5, h6 {
            color: white;
            letter-spacing: 4px;
            font-family: 'Montserrat', sans-serif;
        }
    }
</style>
