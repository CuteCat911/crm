/*

    Description
    - - - - - -
    Функция нахождения родительского элемента по классу.
    Будет искать родителя до тех пор, пока не дойдет то документа, если найдет родителя, то вернет его, если нет, то вернет false

    Параметры:
        1. elem (object) (обязательный) - элемент от которого будет происходить поиск родителя
        2. parentClass (string) (обязательный) - класс родителя, по которому будет идти поиск

*/

import {checkType} from "./check-type";

export let findCurrentParent = (elem, parentClass) => {

    if (!checkType(elem, "object") || !checkType(parentClass, "string")) {
        if (DEV) console.error("Invalid variable type ($elem or $parentClass). Type required $elem = 'object', $parentClass = 'string'. Type received $elem = '%s', $parentClass = '%s'.", typeof elem, typeof parentClass);
        return false;
    }

    let parent = elem.parentNode;

    if (parent !== document) {

        // Поиск родителя до тех пор пока не найдется элемент с нужным классом.
        while(typeof parent === "object" && !parent.classList.contains(parentClass)) {

            parent = parent.parentNode;

            if (parent === document) {
                parent = null;
                break;
            }

        }

    } else {
        parent = null;
    }

    if (parent != null) {
        return parent;
    } else {
        return false;
    }

};