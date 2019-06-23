import {checkType} from "../general/check-type";
import {getInputsData} from "./get-inputs-data";

export let getInputArrayData = (array, serialize = false) => {

    if (!checkType(array, "array")) {
        if (DEV) console.error();
        return false;
    }

    let arrayData = [];

    for (let item of array) {

        let data

        if (checkType(item, "object")) {
            data = getInputsData(item, serialize);
        } else {
            data = item;
        }

        arrayData.push(data);

    }

    return arrayData;

};