import {checkType} from "../general/check-type";

export let getTimeForBack = time => {

    if (!checkType(time, "object")) {
        if (DEV) console.error();
        return false;
    }

    return time.toString().replace(new RegExp("\\(.{1,}\\)", "gmi"), "");

};