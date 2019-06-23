import axios from "axios";
import {checkType} from "../../general/check-type";
import {convertString} from "../../general/convert-string";

export let sendNowMailsMailingItem = function(mailingItemId) {

    if (!checkType(mailingItemId, "number")) {
        if (DEV) console.error();
        return false;
    }

    let request = this.$store.getters["api/mailingItem"].sendNowMails;

    axios({
        method: request.method,
        url: convertString(request.url, {id: mailingItemId}),
        headers: {"Content-Type": "application/x-www-form-urlencoded"}
    })
        .then(response => {

        })
        .catch(error => {

        });

};