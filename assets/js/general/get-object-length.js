/*

    Description
    - - - - - -
    Функция которая подсчитывает длину ассоциативного массива и возвращает её.

    Принимает параметры:
        1. associativeArray (object) (обязательный) - ассоциативный массив, длину которого нужно посчитать

*/

import {checkType} from "./check-type";

export let getObjectLength = (object) => {

    if (!checkType(object, "object")) {
        if (DEV) console.error("Invalid variable type ($object). Type required 'object'. Type received'%s'.", typeof object);
        return false;
    }

    let index = 0;

    /* eslint-disable */
    for (let i in object) {
        index++;
    }
    /* eslint-enable */

    return index;

};