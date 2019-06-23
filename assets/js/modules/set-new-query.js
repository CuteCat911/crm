import {checkType} from "../general/check-type";
import {copyObj} from "../general/copy-obj";

export let setNewQuery = (oldQuery, newQuery) => {

    if (!checkType(oldQuery, "object") || !checkType(newQuery, "object")) {
        if (DEV) console.error();
        return false;
    }

    return Object.assign(copyObj(oldQuery), newQuery);

};