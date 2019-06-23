import axios from "axios";
import {checkType} from "../general/check-type";
import {serialize} from "../general/serialize";

export let getEndpointData = params => {

    if (!checkType(params, "object")) {
        if (DEV) console.error();
        return false;
    }

    let {server, funcs} = params;

    if (!checkType(server, "object") || !checkType(funcs, "object")) {
        if (DEV) console.error();
        return false;
    }

    let {method, url, data, headers} = server;

    if (!checkType(method, "string") || !checkType(url, "string")) {
        if (DEV) console.error();
        return false;
    }

    let {success, notSuccess, notLogged, always} = funcs;

    if (!checkType(success, "function")) {
        if (DEV) console.error();
        return false;
    }

    axios({
        method,
        url,
        data: checkType(data, "object") ? serialize(method, data) : null,
        headers: checkType(headers, "object") ? headers : {"Content-Type": "application/x-www-form-urlencoded"}
    })
        .then(response => {

            let requestData = response.data;

            if (checkType(always, "function")) always(requestData);

            if (requestData.logged !== undefined && !requestData.logged) {
                if (checkType(notLogged, "function")) notLogged(requestData);
                return false;
            }

            if (!requestData.success) {
                if (checkType(notSuccess, "function")) notSuccess(requestData);
                return false;
            }

            success(requestData);

        })
        .catch(error => {

        });

};