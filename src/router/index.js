import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from 'nprogress' // 进度条
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
];

const router = new VueRouter({
  routes
});

NProgress.configure({ minimum: 0.1, ease: 'ease', speed: 500, trickleSpeed: 200, showSpinner: false });

router.beforeEach(function (to, from, next)
{
  NProgress.start()

  return next()

})

router.afterEach(transition =>
{
  NProgress.done();
});

export default router;
