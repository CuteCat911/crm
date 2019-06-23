import {checkType} from "../general/check-type";
import {Store} from "../../store/store";
import {checkSession} from "./check-session";

export let routerLogic = ({vue, to, from, next}) => {

    if (!checkType(vue, "object")) {
        if (DEV) console.error();
        return false;
    }

    let storage = vue.$storage;
    let session = checkSession(Store, storage);
    let go = false;

    if (!session && to.name === "login") {
        go = true;
    } else if (to.name === "logout") {
        go = true;
    } else if (session) {
        go = true;
    }

    if (session && to.name === "login") {
        next({name: "actions"});
    } else if (!go) {
        next({name: "login"});
    }

    if ((from && to.name !== from.name) && !Store.getters["preloader"]) Store.commit("preloader", true);

    setTimeout(() => {
        next();
    }, 200);

};