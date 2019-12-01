import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [{
  path: `/`,
  component: () => import('@/views/Home/Index.vue')
}, {
  path: `/Login`,
  component: () => import('@/views/Login/Index.vue')
}]
const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  routes
})

router.afterEach(() => {
  console.log("url değişti")
  console.log(router.currentRoute.query)
});

export default router;

