import {Structure} from "./structure";
import {InputTemplate} from "../input-template";
import {checkType} from "../../general/check-type";

export class MailingItem extends Structure {

    #structure = new Map([
        ["id", null],
        ["createdTime", null],
        ["updatedTime", null],
        ["sendTime", new InputTemplate({
            type: "date-time",
            title: "Время отправки рассылки",
            params: {
                notValid: true,
                store: true
            }
        })],
        ["nowSend", false],
        ["status", false],
        ["theme", new InputTemplate({
            type: "text",
            title: "Тема сообщения",
            error: {
                texts: {
                    empty: "Введите тему сообщения"
                }
            },
            params: {
                store: true
            }
        })],
        ["mailing", new InputTemplate({
            type: "select",
            title: "Тип рассылки",
            error: {
                texts: {
                    empty: "Укажите тип рассылки"
                }
            },
            params: {
                store: true
            }
        })],
        ["selectedEmails", new InputTemplate({
            type: "array",
            value: [],
            length: {
                min: 1
            }
        })]
    ]);

    constructor(data) {

        super();
        this.data = data;
        super.structure = this.#structure;

    }

    set data(data) {

        if (!checkType(data, "object")) {
            if (DEV) console.error();
            return false;
        }

        let {id, createdTime, updatedTime, sendTime, nowSend, theme, status, mailing, selectedEmails} = data;
        let $struct = this.#structure;

        if (checkType(id, "number")) $struct.set("id", id);
        if (checkType(createdTime, "string")) $struct.set("createdTime", createdTime);
        if (checkType(updatedTime, "string")) $struct.set("updatedTime", updatedTime);
        if (checkType(sendTime, "string")) $struct.get("sendTime").value = sendTime;
        if (checkType(nowSend, "boolean")) $struct.set("nowSend", nowSend);
        if (checkType(theme, "string")) $struct.get("theme").value = theme;
        if (checkType(status, "number")) $struct.set("status", status);
        if (checkType(mailing, "object") && checkType(mailing.id, "number")) $struct.get("mailing").value = mailing.id;
        if (checkType(selectedEmails, "array")) $struct.get("selectedEmails").value = selectedEmails;

    }

}