/*

    Description
    - - - - - -
    Функция реализующая функционал плавного открытия элемента или его скрытия, в зависимости от его состояния.

    Принимает параметры:
        1. elem (object) (обязательный) - элемент, который необходимо открыть или скрыть
        2. duration (number) (не обязательный) - продолжительность анимации открытия или скрытия элемента
        3. durationType (string) (не обязательный) - тип анимации открытия или скрытия (принимает все значения из css: ease, linear и тд.)

    Пример вызова функции:
        slideToggle(document.getElementByid("descr"), 300, "ease");

*/

import {checkType} from "./check-type";

// Вспомогательные функции

const helpFuncs = {
    apply: {
        size(info, mode) {

            /*

                Функция применения различных размеров элемента в зависимости от типа.
                Может выставлять размер, стирать его и делать нулевым.

            */

            if (!checkType(info, "object") || !checkType(mode, "string")) {
                return false;
            }

            let elem = info.elem;
            let sizes = info.sizes;

            if (!checkType(elem, "object") || !checkType(sizes, "object")) {
                return false;
            }

            for (let i in sizes) {

                if (i !== "height") {

                    for (let j in sizes[i]) {

                        let name = i + j[0].toUpperCase() + j.slice(1);

                        switch (mode) {
                            case "size":
                                elem.style[name] = sizes[i][j] + "px"
                                break;
                            case "zero":
                                elem.style[name] = 0;
                                break;
                            case "remove":
                                elem.style[name] = "";
                                break;
                        }

                    }

                } else if (i === "height") {

                    switch (mode) {
                        case "size":
                            elem.style[i] = sizes[i] + "px";
                            break;
                        case "zero":
                            elem.style[i] = 0;
                            break;
                        case "remove":
                            elem.style[i] = "";
                            break;
                    }

                }

            }

        }
    },
    event: {
        hide(info) {

            /*

                Функция события, которое должно происходить при скрывании элемента.

            */

            if (!checkType(info, "object")) {
                return false;
            }

            helpFuncs.apply.size(info, "size");
            helpFuncs.set.defaultStyle(info, "add");

            setTimeout(function() {

                helpFuncs.apply.size(info, "zero");

                setTimeout(function() {
                    info.elem.style.display = "none";
                    helpFuncs.apply.size(info, "remove");
                    helpFuncs.set.defaultStyle(info, "remove");
                }, info.params.duration);

            }, 2);

        },
        show(info) {

            /*

                Функция события, которое должно происходить при открытии элемента.

            */

            if (!checkType(info, "object")) {
                return false;
            }

            helpFuncs.apply.size(info, "zero");
            helpFuncs.set.defaultStyle(info, "add");
            info.elem.style.display = info.params.display;

            setTimeout(function() {

                helpFuncs.apply.size(info, "size");

                setTimeout(function() {
                    helpFuncs.apply.size(info, "remove");
                    helpFuncs.set.defaultStyle(info, "remove");
                }, info.params.duration);

            }, 2);

        }
    },
    set: {
        defaultStyle(info, mode) {

            /*

                Функция выставления стилей, требующихся для плавного открытия и скрытия элемента.

            */

            if ((!info || !checkType(info.elem, "object") || !checkType(info.params, "object")) || !checkType(mode, "string")) {
                return false;
            }

            let elem = info.elem;

            if (mode === "add") {
                elem.style.overflow = "hidden";
                elem.style.transition = info.params.transition;
            } else if (mode === "remove") {
                elem.style.overflow = "";
                elem.style.transition = "";
            }

        },
        sizes(elem, sizes, visibly) {

            /*

                Функция сбора и записи всех требующихся размеров элемента для скрытия и открытия элемента.

            */

            if (!checkType(elem, "object") || !checkType(sizes, "object")) {
                return false;
            }

            for (let i in sizes) {

                if (i !== "height") {

                    for (let j in sizes[i]) {

                        let name = i + j[0].toUpperCase() + j.slice(1);

                        sizes[i][j] = parseFloat(getComputedStyle(elem)[name]);

                    }

                } else if (i === "height") {
                    sizes[i] = parseFloat(getComputedStyle(elem)[i]);
                }

            }

        }
    },
    get: {
        transition(duration, type) {

            /*

                Функция преобразования продолжительности открытия или скрытия элемента из числа в строку и возврат этой строки.

            */

            if (!checkType(duration, "number")) {
                return false;
            }

            let $duration = 0;
            let seconds = duration / 1000;

            if (seconds >= 1) {
                $duration = seconds + "s";
            } else {
                $duration = duration + "ms";
            }

            if (checkType(type, "string")) {
                return "margin " + $duration + " " + type + ", padding " + $duration + " " + type + ", height " + $duration + " " + type;
            } else {
                return "margin " + $duration + ", padding " + $duration + ", height " + $duration;
            }

        }
    }
};

// End Вспомогательные функции

export let slideToggle = function(params) {

    if (!checkType(params.elem, "object")) {
        return false;
    }

    // Объект со всеми параметрами

    /*

        1. elem - элемент, с которым работает функция
        2. sizes - все требуемые размеры этого элемента
        3. params - настраиваемые параметры функции

    */

    let $info = {
        elem: params.elem,
        sizes: {
            margin: {
                top: 0,
                bottom: 0
            },
            padding: {
                top: 0,
                bottom: 0
            },
            height: 0
        },
        params: {
            visibly: (getComputedStyle(params.elem).display == "none") ? false : true,
            duration: checkType(params.duration, "number") ? params.duration : 0,
            durationType: checkType(params.durationType, "string") ? params.durationType : null,
            display: checkType(params.display, "string") ? params.display : "block",
            transition: null
        }
    };

    // End Объект со всеми параметрами

    // Сокращения параметров главного объекта с информацией

    let $elem = $info.elem;
    let $sizes = $info.sizes;
    let $params = $info.params;

    // End Сокращения параметров главного объекта с информацией

    // Вызов всех вспомогательных функций отвечающих за работу функции

    $params.transition = helpFuncs.get.transition($params.duration, $params.durationType);
    helpFuncs.set.sizes($elem, $sizes);

    if ($params.visibly) {
        helpFuncs.event.hide($info);
    } else {

        if (isNaN($sizes.height)) {
            $elem.style.display = $params.display;
            helpFuncs.set.sizes($elem, $sizes, $params.visibly);
            $elem.style.display = "none";
        }

        helpFuncs.event.show($info);

    }

    // End Вызов всех вспомогательных функций отвечающих за работу функции

};