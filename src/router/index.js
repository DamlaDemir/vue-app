import Vue from "vue";
import VueRouter from "vue-router";
import { TokenService } from "@/services/storage.service";

Vue.use(VueRouter);

const routes = [
  {
    path: `/`,
    component: () => import("@/views/Home/Index.vue"),
    meta: { layout: "default" }
  },
  {
    path: `/Login`,
    component: () => import("@/views/Login/Index.vue"),
    meta: {
      layout: "simple",
      public: true, // Giriş yapılmamışsa erişime izin ver
      onlyWhenLoggedOut: true
    }
  }
];
const router = new VueRouter({
  mode: "history",
  linkActiveClass: "active",
  routes
});

router.afterEach(() => {
  console.log("url değişti");
  console.log(router.currentRoute.query);
});

router.beforeEach((to, from, next) => {
  debugger;
  const isPublic = to.matched.some(record => record.meta.public);
  const onlyWhenLoggedOut = to.matched.some(
    record => record.meta.onlyWhenLoggedOut
  );
  const loggedIn = !!TokenService.getToken();

  if (!isPublic && !loggedIn) {
    return next({
      path: "/login",
      query: { redirect: to.fullPath } // Giriş yaptıktan sonra kullanıcıyı yönlendirmek için tam yolun saklanması
    });
  }

  //Kullanıcı giriş yapmışsa giriş sayfasını ziyaret etmesine veya kayıt olmasına izin verme
  if (loggedIn && onlyWhenLoggedOut) {
    return next("/");
  }
  next();
});

export default router;
