/*

  Description
  - - - - - -
  Функция которая предназначена для того чтобы исполнять пользовательские функции после полной загрузки страницы.
  Это сделано специально для того, чтобы событие onload отслеживалось только в одном месте, и больше не создавалось.

  Принимает параметры:
    1. funcs (array или function) (обязательный) - массив с функциями или одна функция, которая будет выполнена после полной загрузки страницы.

*/

import {checkType} from "./check-type";

let eventArray = [];

export let pageLoad = funcs => {

    if (checkType(funcs, "function")) {
        eventArray.push(funcs);
    } else if (checkType(funcs, "array")) {

        for (let func of funcs) {
            if (checkType(func, "function")) {
                eventArray.push(func);
            }
        }

    }

};
let applyFunc = () => {
    for (let event of eventArray) {
        event();
    }
};

window.onload = () => {
    applyFunc();
};