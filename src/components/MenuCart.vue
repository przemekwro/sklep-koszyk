<template>
    <div id="menubar" class="d-flex flex-column col-lg-2 col-md-2">
        <v-row id="nav" no-gutters justify="space-between" class="pa-0 hidden-md-and-up w-100 black">
            <router-link :to="{path:'/'}">
                <h2 class="ml-5 logo nav_item"> LOGO</h2>
            </router-link>
            <v-btn class="ma-6 mt-8 nav_item" @click="onNavigation" icon tile>
                <v-icon large>mdi-menu</v-icon>
            </v-btn>
        </v-row>
        <div id="big_menu" style="position: sticky; top:25px" class="hidden-sm-and-down sticky-top">
            <router-link to="/">
                <div>
                    <h2 class="position-absolute ml-5 mt-0 mb-16  logo"> LOGO</h2>
                </div>
            </router-link>
            <div>
                <router-link :to="{path:'/cart', hash:'#right'}">
                    <v-btn class="justify-start text-capitalize font-weight-regular contact"
                           text tile x-large height="35" width="100%">
                        Cart
                    </v-btn>
                </router-link>
                <router-link :to="{path:'/cart', hash:'address'}">
                    <v-btn class="justify-start text-capitalize font-weight-regular contact"
                           text tile x-large height="35" width="100%">
                        Address
                    </v-btn>
                </router-link>
                <router-link :to="{path:'/cart', hash:'payments'}">
                    <v-btn class="justify-start text-capitalize font-weight-regular contact"
                           text tile x-large height="35" width="100%">
                        Payments
                    </v-btn>
                </router-link>
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
                    <router-link to="/">
                        <h2 class="position-absolute ml-5 mt-0 logo"> LOGO</h2>
                    </router-link>
                </div>
                <div class="pt-10">
                    <router-link :to="{path:'/cart', hash:'right'}">
                        <v-btn class="justify-start text-capitalize font-weight-regular contact"
                               text tile x-large height="35" width="100%">
                            Cart
                        </v-btn>
                    </router-link>
                    <router-link :to="{path:'/cart', hash:'address'}">
                        <v-btn class="justify-start text-capitalize font-weight-regular contact"
                               text tile x-large height="35" width="100%">
                            Address
                        </v-btn>
                    </router-link>
                    <router-link :to="{path:'/cart', hash:'payments'}">
                        <v-btn class="justify-start text-capitalize font-weight-regular contact"
                               text tile x-large height="35" width="100%">
                            Payments
                        </v-btn>
                    </router-link>
                </div>
            </v-navigation-drawer>
        </div>

    </div>
</template>

<script>

    export default {
        name: 'menubar',

        data() {
            return {
                drawer: false,
            }
        },

        methods: {
            onNavigation() {
                return this.drawer = true
            },
            offNavigation() {
                return this.drawer = false
            },
        }
    }
</script>

<style lang="scss">

    .nav_item {
        margin-top: 36px;
        color: white !important;
    }

    #big_menu, #small_menu {
        .logo{
            color: black!important;
        }
        a {
            text-decoration: none !important;
        }

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
