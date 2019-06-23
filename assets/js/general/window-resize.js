/*

    Description
    - - - - - -
    Функция которая предназначена для того чтобы исполнять пользовательские функции после ресайза страницы.
    Это сделано специально для того, чтобы событие resize отслеживалось только в одном месте, и больше не создавалось.

    Принимает параметры:
        1. funcs (array или function) (обязательный) - массив с функциями или одна функция, которая будет выполнена после полной загрузки страницы.

*/

import {checkType} from "./check-type";
import {debounce} from "./debounce";
import {inspectMobile} from "./inspect-mobile";

let eventArray = [];

export let windowResize = funcs => {

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

let windowHeight = window.innerHeight;

window.addEventListener("resize", () => {

    let $windowHeight = window.innerHeight;

    if (inspectMobile()) {
        if (Math.abs(windowHeight - $windowHeight) > 60 || windowHeight === $windowHeight) {
            debounce(applyFunc, 150);
            windowHeight = $windowHeight;
        }
    } else {
        debounce(applyFunc, 150);
    }

});