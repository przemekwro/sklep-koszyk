<template>
    <div class="row no-gutters cart_item pb-3 pt-3 mb-10">
        <div class="col-8 col-lg-4 col-md-3 col-sm-8 d-flex align-center justify-start justify-sm-start">
            <span>{{product.product_name}}</span>
        </div>
        <div class="col-4 col-lg-3 col-md-2 col-sm-4 d-flex align-center justify-center">
            <span>{{product.price}}</span>
        </div>
        <div class="col-4 col-lg-2 col-md-3 col-sm-4 d-flex align-center justify-end">
            <span>{{prop_product.number}}</span>
        </div>
        <div class="col-4 col-lg-3 col-md-2 col-sm-4 d-flex align-center justify-end">
            {{price|productPrice}}
        </div>
    </div>
</template>

<script>

    export default {
        name: 'cart_item',
        props: ['prop_product'],

        computed: {
            price() {
                var product_price = this.product.price.slice(1)
                var priceFloat = parseFloat(product_price)
                return (priceFloat * this.$props['prop_product'].number).toFixed(2)
            },
            product() {
                return this.$props['prop_product'].product
            }
        },

        methods: {},
        filters: {
            productPrice: function (value) {
                return `$${value}`
            }
        }
    }
</script>

<style lang="scss" scoped>
    .cart_item {
        border-bottom: 1px solid #ccc;
    }
</style>
