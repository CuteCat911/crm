/*

    Description
    - - - - - -
    Функция копирования массива. Возвращает копию переданного массива.

    Параметры:
      1. array (array) (обязательный) - массив который нужно скопировать.

*/

import {checkType} from "./check-type";

export let copyArray = array => {

    if (!checkType(array, "array")) {
        if (DEV) console.error("Invalid variable type ($array). Type required 'array (object)'. Type received '%s'.", typeof array);
        return false;
    }

    return array.slice(0);

};