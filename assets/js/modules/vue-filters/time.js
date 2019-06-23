import Vue from "vue";
import {checkType} from "../../general/check-type";

export let time = () => {

    Vue.filter("time", time => {

        if (!checkType(time, "string")) {
            if (DEV) console.error();
            return false;
        }

        let date = new Date(time);

    });

};