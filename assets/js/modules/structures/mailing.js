import axios from "axios";
import {Structure} from "./structure";
import {InputTemplate} from "../input-template";
import {Store} from "../../../store/store";

export class Mailing extends Structure {

    #structure = new Map([
        ["id", null],
        ["createdTime", null],
        ["updatedTime", null],
        ["name", new InputTemplate({
            type: "text",
            title: "Название рассылки",
            error: {
                texts: {
                    empty: "Введите название рассылки"
                }
            },
            params: {
                store: true
            }
        })],
        ["description", new InputTemplate({
            type: "textarea",
            title: "Описание рассылки",
            params: {
                notValid: true,
                store: true
            }
        })],
        ["template", new InputTemplate({
            type: "select",
            title: "Шаблон рассылки",
            value: "",
            error: {
                texts: {
                    empty: "Выберите шаблон"
                }
            },
            params: {
                store: true
            }
        })],
        // ["structure", new InputTemplate({
        //     type: "array",
        //     title: "",
        //     value: [
        //
        //     ],
        //     params: {
        //         notValid: true
        //     }
        // })],
        ["archive", new InputTemplate({
            type: "checkbox",
            title: "В архиве",
            description: "Арихвные ссылки не доступны для отправки.",
            value: false,
            params: {
                store: true
            }
        })]
    ]);

    constructor(data) {

        super();
        super.structure = this.#structure;

    }

}