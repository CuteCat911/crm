import {Structure} from "./structure";
import {checkType} from "../../general/check-type";
import {InputTemplate} from "../input-template";
import {entityTemplates} from "../entity-templates";

export class Counterparty extends Structure {

    #checkClient;
    #structure = new Map([
        ["id", null],
        ["createdTime", null],
        ["updatedTime", null],
        ["name", new InputTemplate({
            type: "text",
            title: this.#checkClient ? "Имя клиента:" : "Имя подрядчика:",
            error: {
                texts: {
                    empty: this.#checkClient ? "Введите имя клиента" : "Введите имя подрядчика"
                }
            },
            params: {
                store: true
            }
        })],
        ["description", new InputTemplate({
            type: "textarea",
            title: "Описание и дополнительная информация:",
            params: {
                notValid: true,
                store: true
            }
        })],
        ["priority", new InputTemplate({
            title: "Приоритет:",
            type: "text",
            params: {
                notValid: true,
                store: true
            }
        })],
        ["source", new InputTemplate({
            title: "Источник:",
            type: "text",
            params: {
                notValid: true,
                store: true
            }
        })],
        ["groupType", new InputTemplate({
            title: "Группа:",
            type: "text",
            params: {
                notValid: true,
                store: true
            }
        })],
        ["city", new InputTemplate({
            title: "Город:",
            type: "text",
            params: {
                notValid: true,
                store: true
            }
        })],
        ["postIndex", new InputTemplate({
            title: "Почтовый индекс:",
            type: "text",
            params: {
                notValid: true,
                store: true
            }
        })],
        ["address", new InputTemplate({
            title: "Адрес:",
            type: "textarea",
            params: {
                notValid: true,
                store: true
            }
        })],
        ["emails", new InputTemplate({
            title: "E-mails:",
            type: "array",
            value: [
                entityTemplates.template("email")
            ],
            params: {
                notValid: true
            }
        })],
        ["phones", new InputTemplate({
            title: "Телефоны:",
            type: "array",
            value: [
                entityTemplates.template("phone")
            ],
            params: {
                notValid: true
            }
        })],
        ["sites", new InputTemplate({
            title: "Сайты:",
            type: "array",
            value: [
                entityTemplates.template("site")
            ],
            params: {
                notValid: true
            }
        })],
        ["socials", new InputTemplate({
            title: "Социальные сети:",
            type: "array",
            value: [
                entityTemplates.template("social")
            ],
            params: {
                notValid: true
            }
        })],
        ["contactPersons", new InputTemplate({
            title: "Контактные лица:",
            type: "array",
            value: [
                entityTemplates.template("contactPerson")
            ],
            params: {
                notValid: true
            }
        })]
    ]);

    constructor(params) {

        if (!checkType(params, "object")) {
            if (DEV) console.error();
            return {fallInstall: true};
        }

        let {type, data} = params;

        if (!checkType(type, "string") || !["client", "contractor"].includes(type)) {
            if (DEV) console.error();
            return {fallInstall: true};
        }

        super();
        this.#checkClient = type === "client";
        this.data = data;
        super.structure = this.#structure;

    }

    set data(data) {

        if (!checkType(data, "object")) {
            if (DEV) console.error();
            return false;
        }

        let {id, createdTime, updatedTime, name, description, priority, source, groupType, city, postIndex, address, emails, phones, sites, socials, contactPersons} = data;
        let $struct = this.#structure;

        if (checkType(id, "number")) $struct.set("id", id);
        if (checkType(createdTime, "string")) $struct.set("createdTime", createdTime);
        if (checkType(updatedTime, "string")) $struct.set("updatedTime", updatedTime);
        if (checkType(name, "string")) $struct.get("name").value = name;
        if (checkType(description, "string")) $struct.get("description").value = description;
        if (checkType(priority, "string")) $struct.get("priority").value = priority;
        if (checkType(source, "string")) $struct.get("source").value = source;
        if (checkType(groupType, "string")) $struct.get("groupType").value = groupType;
        if (checkType(city, "string")) $struct.get("city").value = city;
        if (checkType(postIndex, "string")) $struct.get("postIndex").value = postIndex;
        if (checkType(address, "string")) $struct.get("address").value = address;

        Structure.setInputArrayItems({array: emails, template: "email", input: $struct.get("emails")});
        Structure.setInputArrayItems({array: phones, template: "phone", input: $struct.get("phones")});
        Structure.setInputArrayItems({array: sites, template: "site", input: $struct.get("sites")});
        Structure.setInputArrayItems({array: socials, template: "social", input: $struct.get("socials")});

        if (checkType(contactPersons, "array") && contactPersons.length !== 0) {

            let $contactPersons = $struct.get("contactPersons");

            $contactPersons.value = [];

            for (let person of contactPersons) $contactPersons.value.push(entityTemplates.template("contactPerson", person));

        }

    };

}