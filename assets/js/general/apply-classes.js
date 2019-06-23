/*

    Description
    - - - - - -
    Функция, которая добавляет или удаляет классы у элемента, которые ей переданы в массиве.
  
    Параметры:
        1. elem (object) (обязательный) - элемент у которого будут удалены или добавленый указанные классы
        2. arrayClasses (array) (обязательный) - массив с классами, которые нужно добавить или удалить
        3. event (string) (обязательный) - событие, которое должно сработать (add - добавить или remove - удалить)

*/

import {checkType} from "./check-type";

export let applyClasses = (elem, arrayClasses, event) => {

    if (!checkType(elem, "object") || !checkType(arrayClasses, "array") || !checkType(event, "string")) {
        if (DEV) console.error("Invalid variable type ($elem or $arrayClasses or $event). Type required $data = 'object', $arrayClasses = 'array (object)', $event = 'string'. Type received $data = '%s', $arrayClasses = '%s', $event = '%s'.", typeof elem, typeof arrayClasses, typeof event);
        return false;
    }

    for (let item of arrayClasses) {

        if (!checkType(item, "string")) {
            if (DEV) console.error("Array element isn't a string");
            return false;
        }

        if (event === "add") {
            elem.classList.add(item);
        } else if (event === "remove") {
            elem.classList.remove(item);
        }

    }

};