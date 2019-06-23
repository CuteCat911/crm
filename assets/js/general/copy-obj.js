import {checkType} from "./check-type";

export let copyObj = obj => {

    if (!checkType(obj, "object")) {
        if (DEV) console.error("Invalid variable type ($obj). Type required 'object'. Type received '%s'.", typeof obj);
        return false;
    }

    let copy = {};

    for (let i in obj) {

        let item = obj[i];

        if (checkType(item, "object") && !checkType(item, "array")) {
            copy[i] = copyObj(item);
        } else if (checkType(item, "array")) {

            let newArray = [];
            for (let $item of item) newArray.push(copyObj($item));
            copy[i] = newArray;

        } else {
            copy[i] = item;
        }

    }

    return copy;

};