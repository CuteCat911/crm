import {Structure} from "./structure";
import {InputTemplate} from "../input-template";
import {checkType} from "../../general/check-type";

export class User extends Structure {

    #structure = new Map([
        ["id", null],
        ["createdTime", null],
        ["updatedTime", null],
        ["login", new InputTemplate({
            type: "text",
            title: "",
            params: {
                store: true
            }
        })],
        ["roles", new InputTemplate({
            type: "array",
            title: "",
            value: []
        })],
        ["sessionTime", null],
        ["lastActionTime", null],
        ["name", new InputTemplate({
            type: "text",
            title: "",
            params: {
                store: true
            }
        })],
        ["lastName", new InputTemplate({
            type: "text",
            title: "",
            params: {
                store: true
            }
        })],
        ["patronymic", new InputTemplate({
            type: "text",
            title: "",
            params: {
                store: true
            }
        })],
        ["position", new InputTemplate({
            type: "text",
            title: "",
            params: {
                store: true
            }
        })]
    ]);

    constructor(data) {

        super();
        this.data = data;
        super.structure = this.#structure;

    };

    set data(data) {

        if (!checkType(data, "object")) {
            if (DEV) console.error();
            return false;
        }

        let {id, createdTime, updatedTime, login, roles, sessionTime, lastActionTime, name, lastName, patronymic, position} = data;
        let $struct = this.#structure;

        if (checkType(id, "number")) $struct.set("id", id);
        if (checkType(createdTime, "string")) $struct.set("createdTime", createdTime);
        if (checkType(updatedTime, "string")) $struct.set("updatedTime", updatedTime);
        if (checkType(login, "string")) $struct.get("login").value = login;
        if (checkType(roles, "array")) $struct.set("roles", roles);
        if (checkType(sessionTime, "number")) $struct.set("sessionTime", sessionTime);
        if (checkType(lastActionTime, "string")) $struct.set("lastActionTime", lastActionTime);
        if (checkType(name, "string")) $struct.get("name").value = name;
        if (checkType(lastName, "string")) $struct.get("lastName").value = lastName;
        if (checkType(patronymic, "string")) $struct.get("patronymic").value = patronymic;
        if (checkType(position, "string")) $struct.get("position").value = position;

    };

}