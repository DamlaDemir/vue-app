// import Vue from "vue";
// import VueRouter from "vue-router";
// import Home from "../views/Home.vue";

// Vue.use(VueRouter);

// const routes = [
//   {
//     path: "/",
//     name: "home",
//     component: Home
//   },
//   {
//     path: "/about",
//     name: "about",
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () =>
//       import(/* webpackChunkName: "about" */ "../views/About.vue")
//   }
// ];

// const router = new VueRouter({
//   mode: "history",
//   base: process.env.BASE_URL,
//   routes
// });

// export default router;


import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
// import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [];
fetchMenus();

function fetchMenus() {
   store.dispatch("menu/fetchMenus").then(() => {
    console.log("fetchMenus bitti");
    createdRouterObject(store.state.menu.menus.MENU);
    
  });
}

function createdRouterObject(menu) {
   menu.forEach(function(menuItem) {
    if(!menuItem.BASLIK){
      const routerObj = {
        name: `${menuItem.SAYFA}/List`,
        path:`/${menuItem.SAYFA}/List`,
        component: () => import(`@/views/${menuItem.SAYFA}/List.vue`)
      }
      routes.push(routerObj);
      console.log(menuItem.TANIM);
    }
    else {
      createdRouterObject(menuItem.MENU);
    }
  });
  console.log("createdRouterObject bitti");

}


Vue.component('routing', {
  template: '#routing',
  created() {
    console.log("router içinde component yaratıldı");

  }
});



//   routes = [
//   {
//     path: "/",
//     name: "home",
//     component: Home
//   },
//   {
//     path: "/about",
//     name: "about",
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () =>
//       import(/* webpackChunkName: "about" */ "../views/About.vue")
//   }
// ];

console.log("export üstü");
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;




