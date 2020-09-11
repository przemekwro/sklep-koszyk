<template>
    <v-app>
        <v-main>
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </v-main>
    </v-app>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'App',

        data(){
            return{

            }
        },

        mounted() {
            axios.get('http://www.mocky.io/v2/5ab0d1882e0000e60ae8b7a6')
                .then(result => {
                    let items = [...result.data]
                    this.$store.commit('setProducts', items)
                    for (var i in this.category) {
                        this.category[i].items = result.data.splice(0, 7)
                    }
                })
        }
    };

</script>
<style>
    .router-link-active{
        text-decoration: none;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }
</style>
