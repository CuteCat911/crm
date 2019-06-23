/*

    Description
    - - - - - -
    Плагин реализующий работу табов.

    Принимает параметры:
        1. container (string) (обязательный) - класс контейнера с табами и контентом
        2. tab:
            2.1 class (string) (обязательный) - класс табов
            2.2 activeClass (string) (не обязательный) - класс активного таба. Дефолтное значение "is-active"
        3. content:
            3.1 class (string) (обязательный) - класс контента для таба
            3.2 openClass (string) (не обязательный) - класс активного контента. Дефолтное значение "is-open"
        4. delay (number) (не обязательный) - задержка добавления активного класса. Дефолтное значение "0"
        5. dynamic (boolean) (не обязательный) - во включенном состоянии отвечает за работу с динамическими табами (подгружаемые ajax-ом). Дефолтное значение false

    Пример объекта с параметрами:
        {
            container: "js-tabs-container",
            tab: {
                class: "js-tab",
                activeClass: "active-tab"
            },
            content: {
                class: "js-content",
                activeClass: "open-content"
            },
            delay: 300,
            dynamic: true
        }

    Используемые атрибуты:
        data-tab-name - Название таба (Применяется только к табам)
        data-content-name - Название контента для таба (Применяется только к контенту)

    Публичные методы:
        1. attrs (getter) - возвращает объект с названиями используемых плагином атрибутов
        2. changeTab - смена активного таба вместе с контентом
            // В метод передается имя таба, на который нужно переключить

    // Note
        1. У табов обязательно должен быть атрибут data-tab-name с указаным именем
        2. У контента обязательно должен быть атрибут data-content-name с указаным именем
        3. Имена таба и контента, которые связаны должны быть одинаковыми

*/

import {checkType} from "./check-type";
import {findElemsClass} from "./find";
import {activeClass, openClass} from "./state-classes";
import {findCurrentParent} from "./find-current-parent";
import {attr} from "./attr";

// Объект с используемыми плагином атрибутами

/*

    name.tab - указывает имя таба
    name.content - указывает имя контента

*/

const attrs = {
    name: {
        tab: "data-tab-name",
        content: "data-content-name"
    }
};

// End Объект с используемыми плагином атрибутами

// Вспомогательные функции

const helpFuncs = {
    event: {
        click: {
            tabs(module) {

                /*

                    Отслеживает клики по табам и активирует метод переключения табов.
                    Если включен режим dynamic, то будет отслеживать все клики по динамически добавленным табам (подгруженные ajax-ом)

                */

                if (!checkType(module, "object")) {
                    return false;
                }

                let $info = module.$info;
                let $elems = $info.elems;
                let $elemsClasses = $info.elemsClasses;
                let $dynamic = $info.params.dynamic;
                let changeTab = module.changeTab;

                if ($elems.containers && $elems.tabs && $elems.contents && !$dynamic) {

                    for (let $tab of $elems.tabs) {
                        $tab.addEventListener("click", function() {
                            changeTab($tab);
                        });
                    }

                } else {

                    document.addEventListener("click", function(e) {

                        let elem = e.target;

                        if (elem.classList.contains($elemsClasses.tab)) {
                            changeTab(elem);
                        } else {

                            let parent = findCurrentParent(elem, $elemsClasses.tab);

                            if (parent) {
                                changeTab(parent);
                            }

                        }

                    });

                }

            }
        }
    }
};

// End Вспомогательные функции

export let Tabs = class {

    constructor(params) {

        // Сокращения для параметров

        let $pTab = params.tab;
        let $pContent = params.content;

        // End Сокращения для параметров

        if (checkType(params.container, "string") && ($pTab && checkType($pTab.class, "string")) && ($pContent && checkType($pContent.class, "string"))) {

            let $module = this;

            // Объект со всеми параметрами плагина

            /*

                1. elements - все элементы плагина
                2. elemsClasses - все классы элементов плагина
                3. params - Изменяемы параметры плагина

            */

            this.$info = {
                elems: {
                    containers: findElemsClass(params.container, document),
                    tabs: findElemsClass($pTab.class, document),
                    contents: findElemsClass($pContent.class, document)
                },
                elemsClasses: {
                    container: params.container,
                    tab: $pTab.class,
                    content: $pContent.class
                },
                params: {
                    delay: checkType(params.delay, "number") ? params.delay : 0,
                    dynamic: checkType(params.dynamic, "boolean") ? true : false,
                    stateClasses: {
                        active: {
                            tab: checkType($pTab,activeClass, "string") ? $pTab.activeClass : activeClass
                        },
                        open: {
                            content: checkType($pContent.openClass, "string") ? $pContent.openClass : openClass
                        }
                    }
                }
            };

            // End Объект со всеми параметрами плагина

            // Запись атрибутов в плагин

            this.$attrs = attrs;

            // End Запись атрибутов в плагин

            helpFuncs.event.click.tabs(this);

        }

    }

    // Геттер возвращающий все используемые плагином атрибуты

    get attrs() {
        return this.$attrs;
    }

    // End Геттер возвращающий все используемые плагином атрибуты

    // Смена таба

    /*

        Публичный метод
        - - - - -
        Смена активного состояния таба.
        Может принимать название таба, на который нужно переключить.
        Плагин передает системный элемент с табом.

        Использует методы: __getTabInfo, __changeState

    */

    changeTab(tab) {

        let $module = this;
        let $elems = this.$info.elems;
        let $elemsClasses = this.$info.elemsClasses;
        let $params = this.$info.params;
        let activeClass = $params.stateClasses.active.tab;
        let openClass = $params.stateClasses.open.content;

        if (checkType(tab, "object")) {

            let info = this.__getTabInfo(tab);

            if (!info) {
                return false;
            }

            this.__changeState(info.tabs.current, info.tabs.all, activeClass);
            this.__changeState(info.contents.current, info.contents.all, openClass);

        } else if (checkType(tab, "string")) {

            let $tabs;

            if ($params.dynamic) {
                $tabs = findElemsClass($elemsClasses.tab, document);
            } else {
                $tabs = $elems.tabs;
            }

            if (!$tabs) {
                return false;
            }

            for (let $tab of $tabs) {

                let tabName = attr($tab, attrs.name.tab);

                if (tabName === tab) {

                    let info = $module.__getTabInfo($tab, tabName);

                    if (info) {
                        $module.__changeState(info.tabs.current, info.tabs.all, activeClass);
                        $module.__changeState(info.contents.current, info.contents.all, openClass);
                    }

                }

            }

        }

    }

    // End Смена таба

    // Нахождение информации таба

    /*

        Внутренний метод
        - - - - -
        Нахождение всей информации по табу, на который нужно переключится и всех элементов, которые связаны с ним.
        Принимает два параметра:
            1. tab (object) (обязательный) - элемент с табом
            2. tabName (string) (не обязательный) - имя таба (если передается, то внутри метода выполняется на одно действие меньше)

    */

    __getTabInfo(tab, tabName) {

        if (!checkType(tab, "object")) {
            return false;
        }

        tabName = checkType(tabName, "string") ? tabName : attr(tab, attrs.name.tab);

        let $elemsClasses = this.$info.elemsClasses;
        let container = findCurrentParent(tab, $elemsClasses.container);
        let info = {
            tabs: {
                current: tab,
                all: null
            },
            contents: {
                current: null,
                all: null
            }
        };
        let $iTabs = info.tabs;
        let $iContents = info.contents;

        if (!container || !tabName) {
            return false;
        }

        $iTabs.all = findElemsClass($elemsClasses.tab, container);
        $iContents.all = findElemsClass($elemsClasses.content, container);

        if ($iTabs.all && $iContents.all) {

            for (let content of $iContents.all) {

                let contentName = attr(content, attrs.name.content);

                if (contentName && tabName === contentName) {
                    $iContents.current = content;
                }

            }

        }

        if (!$iTabs.all || !$iTabs.current || !$iContents.all || !$iContents.current) {
            return false;
        }

        return info;

    }

    // End Нахождение информации таба

    // Смена состояния у элементов

    /*

        Внутренний метод
        - - - - -
        Смена состояния у активного элемента и всех похожих элементов.
        К активному элементу добавляется класс состояния, у всех остальных этот класс удаляется.
        Так же если в параметрах была задана задержка, то класс состояния к активному элементу добавится с задержкой.
        Принимает параметры:
            1. elem - активный элемент
            2. allElems - все остальные элементы
            3. stateClass - класс состояния

    */

    __changeState(elem, allElems, stateClass) {

        if (!checkType(elem, "object") || !checkType(allElems, "array") || !checkType(stateClass, "string")) {
            return false;
        }

        let $delay = this.$info.params.delay;

        for (let item of allElems) {
            item.classList.remove(stateClass);
        }

        setTimeout(function() {
            elem.classList.add(stateClass);
        }, $delay);

    }

    // End Смена состояния у элементов

};