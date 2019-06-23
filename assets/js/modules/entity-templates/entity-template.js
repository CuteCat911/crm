import {checkType} from "../../general/check-type";
import {entityTemplates} from "../entity-templates";

export class EntityTemplate {

    #structure = null;

    constructor() {

    }

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

        if (!checkType(structure, "object")) {
            if (DEV) console.error();
            return false;
        }

        this.#structure = structure;

    }

    set data(data) {

        if (!checkType(data, "object")) {
            if (DEV) console.error();
            return false;
        }

        let {id, name, orderIndex} = data;
        let $struct = this.#structure;

        if (checkType(id, "number")) $struct.id = id;
        if (checkType(name, "string")) $struct.name.value = name;
        if (checkType(orderIndex, "number")) $struct.orderIndex.value = orderIndex;

    }

}