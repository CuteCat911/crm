import "babel-polyfill";
import "es6-promise/auto";
import Vue from "vue";

import {Router} from "./router";
import {Store} from "../store/store";
import {Vue2Storage} from "vue2-storage";
import {declareVueFilters} from "./modules/declare-vue-filters";
import {getEndpointData} from "./modules/get-endpoint-data";

import vHeader from "../components/general/v-header";
import preloader from "../components/elements/preloader";
import breadcrumbs from "../components/blocks/breadcrumbs";
import vAside from "../components/blocks/v-aside";
import popups from "../components/blocks/popups";

Vue.use(Vue2Storage, {
    prefix: "crm_",
    ttl: 60 * 60 * 24 * 1000
});

document.addEventListener("DOMContentLoaded", () => {

    declareVueFilters();

    const CRM = new Vue({
        el: "#crm",
        router: Router,
        store: Store,
        computed: {
            pageName() {
                return this.$route.name;
            },
            mainTypeClass() {

                if (["newClient", "editClient", "newMailing"].includes(this.pageName)) {
                    return "main--without-aside"
                } else if (["login"]) {
                    return "main--only-content";
                }

            },
            hideHeader() {
                return ["login"].includes(this.pageName);
            },
            hideBreadcrumbs() {
                return ["login"].includes(this.pageName);
            },
            hideAside() {
                return ["login", "newClient", "editClient", "newMailing"].includes(this.pageName);
            },
            hideAsideBtns() {
                return ["login"].includes(this.pageName);
            }
        },
        methods: {
            getEndpointData
        },
        components: {
            vHeader,
            preloader,
            breadcrumbs,
            vAside,
            popups
        }
    })

});