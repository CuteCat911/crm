import {Email} from "./entity-templates/email";
import {Phone} from "./entity-templates/phone";
import {Site} from "./entity-templates/site";
import {Social} from "./entity-templates/social";
import {ContactPerson} from "./entity-templates/contact-person";
import {checkType} from "../general/check-type";

let entityTemplates = new Map([
    ["email", Email],
    ["phone", Phone],
    ["site", Site],
    ["social", Social],
    ["contactPerson", ContactPerson]
]);

entityTemplates.template = function (id, data) {

    if (!checkType(id, "string")) {
        if (DEV) console.error();
        return false;
    }

    let template = this.has(id) ? new (this.get(id))(data) : null;

    return checkType(template, "object") ? template.structure : null;

};

export {entityTemplates};