import {checkType} from "../general/check-type";
import {setInputError} from "./set-input-error";

export let checkInputArray = (array, inputNotValid = false, store = false) => {

    if (!checkType(array, "array")) {
        if (DEV) console.error();
        return false;
    }

    let inputErrors = [];

    for (let inputs of array) {

        let errors = [];

        for (let i in inputs) {

            let input = inputs[i];

            if (!checkType(input, "object")) {
                if (DEV) console.warn();
                continue;
            }

            let {value, type, params, length, regExp} = input;
            let {notValid} = params;
            let {min, max} = length;
            let {pattern, flags} = regExp;
            let $error = {
                input: i,
                type: null
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
                    default:

                        if (!value && value !== 0 && !inputNotValid) {

                            errorParams.type = "empty";
                            setInputError(errorParams);

                        } else if (value) {

                            if (checkType(min, "number") && value.length < min) {
                                errorParams.type = "min";
                                setInputError(errorParams);
                            }

                            if (checkType(max, "number") && value.length > max) {
                                errorParams.type = "max";
                                setInputError(errorParams);
                            }

                            if (checkType(pattern, "string") && checkType(flags, "string") && !new RegExp(pattern, flags).test(value)) {
                                errorParams.type = "regExp";
                                setInputError(errorParams);
                            }

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

            if ($error.type) errors.push($error);

        }

        if (errors.length) inputErrors.push(errors);

    }

    return {
        status: !inputErrors.length,
        errors: inputErrors
    };

};