/*

    Description
    - - - - - -
    Плагин реализующий функционал попап окон.

    Принимает параметры:
        1. popups (string) (обязательный) - класс элементов попап окон
        2. btnsOpen (string) (не обязательный) - класс элементов выступающих в роли кнопок открытия попап окон
        3. btnsClose (string) (не обязательный) - класс элементов выступающих в роли кнопок закрытия попап окон
        4. fixed:
            4.1 margin (array) (не обязательный) - массив с названиями классов тех элементов, к которым при открытии попап окна нужно добавить margin чтобы они не скакали
            4.2 padding (array) (не обязательный) - массив с названиями классов тех элементов, к которым при открытии попап окна нужно добавить padding чтобы они не скакали
        5. dynamic (boolean) (не обязательный) - во включенном состоянии отвечает за работу с динамическими кнопками открытия и закрытия попап окон (подгружаемые ajax-ом). Дефолтное значение false
        6. mode (string) (не обязательный) - включает работу различных режимов открытия оверлея
            Значения mode:
                6.1 lap - оверлей будет открываться и скрываться кругом, из точки клика
        7. openClass (string) (не обязательный) - кастомный класс открытого попап окна. (будет работать если указан кастомный класс закрытого попап окна)
        8. closeClass (string) (не обязательный) - кастомный класс закрытого попап окна. (будет работать если указан кастомный класс открытого попап окна)
        9. popup:
            9.1 topIndent (number) (не обязательный) - верхний отступ для попап окна (задается в пикселях), для дефолтных стилей и в редких случаях применяется с кастомными стилями. Дефолтное значение 36 пикселей
            9.2 bottomIndent (number) (не обязательный) - нижний отступ для попап окна (задается в пикселях), для дефолтных стилей и в редких случаях применяется с кастомными стилями. Дефолтное значение 48 пикселей
            9.3 transitionTime (string) (не обязательный) - время анимации попап окна, задается строкой "0.3s или 300ms". Дефолтное значение 0.3s
        10. overlay:
            10.1 hide (boolean) (не обязательный) - отвечает за закрытие попап окна по клику на оверлей. Дефолтное значение false
            10.2 color (string) (не обязательный) - задает цвет оверлея. Дефолтное значение "#000000"
            10.3 opacity (number) (не обязательный) - задает прозрачность оверлея. Дефолтное значение 1
            10.4 transitionTime (string) (не обязательный) - время анимации оверлея, задается строкой "0.3s или 300ms". Дефолтное значение 0.3s

        Пример объекта с параметрами:
            {
                popups: "js-popup",
                btnsOpen: "js-open-popup",
                btnsClose: "js-close-popup",
                overlay: {
                    hide: true,
                    opacity: 0.6
                },
                popup: {
                    topIndent: 18,
                    bottomIndent: 24
                },
                openClass: "is-open",
                closeClass: "is-close"
            }

        Используемые атрибуты:
        1. data-popup - название попап окна (применяется к попап окнам)
        2. data-open-popup - название попап окна, которое нужно открыть (применяется к открывающим кнопкам, так же может писаться и у закрывающей кнопки, тогда она после закрытия основного окна, откроет другое)
        3. data-close-popup - название попап окна, которое нужно закрыть (применяется к закрывающим кнопкам)

        Публичные методы:
        1. attrs (getter) - возвращает объект с названиями используемых плагином атрибутов
        2. elements (getter) - возвращает объект со всеми элементами, с которыми работает плагин
        3. findElems - нахождение всех кнопок открытия и закрытия + все попап окна, или нахождение какого-то одного типа элементов
            //
                В метод можно передать тип элементов, которые нужно найти.
                Возможные значения:
                    1. popups - будет искать все попап окна
                    2. btnsOpen - будет искать кнопки открытия попап окон
                    3. btnsClose - будет искать кнопки закрытия попап окон
                    4. ничего не передавать - будет искать все вышеперечисленные типы элементов
        4. removePopup - удаление попап окна по его имени
            //
                В метод передается имя попап окна, которое нужно удалить
        5. open - открытие попап окна
            //
                В метод передается объект с параметрами:
                    1. popupName (string) (обязательный) - имя попап окна, которое нужно открыть
                    2. clickCoords (object) (не обязательный) - координаты клика, откуда будет открываться оверлей в режиме "lap" (координты передаются объектом - {x: 25, y: 300})
        6. close - закрытие попап окна, так же возможно открытие нового окна
            //
                В метод передается объект с параметрами:
                    1. popupName (string) (обязательный) - имя попап окна, которое нужно закрыть
                    2. reOpen (string) (не обязательный) - имя попап окна, которое нужно открыть после закрытия основного
        7. resizeOverlayHeight - перерасчет высоты оверлея
        8. addFuncs - добавление пользовательских функций, которые будут отрабатывать после различных событий (в зависимости от переданных параметров в методе)
            //
                В метод передается объект с параметрами:
                    1. funcs (array или function) (обязательный) - функция или массив с пользовательскими функциями
                    2. event (string) (обязательный) - событие при котором должны вызваться функции
                        Возможные значения:
                            2.1 open - открытие попап окна
                            2.2 close - закрытие попап окна
                            2.3 init - после инициализации плагина
                            2.4 scrollTop - прокрутка попап окна наверх
                    3. type (string) (не обязательный) - момент события после которого должны вызваться функции
                        Возможные значения:
                            3.1 after - после открытия попап окна или закрытия
                            3.2 before -  до открытия попап окна или закрытия
                    4. popupsName (array или string) (не обязательный) - имя попап окна или массив с именами попап окон, при закрытии или открытии которых должна отработать функция
        9. scrollTop - прокрутка открытого попап окна наверх (не будет работать если попап окна закрыты)

    // Note
        1. Открытие и закрытие попап окон может быть выполнено как при помощи кнопок, так и внутри js при помощи методов
        2 У попап окон обязательно должен быть атрибут data-popup с именеи этого попап окна, чтобы плагин мог рабоать с ним
        3. У кнопок открытия попап окон обязательно должен быть атрибут data-open-popup с указаным именем попап окна, которое нужно открыть
        4. У кнопок закрытия попап окон обязательно должен быть атрибут data-close-popup с указаным именем попап окна, которое нужно закрыть.
        Так же можно указать артибут data-open-popup с именем попап окна, которое нужно будет открыть после закрытия основного (не обязательно указывать)

*/

import {checkType} from "./check-type";
import {findFirstTag, findElemsClass, findElemsClasses} from "./find";
import {applyStyle} from "./apply-style";
import {attr} from "./attr";
import {findCurrentParent} from "./find-current-parent";
import {windowResize} from "./window-resize";

// Объект с используемыми плагином атрибутами

/*

    1. open - указывает с каким именем открыть всплывающее окно
    2. close - указывает с каким именем закрыть всплывающее окно
    3. popup - имя всплывающего окна

*/

const attrs = {
    open: "data-open-popup",
    close: "data-close-popup",
    popup: "data-popup"
};

// End Объект с используемыми плагином атрибутами

// Вспомогательные функции

const helpFuncs = {
    event: {
        init(module) {

            /*

                При инициализации у всех попап окон, у которых не указан кастомный стиль открытия, проставляет значение "display: block".
                Для полноценной работы этой функции, нужно чтобы в стилях у всех попап окон стояло "display: none". Это нужно для того чтобы
                при инициализации попап окна не прыгали и не появлялись сзади или мпереди основного контента.

            */

            if (!checkType(module, "object") && module.$info.params.classes.open) {
                return false;
            }

            for (let $popup of module.$info.elems.popups) {
                $popup.style.display = "block";
            }

        },
        btnClick(params) {

            /*

                Отслеживает клики на кнопках открытия и закрытия попап окон. Так же при включенном жинамическом параметре,
                будет отслеживать клики на все кнопки открытия и закрытия добавленные ajax-ом.

            */

            if (!checkType(params, "object")) {
                return false;
            }

            let type = params.type;
            let func = params.func;
            let module = params.module;

            if (!checkType(type, "string") || !checkType(func, "function") || !checkType(module, "object")) {
                return false;
            }

            let mode = type.replace("btns", "").toLowerCase();
            let $params = module.$info.params;
            let $elems = module.$info.elems;
            let $elemsClasses = module.$info.elemsClasses;
            let click = function(elem, e) {

                /*

                    Внутренная вспомогательная функция, которая собирает нужные данные с кнопки и в зависимости от них
                    вызывает соответсвующий метод плагина.

                */

                if (!checkType(elem, "object") || !checkType(e, "object")) {
                    return false;
                }

                let popupName = attr(elem, attrs[mode]);

                if (!popupName) {
                    return false;
                }

                let reOpen = attr(elem, attrs.open);

                e.preventDefault();

                if (mode === "close" && reOpen) {
                    func({popupName, reOpen, module});
                } else {

                    if (mode === "open" && $params.mode === "lap") {
                        helpFuncs.set.clickCoords({y: e.clientY, x: e.clientX}, module);
                    }

                    func({popupName, module});

                }

            };

            if ($params.dynamic) {

                document.addEventListener("click", function(e) {

                    let $class = $elemsClasses[type];

                    if (!$class) {
                        return false;
                    }

                    let elem = e.target;

                    if (elem.classList.contains($class)) {
                        click(elem, e);
                    } else {

                        let parent = findCurrentParent(elem, $class);

                        if (parent) {
                            click(parent, e);
                        }

                    }

                });

            } else if ($elems[type]) {

                for (let item of $elems[type]) {

                    item.addEventListener("click", function(e) {
                        click(item, e);
                    });

                }

            }

        },
        close(popup, module) {

            /*

                Отслеживает сколько попап окон открыто и какаие окна и в какой последовательности нужно закрывать.
                Так же при закрытии последнего попап окна, закрывает и оверлей и убирает все стили плагина,
                используемые при открытых попап окнах.

            */

            if (!checkType(popup, "object") || !checkType(module, "object")) {
                return false;
            }

            let $elems = module.$info.elems;
            let $params = module.$info.params;
            let $system = $params.system;
            let $styles = module.$styles;
            let openClass = $params.classes.open;
            let closeClass = $params.classes.close;

            if ($system.opened.length === 1) {

                applyStyle(document.body, $styles.body.open, "remove");
                $system.closed = true;
                applyStyle($elems.overlay, $styles.overlay.close, "add");
                module.__fixedElems("margin", "remove");
                module.__fixedElems("padding", "remove");

                if ($params.mode === "lap") {
                    applyStyle($elems.lap, $styles.lap.close, "add");
                }

                setTimeout(function() {
                    applyStyle($elems.wrapper, $styles.wrapper.close, "add");
                    $system.closed = false;
                }, $system.timeout);

            }

            if (openClass && closeClass) {
                popup.classList.remove(openClass);
                popup.classList.add(closeClass);
            } else {
                applyStyle(popup, $styles.popups.close, "add");
            }

            helpFuncs.set.closePopupHeight(popup, $system.popup.timeout);
            $system.opened.pop();

        }
    },
    set: {
        popupParams(module) {

            /*

                Сбор и запись всех требуемых для работы плагина параметров открытого попап окна.

            */

            if (!checkType(module, "object")) {
                return false;
            }

            let $system = module.$info.params.system;
            let popup = $system.popup.el;
            let $popupParams = $system.popup;

            $popupParams.margin.top = helpFuncs.get.currentSize(Math.abs(parseFloat(getComputedStyle(popup).marginTop)));
            $popupParams.margin.bottom = helpFuncs.get.currentSize(Math.abs(parseFloat(getComputedStyle(popup).marginBottom)));
            $popupParams.top = helpFuncs.get.currentSize(popup.offsetTop);
            $popupParams.height = helpFuncs.get.currentSize(Math.abs(popup.offsetHeight));

        },
        currentZIndex(popup, module) {

            /*

                Выставление корректного z-index для открытого попап окна, в зависимости от того
                открыто ли какое-либо другое попап окно или нет.
                Для каждого нового открытого попап окна z-index будет больше на 2 пункта.

            */

            if (!checkType(popup, "object") || !checkType(module, "object")) {
                return false;
            }

            let $opened = module.$info.params.system.opened;
            let openedLength = $opened.length;

            if (openedLength !== 0) {
                popup.style.zIndex = parseInt(getComputedStyle($opened[openedLength - 1]).zIndex) + 2;
            } else {
                popup.style.zIndex = 2;
            }

        },
        windowSizes(module) {

            /*

                Сбор и запись всех требуемых для работы плагина параметров окна браузера.

            */

            if (!checkType(module, "object")) {
                return false;
            }

            let $elems = module.$info.elems;
            let $system = module.$info.params.system;

            $system.window.width = window.innerWidth;
            $system.window.height = window.innerHeight;
            $system.html.width = $elems.html.offsetWidth;
            $system.diffWidth = $system.window.width - $system.html.width;

        },
        overlayHeight(module) {

            /*

                Установка высоты оверлея на основе имеющихся параметров,
                и подстраивание по высоте под различные размеры открытого попап окна

            */

            if (!checkType(module, "object")) {
                return false;
            }

            let $params = module.$info.params;
            let $styles = module.$styles;
            let $system = $params.system;
            let $popupParams = $system.popup;
            let popup = $popupParams.el;
            let fullPopupHeight = $popupParams.margin.top + $popupParams.margin.bottom + $popupParams.height;
            let fullPopupHeightWithTop = fullPopupHeight + $popupParams.top;
            let indentTop = $params.popup.indent.top;
            let indentBottom = $params.popup.indent.bottom;

            if ($params.classes.open) {

                if (fullPopupHeightWithTop >= $system.window.height) {

                    let diffHeight = fullPopupHeightWithTop === fullPopupHeight;

                    if (diffHeight) {

                        $styles.overlay.open.height = fullPopupHeight + indentTop + indentBottom + "px";
                        $styles.overlay.reOpen.height = $styles.overlay.open.height;
                        $system.overlay.height = parseInt($styles.overlay.open.height);

                    } else {

                        let transformY = helpFuncs.get.transform(popup, "y");
                        let diff;

                        if (transformY) {

                            let transformX = helpFuncs.get.transform(popup, "x");

                            popup.style.top = indentTop + "px";

                            if (transformX) {
                                popup.style.transform = "translate(" + transformX +  "px, 0)";
                            } else {
                                popup.style.transform = "translate(0, 0)";
                            }

                            $styles.overlay.open.height = fullPopupHeight + indentTop + indentBottom + "px";
                            $styles.overlay.reOpen.height = $styles.overlay.open.height;
                            $system.overlay.height = parseInt($styles.overlay.open.height);

                        } else {

                            diff = fullPopupHeightWithTop - fullPopupHeight;
                            $styles.overlay.open.height = (fullPopupHeight + diff * 2) + "px";
                            $styles.overlay.reOpen.height = $styles.overlay.open.height;
                            $system.overlay.height = parseInt($styles.overlay.open.height);

                        }

                    }

                } else {

                    $styles.overlay.open.height = "100%";
                    $styles.overlay.reOpen.height = "100%";
                    $system.overlay.height = parseInt($styles.overlay.open.height);

                }

            } else {

                if (fullPopupHeight >= $system.window.height) {

                    popup.style.top = indentTop + "px";
                    popup.style.transform = "translateX(-50%)";
                    $styles.overlay.open.height = fullPopupHeight + indentTop + indentBottom + "px";
                    $styles.overlay.reOpen.height = $styles.overlay.open.height;
                    $system.overlay.height = parseInt($styles.overlay.open.height);

                } else {

                    popup.style.top = "50%";
                    popup.style.transform = "translate(-50%, -50%)";
                    $styles.overlay.open.height = "100%";
                    $styles.overlay.reOpen.height = "100%";
                    $system.overlay.height = $system.window.height;

                }

            }

        },
        closePopupHeight(popup, time) {

            /*

                Выставление нулевой высоты для закрывающегося попап окна с задержкой

            */

            if (!checkType(popup, "object") || !checkType(time, "number")) {
                return false;
            }

            setTimeout(function() {
                popup.style.height = 0;
            }, time);

        },
        clickCoords(coords, module) {

            /*

                Сбор и запись коррдинатов клика на кнопке открытия попап окна
                Нужно для работы анимации оверлея при включенном моде "lap"

            */

            if (!checkType(coords, "object") || !checkType(module, "object")) {
                return false;
            }

            let $clickCoords = module.$info.params.system.clickCoords;
            let y = coords.y;
            let x = coords.x;

            $clickCoords.y = (y < 0 || y > 0) ? y : 0;
            $clickCoords.x = (x < 0 || x > 0) ? x : 0;

        },
        lapSize(module) {

            /*

                Выставление размера круга оверлея при включенном моде "lap" в зависимости от параметров

            */

            if (!checkType(module, "object")) {
                return false;
            }

            let $system = module.$info.params.system;
            let $lapStyle = module.$styles.lap;
            let overlayHeight = $system.overlay.height;
            let windowWidth = $system.window.width;
            let windowHeight = $system.window.height;
            let setSize = function(size) {

                /*

                    Внутренняя вспомогательная функция записи размеров круга в стили

                */

                if (!checkType(size, "number")) {
                    return false;
                }

                size += "px";
                $lapStyle.open.width = size;
                $lapStyle.open.height = size;
                $lapStyle.reOpen.width = size;
                $lapStyle.reOpen.height = size;

            };

            $lapStyle.open.top = $system.clickCoords.y + "px";
            $lapStyle.open.left = $system.clickCoords.x + "px";

            if ((overlayHeight >= windowHeight) && (overlayHeight >= windowWidth)) {
                setSize(overlayHeight * 4);
            } else if ((overlayHeight > windowHeight) && (overlayHeight <= windowWidth)) {
                setSize(windowWidth * 4);
            } else if (overlayHeight <= windowHeight) {

                if (windowWidth >= windowHeight) {
                    setSize(windowWidth * 4);
                } else {
                    setSize(windowHeight * 4);
                }

            }

        }
    },
    get: {
        currentTimeout(time) {

            /*

                Форматирование времени из строки в корректное число и возврат полученного результата

            */

            if (!checkType(time, "string")) {
                return false;
            }

            let timeStrLength = time.length;
            let lastLetter = time[timeStrLength - 1];
            let preLastLetter = time[timeStrLength - 2];

            if (preLastLetter === "m" && lastLetter === "s") {
                time = Math.abs(+parseInt(time));
            } else if (preLastLetter !== "m" && lastLetter === "s") {
                time = Math.abs(+parseInt(time)) * 1000;
            }

            return time;

        },
        currentSize(size) {

            /*

                Проверка корректности заданого размера, если это число то вернет это же число, если нет, то вернет 0

            */

            if (checkType(size, "number")) {
                return size;
            } else {
                return 0;
            }

        },
        transform(elem, type) {

            /*

                Смотрит есть ли у заданного элемента сдвиг через translate по оси x или y,
                если есть, то возвращает сдвиг в пикселях, если нет, то false

            */

            if (!checkType(elem, "object") || !checkType(type, "string")) {
                return false;
            }

            let style = getComputedStyle(elem).transform;
            let styleLength = style.length;

            if (!style) {
                return false;
            }

            if (type == "y") {
                return style.substr(7, styleLength - 8).split(", ")[5];
            } else if (type == "x") {
                return style.substr(7, styleLength - 8).split(", ")[4];
            }

        },
        popupsName(name) {

            /*

                Проверяет переданное значение, на то чтобы оно было строковым,
                если передан массив, то перебирает его и проверят все значение внутри.
                Проверенные занчения добавляет в массив и если он не пустой, то возвращает его с записанными значениями.

            */

            if (!name) {
                return false;
            }

            let namesArray = [];

            if (checkType(name, "string")) {
                namesArray.push(name);
            } else if (checkType(name, "array")) {

                for (let item of name) {
                    if (checkType(item, "string")) {
                        namesArray.push(item);
                    }
                }

            }

            if (namesArray.length !== 0) {
                return namesArray;
            }

        }
    }
};

// End Вспомогательные функции

export let OldPopups = class {

    constructor(params) {

        if (checkType(params.popups, "string")) {

            let $module = this;

            // Сокращения для параметров

            let $pFixed = params.fixed;
            let $pPopup = params.popup;
            let $pOverlay = params.overlay;

            // End Сокращения для параметров

            // Объект со всеми параметрами плагина

            /*

                1. elements - все элементы плагина
                2. elemsClasses - все классы элементов плагина
                3. params - изменяемые параметры плагина, так же в себя включают системные параметры
                4. params.system - системные параметры, не редактируются методами или напрямую
                5. funcs - массивы пользовательских функций, исполняющиеся в зависимости от условий

            */

            this.$info = {
                elems: {
                    popups: null,
                    btnsOpen: null,
                    btnsClose: null,
                    wrapper: null,
                    overlay: null,
                    lap: null,
                    html: findFirstTag("html", document),
                    fixed: {
                        margin: ($pFixed && checkType($pFixed.margin, "array")) ? findElemsClasses($pFixed.margin, document) : null,
                        padding: ($pFixed && checkType($pFixed.padding, "array")) ? findElemsClasses($pFixed.padding, document) : null
                    }
                },
                elemsClasses: {
                    popups: params.popups,
                    btnsOpen: checkType(params.btnsOpen, "string") ? params.btnsOpen : null,
                    btnsClose: checkType(params.btnsClose, "string") ? params.btnsClose : null
                },
                params: {
                    dynamic: checkType(params.dynamic, "boolean") ? true : false,
                    mode: checkType(params.mode, "string") ? params.mode : null,
                    classes: {
                        open: (checkType(params.openClass, "string") && checkType(params.closeClass, "string")) ? params.openClass : null,
                        close: (checkType(params.openClass, "string") && checkType(params.closeClass, "string")) ? params.closeClass : null
                    },
                    popup: {
                        indent: {
                            top: ($pPopup && checkType($pPopup.topIndent, "number")) ? $pPopup.topIndent : 36,
                            bottom: ($pPopup && checkType($pPopup.bottomIndent, "number")) ? $pPopup.bottomIndent : 48
                        }
                    },
                    overlay: {
                        hide: ($pOverlay && checkType($pOverlay.hide, "boolean")) ? true : false
                    },
                    system: {
                        window: {
                            width: null,
                            height: null
                        },
                        html: {
                            width: null
                        },
                        clickCoords: {
                            y: 0,
                            x: 0
                        },
                        popup: {
                            el: null,
                            margin: {
                                top: null,
                                bottom: null
                            },
                            top: null,
                            height: null,
                            timeout: ($pPopup && checkType($pPopup.transitionTime, "string")) ? helpFuncs.get.currentTimeout($pPopup.transitionTime) : 300
                        },
                        overlay: {
                            height: null
                        },
                        defaultElemsTag: "div",
                        timeout: ($pOverlay && checkType($pOverlay.transitionTime, "string")) ? helpFuncs.get.currentTimeout($pOverlay.transitionTime) : 300,
                        diffWidth: null,
                        opened: [],
                        closed: false
                    }
                },
                funcs: {
                    open: {
                        after: [],
                        before: []
                    },
                    close: {
                        after: [],
                        before: []
                    },
                    init: [],
                    scrollTop: {
                        after: [],
                        before: []
                    }
                }
            };

            // End Объект со всеми параметрами плагина

            // Запись атрибутов в плагин

            this.$attrs = attrs;

            // End Запись атрибутов в плагин

            // Используемые плагином стили

            /*

                1. wrapper - стили обертки всех попап окон
                2. overlay - стили подложки попап окон
                3. lap - стили анимированного появления подложки
                4. popups - дефолтные стили попап окон
                5. body - стили body
                6. fixed - стили для фиксированных элементов, чтобы они не дергались при открытии попап окна

            */

            this.$styles = {
                wrapper: {
                    default: {
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        overflow: "hidden",
                        overflowY: "auto",
                        opacity: 0,
                        zIndex: -9999
                    },
                    open: {
                        opacity: 1,
                        zIndex: 9999
                    },
                    close: {
                        opacity: 0,
                        zIndex: -9999
                    }
                },
                overlay: {
                    default: {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        backgroundColor: ($pOverlay && checkType($pOverlay.color, "string")) ? $pOverlay.color : "#000000",
                        willChange: "opacity",
                        overflow: "hidden",
                        opacity: 0,
                        cursor: ($pOverlay && checkType($pOverlay.hide, "boolean")) ? "pointer" : "default",
                        transition: ($pOverlay && checkType($pOverlay.transitionTime, "string")) ? "opacity " + $pOverlay.transitionTime + " ease" : "opacity 0.3s ease",
                        zIndex: 0
                    },
                    open: {
                        height: null,
                        opacity: ($pOverlay && ($pOverlay.opacity >= 0 && $pOverlay.opacity < 1)) ? $pOverlay.opacity : 1
                    },
                    close: {
                        opacity: 0
                    },
                    reOpen: {
                        height: null
                    }
                },
                lap: {
                    default: {
                        position: "absolute",
                        width: 0,
                        height: 0,
                        backgroundColor: ($pOverlay && checkType($pOverlay.color, "string")) ? $pOverlay.color : "#000000",
                        borderRadius: "50%",
                        willChange: "width, height, transform, opacity",
                        transform: "translate(-50%, -50%) scale(0)",
                        transition: ($pOverlay && checkType($pOverlay.transitionTime, "string")) ? "width " + $pOverlay.transitionTime + " ease, height " + $pOverlay.transitionTime + " ease, opacity 0s " + $pOverlay.transitionTime + " ease, transform " + $pOverlay.transitionTime + " ease" : "width 0.3s ease, height 0.3s ease, opacity 0s 0.3s ease, transform 0.3s ease",
                        opacity: 0,
                        zIndex: 0
                    },
                    open: {
                        top: null,
                        left: null,
                        width: null,
                        height: null,
                        transform: "translate(-50%, -50%) scale(1)",
                        transition: ($pOverlay && checkType($pOverlay.transitionTime, "string")) ? "width " + $pOverlay.transitionTime + " ease, height " + $pOverlay.transitionTime + " ease, opacity 0s 0s ease, transform " + $pOverlay.transitionTime + " ease" : "width 0.3s ease, height 0.3s ease, opacity 0s 0s ease, transform 0.3s ease",
                        opacity: 1
                    },
                    close: {
                        width: 0,
                        height: 0,
                        transform: "translate(-50%, -50%) scale(0)",
                        transition: ($pOverlay && checkType($pOverlay.transitionTime, "string")) ? "width " + $pOverlay.transitionTime + " ease, height " + $pOverlay.transitionTime + " ease, opacity 0s " + $pOverlay.transitionTime + "ease , transform " + $pOverlay.transitionTime + " ease" : "width 0.3s ease, height 0.3s ease, opacity 0s 0.3s ease, transform 0.3s ease",
                        opacity: 0
                    },
                    reOpen: {
                        width: null,
                        height: null
                    }
                },
                popups: {
                    default: {
                        position: "absolute",
                        left: "50%",
                        willChange: "opacity",
                        transform: "translateX(-50%)",
                        transition: ($pPopup && checkType($pPopup.transitionTime, "string")) ? "opacity " + $pPopup.transitionTime + " ease, z-index " + $pPopup.transitionTime + " ease" : "opacity 0.3s ease, z-index 0.3s ease",
                        opacity: 0,
                        zIndex: -2
                    },
                    open: {
                        opacity: 2
                    },
                    close: {
                        opacity: 0,
                        zIndex: -2
                    }
                },
                body: {
                    open: {
                        overflow: "hidden"
                    }
                },
                fixed: {
                    margin: {
                        marginRight: null
                    },
                    padding: {
                        paddingRight: null
                    }
                }
            };

            // End Используемые плагином стили

            let resize = function() {
                $module.resizeOverlayHeight();
            };

            // Вызов всех методов и функций отвечающих за работу плагина

            this.findElems();
            this.__createOverlay();
            helpFuncs.event.btnClick({
                type: "btnsOpen",
                func: this.open,
                module: $module
            });
            helpFuncs.event.btnClick({
                type: "btnsClose",
                func: this.close,
                module: $module
            });
            this.__overlayClose();
            this.__applyFuncs("init");
            windowResize(resize);

            // End Вызов всех методов и функций отвечающих за работу плагина

        }

    }

    // Геттер возвращающий все используемые плагином атрибуты

    get attrs() {
        return this.$attrs;
    }

    // End Геттер возвращающий все используемые плагином атрибуты

    // Геттер возвращающий все элементы плагина

    get elems() {
        return this.$info.elems;
    }

    // End Геттер возвращающий все элементы плагина

    // Нахождение элементов

    /*

        Публичный метод.
        - - - - -
        Нахождение всех элементов, или каких-то определенных, которые необходимы для работы плагина. Так же этот метод используется
        для поиска новых элементов, подгруженных ajax-ом.
        При поиски попап окон, после их нахождения добавляет их во врапер с оверлеем.

        Использует методы: __addPopupsToWrapper

    */

    findElems(typeElems) {

        let $elems = this.$info.elems;
        let $elemsClasses = this.$info.elemsClasses;
        let elems;

        if (checkType(typeElems, "string")) {

            elems = findElemsClasses($elemsClasses[typeElems], document);
            $elems[typeElems] = elems ? elems : null;

            if (typeElems === "popups" && elems) {
                this.__addPopupsToWrapper();
            }

        } else {

            for (let i in $elems) {
                if (i === "popups" || i === "btnsOpen" || i === "btnsClose") {
                    elems = findElemsClass($elemsClasses[i], document);
                    $elems[i] = elems ? elems : null;
                }
            }

        }

    }

    // End Нахождение элементов

    // Создание оверлея

    /*

        Внутренний метод
        - - - - -
        Создает обертку для попап окон и подложку для них, так же в зависимости от активированного мода настраивает вид подложки.
        Вызывает внутренний метод __addPopusToWrapper для добавления всех попап окон плагина в обертку.

        Использует методы: __addPopupsToWrapper

    */

    __createOverlay() {

        let $elems = this.$info.elems;
        let $params = this.$info.params;
        let $styles = this.$styles;
        let $mode = $params.mode;

        for (let i in $elems) {

            if (i === "wrapper" || i === "overlay" || (i === "lap" && $mode === "lap")) {

                $elems[i] = document.createElement($params.system.defaultElemsTag);

                if ($styles[i] && $styles[i].default) {
                    applyStyle($elems[i], $styles[i].default, "add");
                }

            }

        }

        if ($mode === "lap") {
            $elems.overlay.appendChild($elems.lap);
            $elems.overlay.style.backgroundColor = "transparent";
        }

        $elems.wrapper.appendChild($elems.overlay);
        $elems.html.appendChild($elems.wrapper);
        this.__addPopupsToWrapper();

    }

    // End Создание оверлея

    // Добвление попап окон в обертку с оверлеем

    /*

        Внутренний метод
        - - - - -
        Добавления всех найденых попап окон в обертку
        После добавления всех окон вызывается вспомогательная функция init.

        Использует вспомогательную функцию event.init

    */

    __addPopupsToWrapper() {

        let $elems = this.$info.elems;

        if (!$elems.popups || !$elems.wrapper) {
            return false;
        }

        let $closeClass = this.$info.params.classes.close;

        for (let $popup of $elems.popups) {

            if ($closeClass) {
                $popup.classList.add($closeClass);
            } else {
                applyStyle($popup, this.$styles.popups.default, "add");
                $popup.style.height = 0;
            }

            $elems.wrapper.appendChild($popup);

        }

        helpFuncs.event.init(this);

    }

    // End Добвление попап окон в обертку с оверлеем

    // Удаление попап окна

    /*

        Публичный метод.
        - - - - -
        Удаление попап окна по его имени. После удаления заново находит все попап окна методом findElems,
        для того чтобы поддерживать список работающих попап окон всегда актуальным.

    */

    removePopup(popupName) {

        if (!checkType(popupName, "string")) {
            return false;
        }

        let $elems = this.$info.elems;

        for (let $popup of $elems.popups) {

            let $popupName = attr($popup, attrs.popup);

            if ($popup && $elems.wrapper && $popupName === popupName) {
                $elems.wrapper.removeChild($popup);
                this.findElems("popups");
            }

        }

    }

    // End Удаление попап окна

    // Открытие попап окна

    /*

        Публичный метод.
        - - - - -
        Открытие попап окна по имени, передаваемым в одном за параметров.

        1. popupName - имя попап окна, которое нужно открыть
        2. clickCoords - координаты клика, работают только если активирован мод "lap"
        3. module - внутренний параметр, отвечает за значение элемента this

        Использует методы: __applyFuncs, __fixedElems, __overlayHeight
        Использует вспомогательные функции:

            1. set:
                1.1 clickCoords
                1.2 lapSize
                1.3 currentZIndex

    */

    open(params) {

        if (!checkType(params, "object") || !checkType(params.popupName, "string")) {
            return false;
        }

        let $this = this ? this : params.module;

        if (!checkType($this, "object")) {
            return false;
        }

        let $elems = $this.$info.elems;
        let $params = $this.$info.params;
        let $funcs = $this.$info.funcs;
        let $styles = $this.$styles;
        let $openClass = $params.classes.open;
        let $closeClass = $params.classes.close;

        if (checkType(params.clickCoords, "object")) {
            helpFuncs.set.clickCoords(params.clickCoords, $this);
        }

        for (let $popup of $elems.popups) {

            let popupName = attr($popup, attrs.popup);

            if (popupName === params.popupName) {

                $this.__applyFuncs("open", "before", popupName);
                $popup.style.height = "";
                $this.__overlayHeight($popup);

                if ($params.system.opened.length === 0) {

                    applyStyle(document.body, $styles.body.open, "add");
                    applyStyle($elems.wrapper, $styles.wrapper.open, "add");
                    applyStyle($elems.overlay, $styles.overlay.open, "add");
                    $this.__fixedElems("margin", "add");
                    $this.__fixedElems("padding", "add");

                    if ($params.mode === "lap") {
                        helpFuncs.set.lapSize($this);
                        applyStyle($elems.lap, $styles.lap.open, "add");
                    }

                }

                if ($openClass && $closeClass) {
                    $popup.classList.remove($closeClass);
                    $popup.classList.add($openClass);
                } else {
                    applyStyle($popup, $styles.popups.open, "add");
                }

                helpFuncs.set.currentZIndex($popup, $this);

                if ($params.system.opened.includes($popup)) {
                    $params.system.opened.push($popup);
                }

                setTimeout(function() {
                    $this.__applyFuncs("open", "after", popupName);
                }, $params.system.timeout);

            }

        }

    }

    // End Открытие попап окна

    // Закрытие попап окна

    /*

        Публичный метод.
        - - - - -
        Закрытие попап окна по имени, передаваемым в одном за параметров. Так же открывает другое попап окно,
        если есть соответствующий атрибут с именем попап окна, которое нужно открыть.

        1. popupName - имя попап окна, которое нужно открыть
        2. reOpen - имя попап окна, которое нужно открыть после закрытия основного
        3. module - внутренний параметр, отвечает за значение элемента this

        Использует методы: __applyFuncs, open, scrollTop
        Использует вспомогательные функции:
            1. event:
                1.1 close

    */

    close(params) {

        let $this = this ? this : params.module;
        let $info = $this.$info;
        let $params = $info.params;
        let $system = $params.system;

        if (!$this) {
            return false;
        }

        if (params && checkType(params.popupName, "string")) {

            let $elems = $info.elems;
            let $styles = $this.$styles;

            for (let $popup of $elems.popups) {

                let popupName = attr($popup, attrs.popup);

                $this.__applyFuncs("close", "before", popupName);

                if (params.popupName === popupName && !params.reOpen && $system.opened.length !== 0) {

                    helpFuncs.event.close($popup, $this);

                    setTimeout(function() {
                        $this.__applyFuncs("close", "after", popupName);
                    }, $system.timeout);

                } else if (params.reOpen) {

                    let openClass = $params.classes.open;
                    let closeClass = $params.classes.close;

                    if (popupName === params.popupName) {

                        if (openClass && closeClass) {
                            $popup.classList.remove(openClass);
                            $popup.classList.add(closeClass);
                        } else {
                            applyStyle($popup, $styles.popups.close, "add");
                        }

                        $system.opened.pop();

                        setTimeout(function() {
                            $this.__applyFuncs("close", "after", popupName);
                        }, $system.timeout);

                    } else if (popupName === params.reOpen) {

                        $this.open({
                            popupName
                        });

                        // FIXED, TESTING

                        // if (openClass && closeClass) {

                        //   $popup.classList.remove(closeClass);
                        //   $popup.classList.add(openClass);

                        // } else {

                        //   helpFuncs.set.currentZIndex($popup);
                        //   applyStyle($popup, $styles.popups.open, "add");
                        //   $this.resizeOverlayHeight();

                        // }

                        // $system.opened.push($popup);
                        $this.scrollTop();

                    }

                }

            }

        } else {

            let lastOpenPopup = $system.opened[$system.opened.length - 1];
            let popupName = attr(lastOpenPopup, $this.attrs.popup);

            $this.__applyFuncs("close", "before", popupName);
            helpFuncs.event.close(lastOpenPopup, $this);

            setTimeout(function() {
                $this.__applyFuncs("close", "after", popupName);
            }, $system.timeout);

        }

    }

    // End Закрытие попап окна

    // Установка высоты оверлея при открытии попап окна

    /*

        Внутренний метод
        - - - - -
        Первоначальная установка высоты оверлея при открытии попап окна.

        Использует вспомогательные функции:
            1. set:
                1.1 windowSizes
                1.2 popupParams
                1.3 overlayHeight

    */

    __overlayHeight(popup) {

        let $system = this.$info.params.system;

        if (checkType(popup, "object") || $system.opened.length !== 0) {

            helpFuncs.set.windowSizes(this);
            this.$styles.body.open.paddingRight = $system.diffWidth + "px";

            if (popup) {
                $system.popup.el = popup;
            } else {

                let lastOpenPopup = $system.opened[$system.opened.length - 1];

                if (lastOpenPopup) {
                    $system.popup.el = lastOpenPopup;
                }

            }

            if ($system.popup.el) {
                helpFuncs.set.popupParams(this);
                helpFuncs.set.overlayHeight(this);
            }

        }

    }

    // End

    // Перерасчет высоты оверлея

    /*

        Публичный метод.
        - - - - -
        Перерасчет высоты оверлея, работает только при открытом попап окне
        (в плагине используется при ресайзе экрана)
        Так же пересчитывает координты для мода "lap"

        Использует вспомогательные функции:
            1. set
                1.1 windowSizes
                1.2 popupParams
                1.3 overlayHeight
                1.4 lapSize

    */

    resizeOverlayHeight() {

        let $elems = this.$info.elems;
        let $params = this.$info.params;
        let $system = $params.system;
        let $styles = this.$styles;
        let lastOpenPopup = $system.opened[$system.opened.length - 1];

        if (checkType(lastOpenPopup, "object")) {

            helpFuncs.set.windowSizes(this);
            helpFuncs.set.popupParams(this);
            helpFuncs.set.overlayHeight(this);
            applyStyle($elems.overlay, $styles.overlay.reOpen, "add");

        }

        if ($params.mode === "lap") {
            helpFuncs.set.lapSize(this);
            applyStyle($elems.lap, $styles.lap.reOpen, "add");
        }

    }

    // End Перерасчет высоты оверлея

    // Установка отступа у элементов

    /*

        Внутренний метод
        - - - - -
        Установка отступа у элементов которые не должны дергаться при открытии попап окна
        Задает правый margin или padding в зависимости от того какой тип для элемента указан

    */

    __fixedElems(type, mode) {

        if (!checkType(type, "string") || !checkType(mode, "string")) {
            return false;
        }

        let $fixed = this.$info.elems.fixed;
        let $system = this.$info.params.system;
        let $styles = this.$styles;

        $styles.fixed[type][type + "Right"] = $system.diffWidth + "px";

        if (!$fixed[type]) {
            return false;
        }

        for (let item of $fixed[type]) {
            for (let elem of item) {
                applyStyle(elem, $styles.fixed[type], mode);
            }
        }

    }

    // End Установка отступа у элементов

    // Закрытие попап окна при клике на оверлей

    /*

        Внутренний метод
        - - - - -
        Закрытие попап окна в зависимости от заданных параметров при клике на оверлей


    */

    __overlayClose() {

        let $module = this;
        let $overlay = this.$info.elems.overlay;
        let $params = this.$info.params;

        if (!$overlay || !$params.overlay.hide) {
            return false;
        }

        $overlay.addEventListener("click", function() {
            if (!$params.system.closed) {
                $module.close();
            }
        });

    }

    // End Закрытие попап окна при клике на оверлей

    // Прокрутка открытого попап окна наверх

    /*

        Публичный метод.
        - - - - -

    */

    scrollTop() {

        let $opened = this.$info.params.system.opened;
        let openedLength = $opened.length;

        if (openedLength === 0) {
            return false;
        }

        let openPopupName = attr($opened[openedLength - 1], attrs.popup);

        this.__applyFuncs("scrollTop", "before", openPopupName);
        this.$info.elems.wrapper.scrollTop = 0;
        this.__applyFuncs("scrollTop", "after", openPopupName);

    }

    // End Прокрутка открытого попап окна наверх

    // Добавление пользовательских функций

    /*

        Публичный метод.
        - - - - -
        Добавление пользовательских функций для различных событий и типов, в зависимости от переданных параметров.
        Позволяет записывать определенные функции только для определенных попап окон.

        1. funcs - функция, или массив с функциями
        2. event - тип события (open или close)
        3. type - момент когда исполнять функцию (after или before)
        4. popupsName - имя попап окна для которого предназначена функция или массив имен

        Использует вспомогательный функции:
            1. get:
                1.1 popupsName

    */

    addFuncs(params) {

        if (!checkType(params, "object")) {
            return false;
        }

        let funcs = params.funcs;
        let event = params.event;
        let type = params.type;
        let popupsName = helpFuncs.get.popupsName(params.popupsName);
        let $checkType = checkType(type, "string");

        if (!funcs || !checkType(event, "string")) {
            return false;
        }

        let $funcs = this.$info.funcs;

        if (checkType(funcs, "function")) {

            if (popupsName) {
                $checkType ? $funcs[event][type].push([funcs, popupsName]) : $funcs[event].push([funcs, popupsName])
            } else {
                $checkType ? $funcs[event][type].push(funcs) : $funcs[event].push(funcs);
            }

        } else if (checkType(funcs, "array")) {

            for (let func of funcs) {
                if (checkType(func, "function")) {
                    if (popupsName) {
                        $checkType ? $funcs[event][type].push([func, popupsName]) : $funcs[event].push([func, popupsName]);
                    } else {
                        $checkType ? $funcs[event][type].push(func) : $funcs[event].push(func);
                    }
                }
            }

        }

    }

    // End Добавление пользовательских функций

    //  Исполнение пользовательских функций

    /*

        Внутренний метод
        - - - - -
        Исполнение пользовательских функций для различных событий и типов, в зависимости от переданных параметров.
        Может исполнять определенные функции только для определенных попап окон.

        1. event - тип события (open или close)
        2. type - момент когда исполнять функцию (after или before)
        3. popupName - имя попап окна для которого предназначена функция

    */

    __applyFuncs(event, type, popupName) {

        let $funcs = this.$info.funcs;
        let array = type ? $funcs[event][type] : $funcs[event];

        if (!array || array.length === 0) {
            return false;
        }

        for (let item of array) {

            if (item.length === 2) {
                for (let popup of item[1]) {
                    if (popup === popupName) {

                        let func = item[0];

                        func();

                    }
                }
            } else {
                item();
            }

        }

    }

    // End Исполнение пользовательских функций

};