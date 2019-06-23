import {checkType} from "../general/check-type";

export let checkSession = (store, storage) => {

    if (!checkType(store, "object") || !checkType(storage, "object")) {
        if (DEV) console.error();
        return false;
    }

    let user = storage.get("user");

    if (!checkType(user, "object")) {
        if (DEV) console.error();
        return false;
    }

    return true;

};