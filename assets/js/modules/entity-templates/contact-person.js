import {EntityTemplate} from "./entity-template";
import {InputTemplate} from "../input-template";
import {entityTemplates} from "../entity-templates";
import {checkType} from "../../general/check-type";

export class ContactPerson extends EntityTemplate{

    #structure = {
        id: null,
        createdTime: null,
        updatedTime: null,
        name: new InputTemplate({
            title: "Имя:",
            type: "text",
            params: {
                store: true
            }
        }),
        lastName: new InputTemplate({
            title: "Фамилия:",
            type: "text",
            params: {
                notValid: true,
                store: true
            }
        }),
        patronymic: new InputTemplate({
            title: "Отчество:",
            type: "text",
            params: {
                notValid: true,
                store: true
            }
        }),
        position: new InputTemplate({
            title: "Должность:",
            type: "text",
            params: {
                notValid: true,
                store: true
            }
        }),
        description: new InputTemplate({
            title: "Дополнительная информация:",
            type: "textarea",
            params: {
                notValid: true,
                store: true
            }
        }),
        orderIndex: new InputTemplate({
            type: "number",
            value: 0
        }),
        emails: new InputTemplate({
            title: "E-mails:",
            type: "array",
            value: [
                entityTemplates.template("email")
            ],
            params: {
                notValid: true
            }
        }),
        phones: new InputTemplate({
            title: "Телефоны:",
            type: "array",
            value: [
                entityTemplates.template("phone")
            ],
            params: {
                notValid: true
            }
        }),
        socials: new InputTemplate({
            title: "Социальные сети:",
            type: "array",
            value: [
                entityTemplates.template("social")
            ],
            params: {
                notValid: true
            }
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

        let {id, createdTime, updatedTime, name, lastName, patronymic, position, description, emails, phones, socials} = data;
        let $struct = this.#structure;

        if (checkType(id, "number")) $struct.id = id;
        if (checkType(createdTime, "string")) $struct.createdTime = createdTime;
        if (checkType(updatedTime, "string")) $struct.updatedTime = updatedTime;
        if (checkType(name, "string")) $struct.name.value = name;
        if (checkType(lastName, "string")) $struct.lastName.value = lastName;
        if (checkType(patronymic, "string")) $struct.patronymic.value = patronymic;
        if (checkType(position, "string")) $struct.position.value = position;
        if (checkType(description, "string")) $struct.description = description;

        EntityTemplate.setInputArrayItems({array: emails, template: "email", input: $struct.emails});
        EntityTemplate.setInputArrayItems({array: phones, template: "phone", input: $struct.phones});
        EntityTemplate.setInputArrayItems({array: socials, template: "social", input: $struct.socials});

    }

}