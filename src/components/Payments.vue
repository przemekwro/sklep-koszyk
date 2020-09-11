<template>
    <div id="payments" class="mt-10 container">
        <h2>Payments</h2>
        <v-radio-group v-model="payments">
            <v-radio label="Credit Card" value="credit_card"></v-radio>
            <v-radio label="Transfer" value="transfer"></v-radio>
        </v-radio-group>
        <transition name="fade" mode="out-in">
            <div key="1" v-if="payments==='transfer'" class="mb-lg-16 mb-md-16 mb-sm-5 mb-5">
                <p>Account number: <br>12 1234 4321 1234 1234 4213 1234</p>
                <p>Title: <br>1808200012</p>
                <p>Address:<br>LOGO<br>123 Somewhere Place<br>Nothest PA 12345-4321</p>
            </div>
            <div key="2" v-else>
                <div class="mb-lg-16 mb-md-16 mb-sm-5 mb-5">
                    <v-row>
                        <div v-if="!stored_card" class="col-lg-6 col-md-6 col-sm-12 col-12 mr-3">
                            <v-row align="center">
                                <v-text-field
                                        v-model="credit_card.month"
                                        label="MM"
                                        :error="date_error"
                                        append-outer-icon="mdi-plus"
                                        @click:append-outer="incrementMonth"
                                        prepend-icon="mdi-minus"
                                        @click:prepend="decrementMonth"
                                        readonly
                                        style="max-width: 6em">
                                </v-text-field>
                                <span class="ml-3 mr-3 text-h4">/</span>
                                <v-text-field
                                        v-model="credit_card.year"
                                        label="YY"
                                        readonly
                                        :error="date_error"
                                        append-outer-icon="mdi-plus"
                                        @click:append-outer="incrementYear"
                                        prepend-icon="mdi-minus"
                                        @click:prepend="decrementYear"
                                        style="max-width: 6em">
                                </v-text-field>
                            </v-row>
                            <v-text-field
                                    :rules="card_cvv_Rules"
                                    v-model="credit_card.cvv"
                                    :error="card_cvv_error"
                                    label="CVV"
                                    type="text"
                                    style="max-width: 10em">
                            </v-text-field>

                            <v-text-field
                                    :rules="card_number_Rules"
                                    v-model="number"
                                    :error="card_number_error"
                                    label="Card number"
                                    type="text"
                                    style="max-width: 16em">
                            </v-text-field>
                            <div>
                                <v-btn @click="saveCard" class="mt-3 mr-3">Save Card</v-btn>
                            </div>
                        </div>
                        <div v-else class="col-lg-6 col-md-6 col-sm-12 col-12">
                                <span class="font-weight-bold">Your card:</span>
                                <p>
                                    <span class="font-weight-bold">Number:</span> {{stored_card.number}}<br>
                                    <span class="font-weight-bold">Validity:</span>
                                    {{stored_card.month}}/{{stored_card.year}}<br>
                                    <span class="font-weight-bold">CVV:</span> {{stored_card.cvv}}
                                </p>
                                <v-btn @click="deleteCard">Delete</v-btn>
                        </div>
                    </v-row>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import store from '@/store'

    export default {
        name: 'page',

        components: {},

        data() {
            return {
                number: '',
                date_error: true,
                card_number_error: true,
                card_cvv_error: true,
                credit_card: {
                    cvv: '',
                    number: '',
                    month: 1,
                    year: 20,
                },
                payments: 'credit_card',
                card_cvv_Rules: [
                    v => !!v || 'CVV is required',
                    v => this.validateCardCvv(v) || 'Must be 3 numbers',
                ],
                card_number_Rules: [
                    v => !!v || 'Card number is required',
                    v => this.validateCardNumber(v) || 'Must be 16 number',
                ],
            }
        },

        methods: {
            validateCardCvv() {
                const reg = new RegExp("^\\d{3}$")
                if (reg.test(this.credit_card.cvv)) {
                    this.card_cvv_error = false;
                    return true;
                }
                this.card_cvv_error = true;
                return false;
            },

            validateCardNumber() {
                const reg = new RegExp("^([0-9]{4}[\\s-]?){3}([0-9]{4})$")
                if (reg.test(this.number)) {
                    this.card_number_error = false;
                    return true;
                }
                this.card_number_error = true;
                return false
            },

            incrementMonth() {
                if (this.credit_card.month < 12)
                    this.credit_card.month++
                this.checkDate()
            },

            decrementMonth() {
                if (this.credit_card.month > 1)
                    this.credit_card.month--
                this.checkDate()
            },

            checkDate() {
                const date = new Date();
                if (this.credit_card.month < date.getMonth() + 1 && this.credit_card.year === date.getFullYear() - 2000) {
                    if (this.date_error === true) {
                        this.date_error = false
                        setTimeout(() => {
                            this.date_error = true
                        }, 300)
                    } else {
                        this.date_error = true
                    }
                } else
                    this.date_error = false
            },

            decrementYear() {
                let today = new Date()
                let current = today.getFullYear()
                let year = `20${this.credit_card.year}`
                if (parseInt(year) > current)
                    this.credit_card.year--
                this.checkDate()
            },

            incrementYear() {
                this.credit_card.year++
                this.checkDate()
            },

            cardValidate() {
                if (!this.validateCardCvv() || !this.validateCardNumber()) {
                    return false
                }

                let date = new Date();
                const currentYear = date.getFullYear() - 2000;
                const currentMonth = date.getMonth() + 1;

                const card = this.credit_card

                if ((currentMonth > card.month && currentYear === card.year) || currentYear > card.year) {
                    this.checkDate()
                    return false
                }

                return true
            },

            saveCard() {
                if (!this.cardValidate()) {
                    return false;
                }

                const card = this.credit_card;
                store.commit('saveCard', {
                    cvv: card.cvv,
                    number: this.number,
                    month: card.month,
                    year: card.year
                })
            },

            deleteCard() {
                store.commit('deleteCard')
            },
        },

        computed: {
            stored_card() {
                return store.getters.getCard;
            },
        },

        watch: {
            number: function () {
                if (this.number.length === 4 || this.number.length === 9 || this.number.length === 14)
                    this.number += '-'
            },
            payments: function (value) {
                if (value === 'credit_card')
                    store.commit('saveCard', null)
                else
                    store.commit('saveCard', 'transfer')
            }
        },

    }
</script>

<style lang="scss" scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }

</style>
