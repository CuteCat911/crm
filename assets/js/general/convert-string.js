import {checkType} from "./check-type";

export let convertString = (string, params) => {

    if (!checkType(string, "string") || !checkType(params, "object")) {
        if (DEV) console.error();
        return false;
    }

    let newString = null;

    for (let i in params) {
        if (checkType(newString, "string")) {
            newString = newString.replace(new RegExp("{(" + i + ")}", "gmi"), params[i]);
        } else {
            newString = string.replace(new RegExp("{(" + i + ")}", "gmi"), params[i]);
        }
    }

    return newString;

};