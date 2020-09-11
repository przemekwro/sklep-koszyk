<template>
    <div id="address" class="mt-10 container">
        <h2>Address</h2>
        <transition name="fade" mode="out-in">
            <div key="1" v-if="!stored_address">
                <v-row>
                    <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                        <v-text-field v-model="address.name" label="Name" :rules="nameRules" :error="errors.name"
                                      placeholder="John Murphy"></v-text-field>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                        <v-text-field v-model="address.email" label="Email" placeholder="email@email.com"
                                      :error="errors.email"
                                      :rules="emailRules"></v-text-field>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-12 col-12">
                        <v-text-field v-model="address.street" placeholder="16 St Peters Street" :error="errors.street"
                                      :rules="streetRules"
                                      label="Street"></v-text-field>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-6 col-6">
                        <v-text-field v-model="address.post" placeholder="XX-XXX" :rules="postRules"
                                      :error="errors.post"
                                      label="Post Code"></v-text-field>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-6 col-6">
                        <v-text-field v-model="address.city" placeholder="London" :rules="cityRules"
                                      :error="errors.city"
                                      label="City"></v-text-field>
                    </div>
                </v-row>
                <v-row justify="end" class="ma-6 mb-10">
                    <v-btn @click="saveAddress">Save address</v-btn>
                </v-row>
            </div>
            <div key="2" v-else>
                <span class="font-weight-bold">Your address:</span>
                <div class="mb-10" style="height: 5em">
                    <p>
                        {{stored_address.name}}<br>
                        {{stored_address.street}}<br>
                        {{stored_address.post}} {{stored_address.city}}<br>
                        {{stored_address.email}}
                    </p>
                    <v-btn @click="deleteAddress">Delete</v-btn>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import store from '@/store'
    import VueScrollTo from "vue-scrollto";

    export default {
        name: 'address',

        data() {
            return {
                address: {
                    post: '',
                    name: '',
                    email: '',
                    street: '',
                    city: '',
                },
                errors: {
                    post: true,
                    name: true,
                    email: true,
                    street: true,
                    city: true,
                },
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => this.validateEmail(v) || 'E-mail must be valid',
                ],
                postRules: [
                    v => !!v || 'Post number is required',
                    v => (this.validatePostCode(v) && v.length == 6) || 'Must be XX-XXX',
                ],
                nameRules: [
                    v => !!v || 'Name is required',
                    v => (v.length > 2) && this.validateName() || 'Must be letters and more than 2 characters',
                ],
                streetRules: [
                    v => !!v || 'Street is required',
                    v => this.validateStreet(v) || 'Must has number and more than 3 characters'
                ],
                cityRules: [
                    v => !!v || 'City is required',
                    v => (v.length > 1) || 'Must be 2 or more letters',
                    v => this.validateCity(v) || 'Letters only'
                ],
            }
        },

        methods: {
            validateName() {
                if (this.address.name.length < 3) {
                    this.errors.name = true
                    return false;
                }

                const reg = new RegExp("^[a-zA-Z\\sżźćńółęąśŻŹĆĄŚĘŁÓŃ]*$");
                if (reg.test(this.address.name)) {
                    this.errors.name = false
                    return true
                }
                this.errors.name = true
                return false;
            },

            validatePostCode() {
                const reg = new RegExp("^\\d{2}-\\d{3}$")
                if (reg.test(this.address.post)) {
                    this.errors.post = false
                    return true
                }
                this.errors.post = true
                return false
            },

            validateStreet() {
                const reg = new RegExp("^[0-9a-zA-Z. ?\\/ ?\\.żźćńółęąśŻŹĆĄŚĘŁÓŃ]+. +[0-9a-zA-Z?\\/\\.żźćńółęąśŻŹĆĄŚĘŁÓŃ]+ *$")
                if (reg.test(this.address.street)) {
                    this.errors.street = false
                    return true
                }
                this.errors.street = true
                return false
            },

            validateEmail() {
                const reg = new RegExp("^(([^<>()[\\]\\\\.,;:\\s@\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$")
                if (reg.test(String(this.address.email.toLowerCase()))) {
                    this.errors.email = false
                    return true
                }
                this.errors.email = true
                return false
            },

            validateCity() {
                if (this.address.city.length < 2) {
                    this.errors.city = true
                    return false
                }

                const reg = new RegExp("^[a-zA-Z\\sżźćńółęąśŻŹĆĄŚĘŁÓŃ]*$");
                if (reg.test(this.address.city)) {
                    this.errors.city = false
                    return true
                }
                this.errors.city = true
                return false
            },

            addressValidate() {
                if (this.validateName() && this.validateEmail() && this.validateStreet() && this.validatePostCode() && this.validateCity()) {
                    return true
                }
                return false
            },

            saveAddress() {
                if (!this.addressValidate()) {
                    VueScrollTo.scrollTo('#address', {duration: 500, offset: -100})

                    return false
                }

                const addr = this.address
                store.commit('saveAddress',
                    {
                        post: addr.post,
                        name: addr.name,
                        email: addr.email,
                        street: addr.street,
                        city: addr.city,
                    })

            },

            deleteAddress() {
                store.commit('deleteAddress')
            },
        },

        computed: {
            stored_address() {
                return store.getters.getAddress;
            },
        },
    }
</script>

<style lang="scss" scoped>

</style>
