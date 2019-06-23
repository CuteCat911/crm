import axios from "axios";
import {checkType} from "../../general/check-type";
import {entityTemplates} from "../entity-templates";
import {serialize} from "../../general/serialize";

export class Structure {

    #structure = null;

    constructor() {}

    static setInputArrayItems = params => {

        if (!checkType(params, "object")) {
            if (DEV) console.error();
            return false;
        }

        let {array, template, input} = params;

        if (!checkType(array, "array") || array.length === 0 || !checkType(template, "string") || !checkType(input, "object")) {
            if (DEV) console.error();
            return false;
        }

        input.value = [];

        for (let item of array) input.value.push(entityTemplates.template(template, item));

    };

    get structure() {
        return this.#structure;
    }

    set structure(structure) {

        if (!checkType(structure, "object") || !structure instanceof Map) {
            if (DEV) console.error();
            return false;
        }

        this.#structure = structure;

    }

    static getSomeData = (request, sendData) => {

        if (!checkType(request, "object")) {
            if (DEV) console.error();
            return false;
        }

        return new Promise((resolve, reject) => {

            axios({
                method: request.method,
                url: request.url,
                data: checkType(sendData, "object") ? serialize(request.method, sendData) : null,
                headers: {"Content-Type": "application/x-www-form-urlencoded"}
            })
                .then(response => {

                    let requestData = response.data;

                    if (!requestData.success) {
                        reject(requestData);
                        return false;
                    }

                    resolve(requestData);

                })
                .catch(error => {
                    if (DEV) console.error();
                    reject(error);
                });

        });

    }

}