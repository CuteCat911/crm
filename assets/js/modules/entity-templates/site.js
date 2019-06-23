import {EntityTemplate} from "./entity-template";
import {InputTemplate} from "../input-template";
import {checkType} from "../../general/check-type";

export class Site extends EntityTemplate {

    #structure = {
        id: null,
        name: new InputTemplate({
            title: "Название:",
            type: "text",
            params: {
                notValid: true,
                store: true
            }
        }),
        url: new InputTemplate({
            title: "Адрес сайта:",
            type: "text",
            params: {
                store: true
            }
        }),
        orderIndex: new InputTemplate({
            type: "number",
            value: 0
        })
    };

    constructor(data) {

        super();
        super.structure = this.#structure;
        this.data = data;

    };

    set data(data) {

        if (!checkType(data, "object")) {
            if (DEV) console.error();
            return false;
        }

        super.data = data;

        let {url} = data;
        let $struct = this.#structure;

        if (checkType(url, "string")) $struct.url.value = url;

    };

}