import {checkType} from "../general/check-type";
import {checkInputArray} from "./check-input-array";
import {setInputError} from "./set-input-error";
import {Store} from "../../store/store";

export let checkForm = (inputs, store = false) => {

    if (!checkType(inputs, "object")) {
        if (DEV) console.error();
        return false;
    }

    let errors = [];

    for (let i in inputs) {

        let input = inputs[i];

        if (!checkType(input, "object") || !input.hasOwnProperty("value")) {
            console.warn();
            continue;
        }

        let {value, type, error, params} = input;
        let {notValid} = params;
        let $error = {
            input: i,
            type: null,
            arrayErrors: null
        };
        let errorParams = {
            input,
            type: null,
            error: $error,
            store: store ? store : false
        };

        if (!notValid) {
            
            switch (type) {
                case "array":

                    let checkArray = checkInputArray(value, notValid, store);

                    if (!checkArray.status) {

                        errorParams.type = "array";
                        setInputError(errorParams);
                        $error.arrayErrors = checkArray.errors;

                    }

                    break;
                case "checkbox":



                    break;
                default:

                    if (!value && value !== 0) {

                        errorParams.type = "empty";
                        setInputError(errorParams);

                    } else {

                    }

                    break;
            }
            
        } else {

            switch (type) {
                case "array":

                    let checkArray = checkInputArray(value, notValid, store);

                    if (!checkArray.status) {

                        errorParams.type = "array";
                        setInputError(errorParams);
                        $error.arrayErrors = checkArray.errors;

                    }

                    break;
            }

        }

        if (!error.status) {

            if (store) {
                Store.commit("setInputErrorStatus", {
                    status: false,
                    input
                });
            } else {
                error.status = false;
                error.message = null;
                input.success = true;
            }

        } else {
            errors.push($error);
        }

    }

    return {
        status: !errors.length,
        errors
    };

};