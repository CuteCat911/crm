/*

    Description
    - - - - - -
    Функция, которая может проверить наличие атрибута, так же взять его значение или записать новое.
    Если не передано новое значение, то тогда функция вернет просто наличие атрибута или если в нем записано какое-либо значение, то вернет его.

    Параметры:
        1. elem (object) (обязательный) - элемент у которого будет проверятся атрибут
        2. attr (string) (обязательный) - название атрибута, с которым будет работать функция
        3. value (string) (не обязательный) - значение атрибута, которое будет в него записано, если этот параметр передан

*/

import {checkType} from "./check-type";

export let attr = (elem, attr, value) => {

    if (!checkType(elem, "object") || !checkType(attr, "string")) {
        if (DEV) console.error("Invalid variable type ($elem or $attr). Type required $data = 'object', $attr = 'string'. Type received $data = '%s', $attr = '%s'.", typeof elem, typeof attr);
        return false;
    }

    if (value || typeof value === "string") {
        elem.setAttribute(attr, value);
    } else {

        let $attr = elem.hasAttribute(attr);

        if (!$attr) {
            return false;
        }

        let $attrValue = elem.getAttribute(attr);

        if ($attrValue) {
            return $attrValue;
        } else {
            return true;
        }

    }

};