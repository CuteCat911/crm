/*

    Description
    - - - - - -
    Функция, которая добавляет или удаляет стили у элемента, которые ей переданы объектом.

    Параметры:
        1. elem (object) (обязательный) - элемент у которого будут удалены или добавленый указанные стили
        2. style (object) (обязательный) - объект со стилями, которые нужно добавить или удалить
        3. event (string) (обязательный) - событие, которое должно сработать (add - добавить или remove - удалить)

*/

import {checkType} from "./check-type";

export let applyStyle = (elem, style, event) => {

	if (!checkType(elem, "object") || !checkType(style, "object") || !checkType(event, "string")) {
        if (DEV) console.error("Invalid variable type ($elem or $style or $event). Type required $data = 'object', $style = 'object', $event = 'string'. Type received $data = '%s', $style = '%s', $event = '%s'.", typeof elem, typeof style, typeof event);
		return false;
	}

    for (let i in style) {

        if (event === "add") {
            elem.style[i] = style[i];
        } else if (event === "remove") {
            elem.style[i] = "";
        }

    }

};