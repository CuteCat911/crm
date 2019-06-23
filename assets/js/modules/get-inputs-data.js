import {checkType} from "../general/check-type";
import {getInputArrayData} from "./get-input-array-data";

export let getInputsData = (inputs, serialize = false) => {

    if (!checkType(inputs, "object")) {
        if (DEV) console.error();
        return false;
    }

    let data = {};

    for (let i in inputs) {

        let input = inputs[i];

        if (!input) continue;

        if (["id", "nowSend"].includes(i)) {
            data[i] = input;
        } else {

            if (input.type === "array") {
                data[i] = serialize ? JSON.stringify(getInputArrayData(input.value, serialize)) : getInputArrayData(input.value, serialize);
            } else {
                data[i] = checkType(input.value, "string") ? input.value.trim() : input.value;
            }

        }
    }

    return data;

};