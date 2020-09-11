<template>
    <div id="menubar" class="d-flex flex-column col-lg-2 col-md-2">
        <v-row id="nav" no-gutters justify="space-between" class="pa-0 hidden-md-and-up w-100 black">
            <h2 class="ml-5 logo nav_item" @click="$vuetify.goTo('#home')"> LOGO</h2>
            <v-btn class="ma-6 mt-8 nav_item" @click="onNavigation" icon tile>
                <v-icon large>mdi-menu</v-icon>
            </v-btn>
        </v-row>
        <div id="big_menu" style="position: sticky; top:25px" class="hidden-sm-and-down sticky-top">
            <div @click="$vuetify.goTo('#top',{offset:-100})">
                <h2 class="position-absolute ml-5 mt-0 mb-16  logo"> LOGO</h2>
            </div>
            <div class="pt-10 pr-4 pt-sm-5">
                <v-btn class="justify-start text-capitalize font-weight-regular mb-10"
                       text tile x-large height="35" width="100%" to="#top" @click="$vuetify.goTo('#top',{offset:30})">
                    Up
                </v-btn>
                <div class="category-button">
                    <v-btn v-for="cat in category" class="justify-start text-capitalize"
                           text :to="`#${cat.name}`" tile x-large height="35" width="100%"
                           @click="$vuetify.goTo(`#${cat.name}`,{offset:30})"
                           :key="cat.name">{{cat.name}}
                    </v-btn>
                </div>

                <div class="mt-10 contacta">
                    <router-link :to="{ path: '/', hash:'subscribe'}">
                        <v-btn class="justify-start text-capitalize font-weight-regular"
                               text tile x-large height="35" width="100%">
                            Subscribe
                        </v-btn>
                    </router-link>

                    <v-btn class="justify-start text-capitalize font-weight-regular"
                           text tile x-large height="35" width="100%" @click="onNewsletter">
                        Newsletter
                    </v-btn>

                    <router-link :to="{ path: '/', hash:'contact'}">
                        <v-btn class="justify-start text-capitalize font-weight-regular"
                               text tile x-large height="35" width="100%"
                        >
                            Contact
                        </v-btn>
                    </router-link>
                </div>
            </div>
        </div>
        <div id="small_menu" class="hidden-md-and-up">
            <v-navigation-drawer v-model="drawer" fixed temporary>
                <div>
                    <v-row no-gutters justify="end">
                        <span></span>
                        <v-btn @click="offNavigation" tile icon>
                            <v-icon color="black">mdi-close</v-icon>
                        </v-btn>
                    </v-row>
                    <h2 class="position-absolute ml-5 mt-0 logo"> LOGO</h2>
                </div>
                <div class="pt-10">
                    <v-btn class="justify-start text-capitalize font-weight-regular mb-10"
                           text tile x-large height="35" width="100%" to="#top"
                           @click="$vuetify.goTo('#top',{offset:100})"> Up
                    </v-btn>
                    <div class="category-button">
                        <v-btn v-for="cat in category" class="justify-start text-capitalize"
                               text :to="`#${cat.name}`" tile x-large height="35" width="100%"
                               @click="$vuetify.goTo(`#${cat.name}`,{offset:100})"
                               :key="cat.name">{{cat.name}}
                        </v-btn>
                    </div>

                    <div class="mt-10 contacta">
                        <v-btn class="justify-start text-capitalize font-weight-regular contact"
                               text tile x-large height="35" width="100%" to="#subscribe"
                               @click="$vuetify.goTo('#subscribe',{offset:30})">
                            Subscribe
                        </v-btn>

                        <v-btn class="justify-start text-capitalize font-weight-regular contact"
                               text tile x-large height="35" width="100%" @click="onNewsletter">
                            Newsletter
                        </v-btn>
                        <v-dialog max-width="800px" v-model="newsletter">
                            <v-card class="pa-7 pt-3">
                                <v-container>
                                    <div class="row">
                                        <div class="col d-flex justify-center"></div>
                                        <div class="col d-flex justify-center"><h2>Newsletter</h2></div>
                                        <div class="col d-flex justify-center">
                                            <v-btn @click="offNewsletter" large icon>
                                                <v-icon>mdi-close</v-icon>
                                            </v-btn>
                                        </div>
                                        <div class="col-12 d-flex justify-center">Join our mailing list to receive
                                            updates on new
                                            arrivals and special offers.
                                        </div>
                                    </div>
                                    <div>
                                        <v-text-field label="Your Email"></v-text-field>
                                        <div class="d-flex justify-center">
                                            <v-btn color="red">Subscribe</v-btn>
                                        </div>
                                    </div>
                                </v-container>
                            </v-card>
                        </v-dialog>
                        <v-btn class="justify-start text-capitalize font-weight-regular contact"
                               text tile x-large height="35" width="100%" to="#contact"
                               @click="$vuetify.goTo('#contact'),{offset:10}">
                            Contact
                        </v-btn>
                    </div>
                </div>
            </v-navigation-drawer>
        </div>
    </div>
</template>

<script>

    import store from "@/store";

    export default {
        name: 'menubar',

        data() {
            return {
                newsletter: false,
                drawer: false,
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
            }
        },

        methods: {
            setCategory(category) {
                store.commit('setSelectedCategory', category)
            },
            onNewsletter() {
                this.newsletter = true
            },
            offNewsletter() {
                this.newsletter = false
            },
            onNavigation() {
                return this.drawer = true
            },
            offNavigation() {
                return this.drawer = false
            },
        },

        mounted() {
            this.setCategory(this.category)
        },

        computed: {
            cart() {
                return store.getters.getCart
            }
        },
    }
</script>

<style lang="scss">
    .nav_item {
        margin-top: 36px;
        color: white !important;
    }

    #big_menu, #small_menu {
        .v-btn:hover {
            background-color: #ccc !important;
        }

        .v-btn--active {
            background-color: #ccc !important;
        }
    }

    .category-button {
        .v-btn {
            color: #757575 !important;
            font-weight: bold !important;
            font-size: 18px !important;
        }

        .v-btn:hover {
            color: black !important;
            background-color: #ccc !important;
        }

        .v-btn--active {
            color: black !important;
        }
    }


    .logo {
        margin-top: 36px;
        font-size: 24px;
        letter-spacing: 4px;
        font-family: 'Montserrat', sans-serif;
        cursor: pointer;
    }


</style>
