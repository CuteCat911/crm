import Vue from "vue";
import VueRouter from "vue-router";

import {stateClasses} from "./general/state-classes";
import {Routes} from "./routes";
import {routerLogic} from "./modules/router-logic";

Vue.use(VueRouter);

export const Router = new VueRouter({
    base: "/",
    mode: "history",
    linkActiveClass: stateClasses.active,
    linkExactActiveClass: stateClasses.exactActive,
    routes: Routes
});

Router.beforeEach((to, from, next) => {

    routerLogic({
        vue: Router.app,
        to,
        from,
        next
    });

});