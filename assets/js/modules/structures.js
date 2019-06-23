import {checkType} from "../general/check-type";
import {User} from "./structures/user";
import {Counterparty} from "./structures/counterparty";
import {Mailing} from "./structures/mailing";
import {MailingItem} from "./structures/mailing-item";

let structures = new Map([
    ["user", User],
    ["counterparty", Counterparty],
    ["mailing", Mailing],
    ["mailingItem", MailingItem]
]);

structures.structure = function(id, params) {

    if (!checkType(id, "string")) {
        if (DEV) console.error();
        return false;
    }

    let structure = this.has(id) ? new (this.get(id))(params) : null;

    return (checkType(structure, "object") && !structure.fallInstall) ? structure.structure : null;

};

export {structures};