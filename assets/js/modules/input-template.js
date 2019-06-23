import {checkType} from "../general/check-type";

export class InputTemplate {

    #template = {
        type: null,
        title: null,
        description: null,
        value: null,
        success: false,
        error: {
            status: null,
            message: null,
            texts: {}
        },
        length: {
            min: null,
            max: null
        },
        regExp: {
            pattern: null,
            flags: null
        },
        params: {
            notValid: false,
            onlyNumber: false,
            store: false
        },
        selectList: null,
        checkboxes: null
    };

    constructor(data) {

        if (!checkType(data,"object")) return this.#template;

        this.#setData(data);

        return this.#template;

    };

    #setData = data => {

        if (!checkType(data, "object")) {
            if (DEV) console.error();
            return false;
        }

        let {type, title, description, value, success, error, length, regExp, params, selectList, checkboxes} = data;
        let $temp = this.#template;

        if (checkType(type, "string")) $temp.type = type;
        if (checkType(title, "string")) $temp.title = title;
        if (checkType(description, "string")) $temp.description = description;
        if (value !== undefined) $temp.value = value;
        if (checkType(success, "boolean")) $temp.success = success;
        if (checkType(selectList, "array")) $temp.selectList = selectList;
        if (checkType(checkboxes, "array")) $temp.checkboxes = checkboxes;

        if (checkType(error, "object")) {

            let $error = $temp.error;
            let {status, message, texts} = error;

            if (checkType(status, "boolean")) $error.status = status;
            if (checkType(message, "string")) $error.message = message;
            if (checkType(texts, "object")) $error.texts = texts;

        }

        if (checkType(length, "object")) {

            let $length = $temp.length;
            let {min, max} = length;

            if (checkType(min, "number")) $length.min = min;
            if (checkType(max, "number")) $length.max = max;

        }

        if (checkType(regExp, "object")) {

            let $regExp = $temp.regExp;
            let {pattern, flags} = regExp;

            if (checkType(pattern, "string")) $regExp.pattern = pattern;
            if (checkType(flags, "string")) $regExp.flags = flags;

        }

        if (checkType(params, "object")) {


            let $params = $temp.params;
            let {notValid, onlyNumber, store} = params;

            if (checkType(notValid, "boolean")) $params.notValid = notValid;
            if (checkType(onlyNumber, "boolean")) $params.onlyNumber = onlyNumber;
            if (checkType(store, "boolean")) $params.store = store;
        }

    };

}