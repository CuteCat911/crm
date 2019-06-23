import {EntityTemplate} from "./entity-template";
import {InputTemplate} from "../input-template";

export class Social extends EntityTemplate{

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
        link: new InputTemplate({
            title: "Ссылка на cоц. сеть:",
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

    }

}