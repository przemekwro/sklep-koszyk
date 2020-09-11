<template>
    <div id="home">
        <v-container style="max-width: 1200px" id="page" class="pa-0">
            <v-row no-gutters>
                <Menu id="left"></Menu>
                <v-container class="col-lg-10 col-md-10 col-sm-12 pt-5 pa-0 mb-0" id="right">
                    <Page></Page>
                    <Contact></Contact>
                </v-container>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Menu from '@/components/Menu.vue'
    import Page from "@/components/Page";
    import Contact from "@/components/Contact";

    export default {
        name: 'Home',
        components: {
            Menu,
            Page,
            Contact
        },

        data() {
            return {
                drawer: false
            }
        },

        methods: {}
    }
</script>

<style lang="scss">
    #home {
        #left {
            position: sticky;
            top: 0;
            z-index: 7;
        }

        #right {
            font-size: 24px;
            letter-spacing: 3px;
            font-family: 'Montserrat', sans-serif;
        }
    }
</style>
