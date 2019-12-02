import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [{
  path: `/`,
  component: () => import('@/views/Home/Index.vue'),
  meta: { layout: "default" }
}, {
  path: `/Login`,
  component: () => import('@/views/Login/Index.vue'),
  meta: { layout: "simple" }
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

