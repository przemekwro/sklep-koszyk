import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Cart from '../views/Cart.vue'
import Product from "@/views/Product";
import VueScrollTo from 'vue-scrollto';

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart
    },
    {
      path: '/products/:id',
      name: 'Product',
      component: Product
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            VueScrollTo.scrollTo(to.hash, {duration:500, offset:-100});
            return { selector: to.hash }
        } else if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 }
        }
    }
})

router.afterEach((to, from) => {
    if (to.hash && to.path != from.path)
    setTimeout(()=>{
        Vue.nextTick().then(() => VueScrollTo.scrollTo(to.hash, {duration:500, offset:-100}));
    },1500)


});

export default router
