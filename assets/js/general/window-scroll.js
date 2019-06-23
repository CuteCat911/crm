/*

    Description
    - - - - - -
    Функция, которая возвращает текущую прокрутку страницы.

*/

export const getWindowScroll = () => {
    return window.pageYOffset || document.documentElement.scrollTop;
};

/*

    Description
    - - - - - -
    Функция, которая возвращает полную высоту страницы.

*/

export const getDocumentHeight = () => {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
};

/*

    Description
    - - - - - -
    Функция которая предназначена для того чтобы исполнять пользовательские функции во время скролла страницы.
    Это сделано специально для того, чтобы событие scroll отслеживалось только в одном месте, и больше не создавалось.

    Принимает параметры:
        1. funcs (array или function) (обязательный) - массив с функциями или одна функция, которая будет выполнена после полной загрузки страницы.

*/

import {checkType} from "./check-type";
import {debounce} from "./debounce";

let eventArray = [];

export let windowScroll = funcs => {

    if (checkType(funcs, "function")) {
        eventArray.push(funcs);
    } else if (checkType(funcs, "array")) {

        for (let func of funcs) {
            if (checkType(item, "function")) {
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
let clearBody = () => {
    setTimeout(() => {
        if (getComputedStyle(document.body).pointerEvents === "none") {
            document.body.style.pointerEvents = "";
        }
    }, 350);
};

window.addEventListener("scroll", () => {

    if (getComputedStyle(document.body).pointerEvents !== "none") {
        document.body.style.pointerEvents = "none";
    }

    applyFunc();
    return debounce(clearBody);

});

document.addEventListener("click", () => {
    if (getComputedStyle(document.body).pointerEvents === "none") {
        document.body.style.pointerEvents = "";
    }
});