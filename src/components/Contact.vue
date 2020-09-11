<template>
    <div class="">
        <div id="subscribe" class=" mt-10 w-100 pa-5">
            <h2>Subscribe</h2>
            <h6>To get special offers and VIP treatment:</h6>
            <v-text-field class="mt-6 mb-6 " color="white" label="Enter email"></v-text-field>
            <v-btn tile>Subscribe</v-btn>
        </div>
        <div class="container pt-0 pb-0">
            <div id="contact" class="row">
                <div class="col-12 col-lg-4 col-md-4 col-sm-12">
                    <div class="d-flex justify-center">
                        <h3>Contact</h3>
                    </div>
                    <div class="d-flex justify-center">
                        <p>Questions? Go ahead.</p>
                    </div>
                    <v-text-field label="Name"></v-text-field>
                    <v-text-field label="Email"></v-text-field>
                    <v-text-field label="Subject"></v-text-field>
                    <v-text-field label="Message"></v-text-field>
                    <div class="d-flex justify-center">
                        <v-btn> Send</v-btn>
                    </div>
                </div>
                <div id="about" class="col-4 col-lg-4 col-md-4 col-sm-6">
                    <h3>About</h3>
                    <a href="#">About us</a>
                    <a href="#">We're hiring</a>
                    <a href="#">Support </a>
                    <a href="#">Find store </a>
                    <a href="#">Shipment </a>
                    <a href="#">Payment</a>
                    <a href="#">Gift card</a>
                    <a href="#">Return</a>
                    <a href="#">Help</a>
                </div>
                <div class="col-8 col-lg-4 col-md-4 col-sm-6">
                    <h3>Store</h3>
                    <div class="pa-1 pl-0">
                        <p><v-icon>mdi-map-marker</v-icon> Company name</p>
                    </div>
                    <div class="pa-1 pl-0">
                        <p><v-icon>mdi-phone</v-icon> 00 1234 1234 12</p>
                    </div>
                    <div class="pa-1 pl-0">
                        <p><v-icon>mdi-email</v-icon> example@mail.com</p>
                    </div>
                    <h3>We accept</h3>
                    <div class="pa-1 pl-0">
                        <p><v-icon>mdi-credit-card</v-icon> Credit Card</p>
                    </div>
                    <div class="pa-1 pl-0">
                        <p><v-icon>mdi-cellphone-nfc</v-icon> Contactless payment</p>
                    </div>
                    <div class="row ">
                        <div class="col-2 col-md-2 col-sm-2 d-flex justify-center"> <v-icon>mdi-facebook</v-icon>  </div>
                        <div class="col-2 col-md-2 col-sm-2 d-flex justify-center"> <v-icon>mdi-instagram</v-icon>  </div>
                        <div class="col-2 col-md-2 col-sm-2 d-flex justify-center"> <v-icon>mdi-snapchat</v-icon>  </div>
                        <div class="col-2 col-md-2 col-sm-2 d-flex justify-center"> <v-icon>mdi-pinterest</v-icon>  </div>
                        <div class="col-2 col-md-2 col-sm-2 d-flex justify-center"> <v-icon>mdi-twitter</v-icon>  </div>
                        <div class="col-2 col-md-2 col-sm-2 d-flex justify-center"> <v-icon>mdi-linkedin</v-icon>  </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'contact',
    }
</script>

<style lang="scss" scoped>
    #subscribe {
        background-color: #757575;

        .v-btn {
            background-color: #f44336;

            span {
                color: white;
            }
        }

        h1, h2, h3, h4, h5, h6 {
            color: white;
            letter-spacing: 4px;
            font-family: 'Montserrat', sans-serif;
        }


        .v-btn:hover {
            background-color: #ccc;
        }
    }

    #contact {
        background-color: #ccc;

        #about {
            h3 {
                display: flex;
                justify-content: center;
                margin-bottom: 25px;
            }

            a {
                font-size: 14px;
                color: black;
                display: flex;
                justify-content: center;
                margin-top: 12px;
            }
        }


        h1, h3, h6 {
            color: black;
        }
    }
    p{
        font-size: 16px;
    }
</style>
