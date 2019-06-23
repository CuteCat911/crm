import {checkType} from "../../general/check-type";

export let setUserData = (storage, data) => {

    if (!checkType(storage, "object") || !checkType(data, "object")) {
        if (DEV) console.error();
        return false;
    }

    let storageUser = storage.has("user") ? storage.get("user") : {};
    for (let i in data) storageUser[i] = data[i];
    storage.set("user", storageUser);

};