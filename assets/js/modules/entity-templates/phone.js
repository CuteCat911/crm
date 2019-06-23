import {EntityTemplate} from "./entity-template";
import {InputTemplate} from "../input-template";
import {checkType} from "../../general/check-type";

export class Phone extends EntityTemplate {

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
        phone: new InputTemplate({
            title: "Телефон:",
            type: "text",
            params: {
                store: true
            },
            regExp: {
                pattern: "\\+[0-9]{1,}\\([0-9]{3,}\\)[0-9-]{1,}",
                flags: "i"
            },
            error: {
                texts: {
                    regExp: "Введите телефон в международном формате"
                }
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

        let {phone} = data;
        let $struct = this.#structure;

        if (checkType(phone, "string")) $struct.phone.value = phone;

    };

}