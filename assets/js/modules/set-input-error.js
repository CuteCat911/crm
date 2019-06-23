import {checkType} from "../general/check-type";
import {Store} from "../../store/store";

export let setInputError = params => {

    if (!checkType(params, "object")) {
        if (DEV) console.error();
        return false;
    }

    let {input, type, error, store} = params;

    if (!checkType(input, "object") || !checkType(type, "string") || !checkType(error, "object")) {
        if (DEV) console.error();
        return false;
    }

    if (store) {

        Store.commit("setInputErrorStatus", {
            status: true,
            input,
            errorType: type
        });

    } else {

        input.error.status = true;
        input.success = false;
        input.error.message = input.error.texts[type] ? input.error.texts[type] : null;

    }

    error.type = type;

};