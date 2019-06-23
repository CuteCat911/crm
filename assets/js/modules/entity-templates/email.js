import {EntityTemplate} from "./entity-template";
import {InputTemplate} from "../input-template";
import {checkType} from "../../general/check-type";

export class Email extends EntityTemplate {

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
        email: new InputTemplate({
            title: "E-mail:",
            type: "text",
            params: {
                store: true
            },
            error: {
                texts: {
                    regExp: "Введите корректный e-mail"
                }
            },
            regExp: {
                pattern: ".+@+.+\\.+.{2,}",
                flags: "i"
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

    }

    set data(data) {

        if (!checkType(data, "object")) {
            if (DEV) console.error();
            return false;
        }

        super.data = data;

        let {email} = data;
        let $struct = this.#structure;

        if (checkType(email, "string")) $struct.email.value = email;

    };

}