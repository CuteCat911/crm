import {checkType} from "../general/check-type";
import {setUserData} from "./storage-actions/set-user-data";

let storageActions = new Map([
    ["setUserData", setUserData]
]);

storageActions.getAction = function(id) {

    if (!checkType(id, "string")) {
        if (DEV) console.error();
        return false;
    }

    return this.has(id) ? this.get(id) : null;

};

export {storageActions};