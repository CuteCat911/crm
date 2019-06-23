/*

    Description
    - - - - - -
    Функция отложенного выполеннея другой функции

    Параметры:
      1. func (function) (обязательный) - функция которая должны выполняться с отложенным временем
      2. time (number) (не обязательный) - время задержки в милисекундах. Дефолтное значение 300

*/

import {checkType} from "./check-type";

let state = null;
const FROZE = 1;

export let debounce = (func, time = 300) => {

    if (!checkType(func, "function") || !checkType(time, "number")) {
        if (DEV) console.error("Invalid variable type ($func or $time). Type required $func = 'function', $time = 'number'. Type received $func = '%s', $time = '%s'.", typeof func, typeof time);
        return false;
    }

    if (state) {
        return;
    }

    func.apply(this, arguments);
    state = FROZE;

    setTimeout(function() {
        state = null;
    }, time);

};