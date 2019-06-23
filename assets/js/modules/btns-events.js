import {checkType} from "../general/check-type";
import {saveNewClient} from "./btns-events/save-new-client";
import {saveAndCreateNewClient} from "./btns-events/save-and-create-new-client";
import {removeClient} from "./btns-events/remove-client";
import {removeClients} from "./btns-events/remove-clients";
import {editClients} from "./btns-events/edit-clients";
import {updateClient} from "./btns-events/update-client";
import {saveNewMailing} from "./btns-events/save-new-mailing";
import {saveNewMailingItem} from "./btns-events/save-new-mailing-item";
import {updateMailingItem} from "./btns-events/update-mailing-item";
import {editMailingsItems} from "./btns-events/edit-mailings-items";
import {sendNowMailsMailingItem} from "./btns-events/send-now-mails-mailing-item";
import {sendScheduledMailsMailingItem} from "./btns-events/send-scheduled-mails-mailing-item";

let btnsEvents = new Map([
    ["saveNewClient", saveNewClient],
    ["saveAndCreateNewClient", saveAndCreateNewClient],
    ["removeClient", removeClient],
    ["removeClients", removeClients],
    ["editClients", editClients],
    ["updateClient", updateClient],
    ["saveNewMailing", saveNewMailing],
    ["saveNewMailingItem", saveNewMailingItem],
    ["updateMailingItem", updateMailingItem],
    ["editMailingsItems", editMailingsItems],
    ["sendNowMailsMailingItem", sendNowMailsMailingItem],
    ["sendScheduledMailsMailingItem", sendScheduledMailsMailingItem]
]);

btnsEvents.getEvent = function(id) {

    if (!checkType(id, "string")) {
        if (DEV) console.error();
        return false;
    }

    return this.has(id) ? this.get(id) : null;

};

export {btnsEvents};