import Vue from "vue";
import {checkType} from "../../general/check-type";


export let transchoice = () => {

    Vue.filter("transchoice", (params) => {

        if (!checkType(params, "object")) {
            if (DEV) console.error();
            return false;
        }

        let {count, variables} = params;

        if (!checkType(count, "number") || !checkType(variables, "array")) {
            if (DEV) console.error();
            return false;
        }

        let type = null;

        if (Math.round(count / 10)) {
            type = 5;
        } else {
            type = count % 10;
        }

        if (type === 0) {
            return variables[2];
        } else if (type === 1) {
            return variables[0];
        } else if (type => 2 && type <= 4) {
            return variables[1];
        } else if (type >= 5 && type <= 9) {
            return variables[2];
        }

    });

};