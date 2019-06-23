/*

    Description
    - - - - - -
    Плагин реализующий функционал валидации как форм, так и отдельных полей,
    так же позволяет собирать данные с формы

    Принимает параметры:
        1. forms (string) (обязательный) - класс форм
        2. inputs (string) (обязательный) - класс инпутов формы
        3. submitBtns (string) (не обязательный) - класс кнопок проверки форм
        4. warnBlocks (string) (не обязательный) - класс элементов под сообщения для предупреждений
        5. dynamic (boolean) (не обязательный) - во включенном состоянии отвечает за работу с динамическими кнопками проверки форм (подгружаемые ajax-ом). Дефолтное значение false
        6. ajax (boolean) (не обязательный) - во включенном состоянии запрещает отправку форм стандартным способом и дает возможность работать с ajax запросами. Дефолтное значение false
        7. dynamicErrors (boolean) (не обязательный) - во включенном состоянии отвечает за динамическую проверка полей ввода и вывода ошибок по ним. Дефолтное значение false
        8. sendTimeout (number) (не обязательный) - время в милисекундах после которого форма будет отправлена стандартным способом после успешной проверки, если параметр ajax выключен. Дефолтное значение 0
        9. clearTimeout (number) (не обязательный) - время в милисекундах после которого форма будет очищена после успешной проверки, если параметр ajax включен. Дефолтное значение 200
        10. defaultSuccessClass (boolean) (не обязательный) - отвечает за дефолтный класс успешной проверки, если включен то элементу будет добавлятся класс "is-success". Дефолтное значение false
        11. defaultErrorClass (boolean) (не обязательный) - отвечает за дефолтный класс ошиьки, если включен то элементу будет добавлятся класс "is-error". Дефолтное значение false
        12. defaultClasses (boolean) (не обязательный) - отвечает за дефолтные классы успешной проверки и ошибки у элемента, активирует сразу два. Дефолтное значение false
        13. successClass (string) (не обязательный) - кастомный класс успешной проверки
        14. errorClass (string) (не обязательный) - кастомный класс ошибки
        15. rules (object) (не обязательный) - объект с текстами сообщений для определенных форм и полей по различным параметрам

    Пример объекта с параметрами:
        {
            forms: "js-form",
            inputs: "js-input",
            submitBtns: "js-submit",
            warnBlocks: "js-warn",
            ajax: true,
            defaultClasses: true,
            dynamicErrors: true,
            clearTimeout: 300,
            rules: {...}
           }

    Описание объекта rules:
        Правила представляют из себя объект с параметрами:
            1. Сначала указываются названия форм для которых будут применяться правила или можно указать все формы сразу параметром global (чтобы правила корректно применялись, важно чтобы global стоял в самом верху).
            2. Потом у форм указываются теги к которым будут применяться правила. (Правила для имен и типов приоритетней чем правила для тегов).
            3. У тегов указываются правила для типов (type) или имен (name). (Правила для имен приоритетней чем для типов).
            4. У имен или тегов задаются возможные значения имен или типов, для которых будут применяться определенные правила.
            5. У заданых значений могут быть заданы параметры:
                5.1 texts c возможными параметрами:
                    5.1.1 success - задает текст успешной проверки
                    5.1.2 error - задает текст ошибки
                    5.1.3 errorReg - задает текст ошибки по регулярному выражению
                    5.1.4 default - задает дефолтный текст
                5.2 regExp с возможными параметрами:
                    5.2.1 pattern - задает регулярное выражение для проверки поля

    Пример объекта rules: {
        global: {
            div: {
                text: {
                    success: "Успешно"
                    error: "Провально"
                }
            },
            input: {
                type: {
                    text: {
                        text: {
                            success: "Гуд",
                            error: "Не заполено",
                            errorReg: "Не корректно заполнено"
                        },
                        regExp: {
                            pattern: "^[^a-zA-Zа-яёА-ЯЁ]{11,}$, i"
                        }
                    }
                }
            }
        },
        form1: {
            input: {
                type: {
                    text: {
                        text: {
                            error: "Ахтунг"
                        }
                    },
                    email: {
                        text: {
                            error: "Двойной ахтунг"
                        }
                    }
                }
            }
        },
        form2: {
            textarea: {
                name: {
                    message: {
                        text: {
                            success: "Усе заполнено"
                        }
                    }
                }
            }
        }
    }


    Используемые атрибуты:
        1. data-no-valid - указывается у полей ввода, которые не нужно проверять на заполненность, но необходимо собрать с них данные
        2. data-clear-form - указывает нужно ли очищать форму после успешной валидации, если включен параметр ajax. Не будет очищать если указано значение "false"
        3. data-min-check - позволяет задать минимальное количество отмеченных чекбоксов для прохождения валидации. Должно указываться у всех чекбоксов с одинаковым именем
        4. data-custom-value - позволяет записывать данные для всех кастомных полей
        5. data-reg-exp - задает регулярное выражение по которому будет проверятся поле
        6. data-form-name - задает название формы. По этому названию кнопки проверки взаимодействут с формами. У кнопоко проверки и форм должно быть одинаковое название в этом атрибуте
        7. data-input-name - задает название поля ввода, не нужно указывать для тех элементов, у которых уже есть атрибут name. Без атрибута name или этого атрибута, данные с поля ввода не будут собираться
        8. data-warn-name - задает название блока с предупреждающим сообщением. Будет выводить сообщения предупреждения для того поля ввода, у которого значение в атрибуте name или data-input-name будет совпадать со значением в этом атрибуте
        9. data-success-text - текст успешной прохождении проверки поля. Значение в атрибуте приоритетнее значения из правил
        10. data-error-text - текст ошибки поля. Значение в атрибуте приоритетнее значения из правил
        11. data-error-regtext - текст ошибки по регулярному выражению поля. Значение в атрибуте приоритетнее значения из правил
        12. data-default-text - текст дефолтного значения поля. Значение в атрибуте приоритетнее значения из правил
        13. data-error-min-text - текст ошибки по минимальному количеству символов поля. Значение в атрибуте приоритетнее значения из правил
        14. data-error-max-text - текст ошибки по миаксимальному количеству символов поля. Значение в атрибуте приоритетнее значения из правил

    Публичные методы:
        1. attrs (getter) - возвращает объект с названиями используемых плагином атрибутов
        2. formsInfo (getter) - возвращает объект со всей информацией по формам плагина
        3. findElems - Нахождение форм, полей ввода, предупреждающих блоков, кнопок проверок форм, треюуемых для работы плагина, как всех сразу так и по отдельности, в зависимотси от переданных параметров
            //
                В метод можно передать тип элементов, которые нужно найти
                Возможные значения:
                    1. forms - поиск всех форм
                    2. inputs - поиск всех инпутов в формах плагина
                    3. warnBlocks - поиск всех предупреждающих блоков в формах плагина
                    4. submitBtns - поиск всех проверяющих кнопок
                    5. all - поиск всех элементов сразу
        4. validate - проверка формы по её имени, в зависимости от переданного мода, может возвращать разные данные
            //
                В метод предается название формы и мод, в котором будет работать метод
                Возможные значения мода:
                    1. validate - мод, в котором форма будет проверена, выведены все ошибки, и вернется объект с параметрами, прошла форма проверку или нет, и её данные
                    2. check - мод, в котором форма просто будет проверена на валидность, без вывода ошибок, вернет true или false в зависимости от валидности формы
                    3. data - мод, в котором форма не будет проверятся, просто собираются все данные с неё и возвращаются в виде объекта
        5. validateInput - проверка отдельного поля ввода в форме по его названию, в зависимости от переданного мода, может возвращать разные данные
            //
                В метод передается имя поля, имя формы, в которой это поле находится и мод, в котором будет работать метод
                Возможные значения мода:
                    1. validate - мод, в котором поле будет проверено, выведены все ошибки, и вернется объект с параметрами, прошло ли поле проверку или нет, и её данные
                    2. check - мод, в котором поле просто будет проверено на валидность, без вывода ошибок, вернет true или false в зависимости от валидности поля
                    3. data - мод, в котором поле не будет проверятся, просто собираются все данные с него и возвращаются в виде объекта
        6. clearForm - метод очистки всех данных и ошибок формы
            //
                В метод передается имя формы, которую нужно очистить
        7. clearInput - метод очистки отдельного поля ввода, очищает все ошибки и статусы состояния поля
            //
                В метода передаются имя поля и имя формы в котором это поле находится
        8. disableForm - Метод деактивации действий с формой по её имени, для того чтобы заблокировать форму, в момент ajax запроса
        9. enableForm - Метод активации действий с формой по её имени, для того чтобы активировать форму после её деактивации
        10. addFuncs - добавление пользовательских функций, которые будут отрабатывать после различных событий (в зависимости от переданных параметров в методе)
            //
                В метод передается объект с параметрами:
                    1. funcs (array или function) (обязательный) - функция или массив с пользовательскими функциями
                    2. event (string) (обязательный) - событие при котором должны вызваться функции
                        Возможные значения:
                            2.1 success - успешная проверка формы
                            2.2 error - ошибочная проверка формы
                            2.3 clear - очистка формы
                    3. type (string) (не обязательный) - момент события после которого должны вызваться функции
                        Возможные значения:
                            3.1 after - после события
                            3.2 before - до события
                    4. formsName (array или string) (не обязательный) - имя формы или массив с именами форм, при событии с которыми должны отрабатывать пользовательские функции
    // Note
        1. У каждой формы должен быть атрибут data-form-name с её названием, так же у кнопок, которые будет её валидировать должен такойже атрибут с таким же названием
        2. Если в данных собраных с формы содержаться картинки, то такие данные отправлять c кодировкой multipart/form-data (объект FormData)
        3. Во время ajax запроса форму желательно деактивировать, чтобы не получилось заспамить эту форму, и после её деактивации нужно незабыть её активитровать обратно

*/

import {checkType} from "./check-type";
import {findFirstClass, findElemsClass} from "./find";
import {attr} from "./attr";
import {applyClasses} from "./apply-classes";
import {applyStyle} from "./apply-style";
import {successClass, errorClass} from "./state-classes";
import {findCurrentParent} from "./find-current-parent";
import {getObjectLength} from "./get-object-length";

// Объект с используемыми плагином атрибутами

/*

    1. noValidate - указывает что этот инпут не нужно проверять
    2. clearForm - если стоит значение "false", то эта форма не будет очищаться после успешной проверки
    3. minCheck - указывает минимальное количество отмеченных чекбоксов для успешной проверки
    4. customValue - атрибут для нестандартных инпутов с которых нужно собрать данные и проверить их
    5. regExp - раздел с регулярками
        5.1 pattern - задает паттерн регулярки по которой будет проверятся значение поля
     6. name - раздел с именами
        6.1 form - указывает имя формы
        6.2 input - указывает кастомное имя инпута
        6.3 warn - указывает имя предупреждающего блока
    7. texts - раздел с текстами
        7.1 success - текст успешной проверки
        7.2 error - текст ошибки
        7.3 errorReg - текст ошибки если не прошло значение по регулярке
        7.4 default - дефолтный текст поля
        7.5 errorMin - текст ошибки по минимальному количеству символов
        7.6 errorMax - текст ошибки по максимальному количеству символов
    8. value - раздел с данными полей
        8.1 min - указывает какое минимальное количество символов должно быть в поле
        8.2 max - указывает какое максимальное количество символов должно быть в поле

*/

const attrs = {
    noValidate: "data-no-valid",
    clearForm: "data-clear-form",
    minCheck: "data-min-check",
    customValue: "data-custom-value",
    regExp: {
        pattern: "data-reg-exp"
    },
    name: {
        form: "data-form-name",
        input: "data-input-name",
        warn: "data-warn-name"
    },
    texts: {
        success: "data-success-text",
        error: "data-error-text",
        errorReg: "data-error-regtext",
        default: "data-default-text",
        errorMin: "data-error-min-text",
        errorMax: "data-error-max-text"
    },
    value: {
        min: "data-min-value",
        max: "data-max-value"
    }
};

// End Объект с используемыми плагином атрибутами

// Вспомогательные функции

const helpFuncs = {
    get: {
        currentElem(inputInfo, formInfo) {

            /*

                Выбор элемента под сообщение о статусе поля из предупреждающего блока и поля ввода с одинаковыми именами.

            */

            if (!checkType(inputInfo, "object") || !checkType(formInfo, "object")) {
                return false;
            }

            let currentElem = inputInfo.el;
            let name = inputInfo.params.name;
            let warnBlocks = formInfo.elems.warnBlocks;

            if (warnBlocks) {

                for (let warnBlock of warnBlocks) {
                    if (attr(warnBlock, attrs.name.warn) === name) {
                        currentElem = warnBlock;
                    }
                }

            }

            return currentElem;

        },
        formInfo(formName, formsInfo) {

            /*

                Нахождение информации формы по её названию

            */

            if (!checkType(formName, "string") || !checkType(formsInfo, "array")) {
                return false;
            }

            for (let formInfo of formsInfo) {
                if (formInfo.params.name === formName) {
                    return formInfo;
                }
            }

        },
        inputInfo(inputName, formInfo) {

            /*

                Нахождение информации поля ввода по его имени

            */

            if (!checkType(inputName, "string") || !checkType(formInfo, "object")) {
                return false;
            }

            for (let input of formInfo.elems.inputs) {
                if (input.params.name === inputName) {
                    return input;
                }
            }

        },
        inputName(input) {

            /*

                Нахождение имени инпута

            */

            if (!checkType(input, "object")) {
                return false;
            }

            let name = attr(input, "name") || attr(input, attrs.name.input);

            return (name) ? name : null;

        },
        textPlace(inputParams) {

            /*

                Нахождение места под сообщения у инпута в зависимости от его типа

            */

            if (!checkType(inputParams, "object")) {
                return false;
            }

            switch (inputParams.tag) {
                case "input":

                    let type = inputParams.type;

                    if (type === "text" || type === "email" || type === "tel" || type === "number" || type === "password" || type === "hidden" || type === "search" || type === "url" || type === "date") {
                        return "value";
                    }

                    break;
                case "textarea":
                    return "value";
                case "select":
                    break;
                case "default":
                    return "innerText";
            }

        },
        formsName(name) {

            /*

                Проверяет переданное значение, на то чтобы оно было строковым,
                если передан массив, то перебирает его и проверят все значение внутри.
                Проверенные занчения добавляет в массив и если он не пустой, то возвращает его с записанными значениями.

            */

            if (name) {

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

        },
        currentInputForm(module, input, form) {

            /*

                Нахождение требуемой информации по полю ввода и форме на основе полученных данных.
                Если переданы названия поля ввода и формы, то находит нужную информацию и возвращает её.
                Если передана уже с самого начала нужная информация, то просто возвращает её обратно

            */

            if (!checkType(module, "object") || !input || !form) {
                return false;
            }

            let data;

            if (typeof input === "string" && typeof form === "string") {

                let currentForm = helpFuncs.get.formInfo(form, module.$info.formsInfo);

                if (checkType(currentForm, "object")) {
                    data = {
                        currentForm: currentForm,
                        currentInput: helpFuncs.get.inputInfo(input, currentForm)
                    };
                }

            } else if (typeof input === "object" && typeof form === "object") {
                data = {
                    currentInput: input,
                    currentForm: form
                };
            }

            return data;

        }
    },
    set: {
        stateClasses(params, classes) {

            /*

                Установка классов состояний в зависимости от переданных параметров в плагин.
                Сначала идет проверка на отдельные дефолтные классы успеха и ошибки,
                потом на параметр отвечающий за общее подключение дефолтных классов.
                И в последнюю очередь идет проверка на кастомные классы

            */

            if (!checkType(params, "object") || !checkType(classes, "object")) {
                return false;
            }

            let checkDefaultClasses = checkType(params.defaultClasses, "boolean");

            classes.success = checkType(params.defaultSuccessClass, "boolean") ? successClass : null;
            classes.error = checkType(params.defaultErrorClass, "boolean") ? errorClass : null;
            classes.success = checkDefaultClasses ? successClass : classes.success;
            classes.error = checkDefaultClasses ? errorClass : classes.error;
            classes.success = checkType(params.successClass, "string") ? params.successClass : classes.success;
            classes.error = checkType(params.errorClass, "string") ? params.errorClass : classes.error;

        },
        inputParams(inputInfo) {

            /*

                Запись информации по полю ввода в плгин.
                Записывается элемент, его тег, тип поля и его значение

            */

            if (!checkType(inputInfo, "object")) {
                return false;
            }

            let input = inputInfo.el;
            let params = inputInfo.params;

            params.tag = input.tagName.toLowerCase();

            switch (params.tag) {
                case "input":

                    let type;

                    params.type = attr(input, "type");
                    type = params.type;

                    if (type === "text" || type === "email" || type === "tel" || type === "number" || type === "password" || type === "hidden" || type === "range" || type === "search" || type === "url" || type === "date") {
                        params.value = input.value;
                    } else if (type === "file") {

                        let files = input.files

                        if (files.length > 0) {

                            if (attr(input, "multiple")) {

                                params.value = {};

                                for (let i in files) {
                                    params.value[i] = files[i];
                                }

                            } else {
                                params.value = files[0];
                            }

                        }

                    }

                    break;
                case "textarea":
                    params.type = "textarea";
                    params.value = input.value;
                    break;
                case "select":
                    params.type = "select";
                    params.value = input.value;
                    break;
                default:
                    params.type = "custom";
                    params.value = input.getAttribute(attrs.customValue);
                    break;
            }

        },
        inputTexts(params) {

            /*

                Нахождение и запись всех текстов ошибок или успеха из правил или дата атрибутов поля ввода.
                Так же находит и записывает реглярное выражения для проверки по нему поля

            */

            let inputInfo = params.inputInfo;
            let formName = params.formName;
            let param = params.param;
            let $module = params.module;

            if (!checkType(inputInfo, "object") || !checkType(formName, "string") || !checkType(param, "string") || !checkType($module, "object")) {
                return false;
            }

            let setParam = inputInfo[param];
            let $rules = $module.$info.rules;
            let inputName = inputInfo.params.name;
            let inputTag = inputInfo.params.tag;

            if (!setParam) {
                return false;
            }

            for (let i in setParam) {

                let attrParam = attr(inputInfo.el, attrs[param][i]);

                if (attrParam) {
                    setParam[i] = attrParam;
                } else if ($rules) {

                    for (let j in $rules) {

                        let tagRules = $rules[j][inputTag];

                        if ((j === formName || j === "global") && tagRules) {

                            let nameRules = tagRules.name;
                            let typeRules = tagRules.type;
                            let set = function(type) {

                                if (checkType(type, "object") && type[inputName] && type[inputName][param]) {

                                    let value = type[inputName][param][i];

                                    setParam[i] = (value) ? value : null;

                                }

                            };

                            if (nameRules && typeRules) {
                                set(nameRules);
                                set(typeRules);
                            } else if (nameRules && !typeRules) {
                                set(nameRules);
                            } else if (!nameRules && typeRules) {
                                set(typeRules);
                            } else if (!nameRules && !typeRules) {

                                if (tagRules[param]) {

                                    let value = tagRules[param][i];

                                    setParam[i] = (value) ? value : null;

                                }

                            }

                        }

                    }

                }

            }

        }
    },
    event: {
        elems(params) {

            /*

                Шаблон событий, для работы с элементами плагина

            */

            if (!checkType(params, "object")) {
                return false;
            }

            let module = params.module;
            let elemClass = params.elemClass;
            let elems = params.elems;
            let event = params.event;
            let func = params.func;

            if (!checkType(module, "object") || !checkType(elemClass, "string") || !checkType(elems, "object") || !checkType(event, "string") || !checkType(func, "function")) {
                return false;
            }

            if (elemClass && module.$info.params.dynamic) {

                document.addEventListener(event, function(e) {

                    let elem = e.target;

                    if (elem.classList.contains(elemClass)) {
                        func(elem, e);
                    } else {

                        let parent = findCurrentParent(elem, elemClass);

                        if (parent) {
                            func(parent, e);
                        }

                    }

                }, true);

            } else if (elems) {

                for (let elem of elems) {
                    elem.addEventListener(event, function(e) {
                        func(elem, e);
                    });
                }

            }

        },
        submitBtn(module) {

            /*

                Событие клика по кнопке проверки формы, вызывает метод который валидирует форму

            */

            if (!checkType(module, "object")) {
                return false;
            }

            helpFuncs.event.elems({
                module,
                elemClass: module.$info.elemsClasses.submitBtns,
                elems: module.$info.elems.btns,
                event: "click",
                func: function(btn, e) {

                    if (checkType(btn, "object") && checkType(e, "object")) {

                        let formName = attr(btn, attrs.name.form);

                        if (formName) {
                            module.validate(formName, "validate", e);
                        }

                    }

                }
            });

        },
        focusInput(module) {

            /*

                Событие фокуса на поле ввода, сбрасывает данные в поле если они ошибочны,
                если правила заполнены корректно или еще не проходили проверку, то сброса не будет

            */

            if (!checkType(module, "object")) {
                return false;
            }

            helpFuncs.event.elems({
                module,
                elemClass: module.$info.elemsClasses.inputs,
                elems: module.$info.elems.inputs,
                event: "focus",
                func: function(input) {
                    if (checkType(input, "object")) {

                        let inputName = helpFuncs.get.inputName(input);
                        let formName = attr(findCurrentParent(input, module.$info.elemsClasses.forms), attrs.name.form);

                        if (checkType(inputName, "string") && checkType(formName, "string")) {
                            module.clearInput(inputName, formName, true);
                        }

                    }
                }
            });

        },
        keyupInput(module) {

            /*

                Событие нажатия на клавишу при наборе в поле ввода.
                Работает только с вулюченным параметром динамической проверки полей.
                Проверяет поле на валидность во время того как пользователь заполняет его.
                Если в поле было записано сообщение об ошибке, то при вводе оно стирается.

            */

            if (!checkType(module, "object") || !module.$info.params.dynamicErrors) {
                return false;
            }

            helpFuncs.event.elems({
                module,
                elemClass: module.$info.elemsClasses.inputs,
                elems: module.$info.elems.inputs,
                event: "keyup",
                func: function(input, e) {
                    if (checkType(input, "object") && checkType(e, "object")) {

                        let inputName = helpFuncs.get.inputName(input);
                        let formName = attr(findCurrentParent(input, module.$info.elemsClasses.forms), attrs.name.form);

                        if (checkType(inputName, "string") && checkType(formName, "string")) {

                            if (e.keycode !== 8 && input.value) {
                                module.validateInput(inputName, formName, "validate", true);
                            } else {
                                module.clearInput(inputName, formName, true);
                            }

                        }

                    }
                }
            });

        }
    },
    find: {
        formElems(formsInfo, elemsClasses, type) {

            /*

                Нахождение элементов плагина по классу и добавление требуемых элементов вместе с информацией по ним в плагин

            */

            if (!checkType(formsInfo, "array") || !checkType(elemsClasses, "object") || !checkType(type, "string")) {
                return false;
            }

            for (let formInfo of formsInfo) {

                let elems = findElemsClass(elemsClasses[type], formInfo.el);

                if (type === "inputs" && elems) {

                    for (let elem of elems) {

                        let min = attr(elem, attrs.value.min);
                        let max = attr(elem, attrs.value.max);

                        formInfo.elems[type].push({
                            el: elem,
                            params: {
                                name: helpFuncs.get.inputName(elem),
                                type: null,
                                tag: null,
                                value: null,
                                lastValue: null,
                                validate: (attr(elem, attrs.noValidate)) ? false : true,
                                min: (min) ? Math.abs(parseInt(min)) : null,
                                max: (max) ? Math.abs(parseInt(max)) : null
                            },
                            texts: {
                                success: null,
                                error: null,
                                errorReg: null,
                                default: null,
                                errorMin: null,
                                errorMax: null
                            },
                            regExp: {
                                pattern: null
                            },
                            errors: {}
                        });

                    }

                } else if (type === "warnBlocks") {
                    formInfo.elems[type] = (elems) ? elems : null;
                }

            }

        }
    },
    check: {
        mode(mode) {

            /*

                Проверка мода в котором работает метод

            */

            return checkType(mode, "string") && (mode === "validate" || mode === "check" || mode === "data");

        }
    },
    clear: {
        errors(formInfo) {

            /*

                Очистка ошибок в форме и всех её инпутов

            */

            if (!checkType(formInfo, "object")) {
                return false;
            }

            formInfo.params.errors = [];

            for (let input of formInfo.elems.inputs) {
                input.errors = {};
            }

        }
    }
};

// End Вспомогательные функции

export let ValidationOld = class {

    constructor(params) {

        if (checkType(params.forms, "string") && checkType(params.inputs, "string")) {

            let $module = this;

            // Нахождение необходимых элементов

            let forms = findElemsClass(params.forms, document);
            let inputs = findElemsClass(params.inputs, document);

            // End Нахождение необходимых элементов

            // Объект со всеми параметрами плагина

            /*

                1. elemsClasses - все классы элементов плагина
                2. elements - все эллементы плагина
                3. formsInfo - информация по формам плагина
                4. params - изменяемые параметры плагина
                5. rules - правила вывода сообщений и установок регулярок для полей ввода
                6. funcs - массивы пользовательских функций, исполняющиеся в зависимости от условий

            */

            this.$info = {
                elemsClasses: {
                    forms: params.forms,
                    inputs: params.inputs,
                    submitBtns: checkType(params.submitBtns, "string") ? params.submitBtns : null,
                    warnBlocks: checkType(params.warnBlocks, "string") ? params.warnBlocks : null
                },
                elems: {
                    forms: (forms) ? forms : null,
                    inputs: (inputs) ? inputs : null,
                    btns: null
                },
                formsInfo: [],
                params: {
                    dynamic: checkType(params.dynamic, "boolean") ? true : false,
                    ajax: checkType(params.ajax, "boolean") ? true : false,
                    dynamicErrors: checkType(params.dynamicErrors, "boolean") ? true : false,
                    classes: {
                        success: null,
                        error: null,
                    },
                    timeouts: {
                        send: (checkType(params.sendTimeout, "number")) ? Math.abs(params.sendTimeout) : 0,
                        clear: (checkType(params.clearTimeout, "number")) ? Math.abs(params.clearTimeout) : 200
                    }
                },
                rules: checkType(params.rules, "object") ? params.rules : null,
                funcs: {
                    success: [],
                    error: [],
                    clear: {
                        after: [],
                        before: []
                    }
                }
            };

            // End Объект со всеми параметрами плагина

            // Запись атрибутов в плагин

            this.$attrs = attrs;

            // End Запись атрибутов в плагин

            // Исрользуемые плагином цвета

            this.$colors = {
                green: "#257400",
                lightGreen: "rgba(37,116,0,0.3)",
                red: "#ef0505",
                lightRed: "rgba(239,5,5,0.3)"
            };

            // End Исрользуемые плагином цвета

            // Используемые плагином стили

            this.$styles = {
                success: {
                    color: $module.$colors.green,
                    backgroundColor: $module.$colors.lightGreen,
                    border: "1px solid " + $module.$colors.green
                },
                error: {
                    color: $module.$colors.red,
                    backgroundColor: $module.$colors.lightRed,
                    border: "1px solid " + $module.$colors.red
                }
            };

            // End Используемые плагином стили

            // Вызов всех методов и функций отвечающих за работу плагина

            helpFuncs.set.stateClasses(params, $module.$info.params.classes);
            this.findElems("all");
            helpFuncs.event.submitBtn(this);
            helpFuncs.event.focusInput(this);
            helpFuncs.event.keyupInput(this);

            // End Вызов всех методов и функций отвечающих за работу плагина

        }

    }

    // Геттер возвращающий все используемые плагином атрибуты

    get attrs() {
        return this.$attrs;
    }

    // End Геттер возвращающий все используемые плагином атрибуты

    // Геттер возвращающий всю информацию по формам

    get formsInfo() {
        return this.$info.formsInfo;
    }

    // Геттер возвращающий всю информацию по формам

    // Нахождение элементов

    /*

        Публичный метод.
        - - - - -
        Нахождение всех элементов, или каких-то определенных, которые необходимы для работы плагина. Так же этот метод используется
        для поиска новых элементов, подгруженных ajax-ом.

        При нахождении формы, собирает с неё информацию и запиcывает в специалный объект, где хранится вся информация по формам

        Использует вспомогательные функции: find.formElems

    */

    findElems(type) {

        if (!checkType(type, "string")) {
            return false;
        }

        let $info = this.$info;
        let $elems = $info.elems;
        let $elemsClasses = $info.elemsClasses;
        let $attrs = this.$attrs;

        if (type === "forms") {

            $elems.forms = findElemsClass($elemsClasses.forms, document);
            $info.formsInfo = [];

            if ($elems.forms) {
                for (let $form of $elems.forms) {
                    $info.formsInfo.push({
                        el: $form,
                        params: {
                            events: true,
                            valid: false,
                            errors: [],
                            name: attr($form, $attrs.name.form),
                            clear: (attr($form, $attrs.clearForm) == "false") ? false : true
                        },
                        data: {},
                        elems: {
                            inputs: [],
                            warnBlocks: null
                        }
                    });
                }
            }

        } else if (type === "inputs") {
            $elems.inputs = findElemsClass($elemsClasses.inputs, document);
            helpFuncs.find.formElems($info.formsInfo, $elemsClasses, "inputs");
        } else if (type === "warnBlocks") {

            if ($elemsClasses.warnBlocks) {
                helpFuncs.find.formElems($info.formsInfo, $elemsClasses, "warnBlocks");
            }

        } else if (type === "submitBtns") {

            if ($elemsClasses.submitBtns) {

                let btns = findElemsClass($elemsClasses.submitBtns, document);

                $elems.btns = (btns) ? btns : null;

            }

        } else if (type === "all") {
            this.findElems("forms");
            this.findElems("inputs");
            this.findElems("warnBlocks");
            this.findElems("submitBtns");
        }

    }

    // End Нахождение элементов

    // Проверка формы

    /*

        Публичный метод.
        - - - - -
        Проверка формы, и в зависимости от мода с которым вызывается, возвращает различные данные

        Использует методы: validateInput, clearForm
        Использует вспомогательные функции: check.mode, clear.errors

    */

    validate(formName, mode, e) {

        if (!checkType(formName, "string") || !helpFuncs.check.mode(mode)) {
            return false;
        }

        let $module = this;
        let $params = this.$info.params;
        let $formsInfo = this.$info.formsInfo;

        for (let $formInfo of $formsInfo) {

            if ($formInfo.params.name === formName) {

                if (checkType(e, "object") && !$formInfo.params.valid) {
                    e.preventDefault();
                }

                if (checkType(e, "object") && $params.ajax) {
                    e.preventDefault();
                }

                if ($formInfo.params.events) {

                    helpFuncs.clear.errors($formInfo);

                    for (let $input of $formInfo.elems.inputs) {
                        $module.validateInput($input, $formInfo, mode);
                    }

                    if ($formInfo.params.errors.length === 0) {

                        let $timeouts = $module.$info.params.timeouts;

                        $formInfo.params.valid = true;

                        if (mode === "validate") {
                            this.__applyFuncs("success", null, $formInfo.params.name);
                        }

                        if ($params.ajax) {

                            if ($formInfo.params.clear) {
                                setTimeout(function() {
                                    $module.clearForm($formInfo);
                                }, $timeouts.clear);
                            }

                        } else {

                            setTimeout(function() {
                                $formInfo.el.submit();
                            }, $timeouts.sEnd);

                        }

                    } else {

                        if (mode === "validate") {
                            this.__applyFuncs("error", null, $formInfo.params.name);
                        }

                    }

                    if (mode === "validate") {

                        return {
                            valid: $formInfo.params.valid,
                            data: $formInfo.data
                        };

                    } else if (mode === "check") {
                        return $formInfo.params.valid;
                    } else if (mode === "data") {
                        return $formInfo.data;
                    }

                }

            }

        }

    }

    // End Проверка формы

    // Проверка инпута

    /*

        Публичный метод.
        - - - - -
        Проверка отдельного инпута, и в зависимости от мода с которым вызывается, возвращает различные данные

        Использует методы: __setData, __setErrors
        Использует вспомогательные функции: check.mode, get.currentInputForm, set.inputParams, set.inputTexts

    */

    validateInput(input, form, mode, keyup) {

        if (!input || !form || !helpFuncs.check.mode(mode)) {
            return false;
        }

        let currentInput = helpFuncs.get.currentInputForm(this, input, form).currentInput;
        let currentForm = helpFuncs.get.currentInputForm(this, input, form).currentForm;

        if (!checkType(currentInput, "object") || !checkType(currentForm, "object") || !currentForm.params.events) {
            return false;
        }

        helpFuncs.set.inputParams(currentInput);

        for (let item of ["texts", "regExp"]) {
            helpFuncs.set.inputTexts({
                inputInfo: currentInput,
                formName: currentForm.params.name,
                param: item,
                module: this
            });
        }

        if (mode === "validate" || mode === "data") {
            this.__setData(currentInput, currentForm);
        }

        if (mode !== "data") {
            this.__setErrors(currentInput, currentForm, mode);
        }

        if (keyup) {
            currentInput.errors = {};
        }

        if (typeof input === "string" && typeof form === "string") {

            let valid = (getObjectLength(currentInput.errors)) ? false : true;

            if (mode === "validate") {
                return {valid: valid, data: currentInput};
            } else if (mode === "data") {
                return currentInput;
            } else if (mode === "check") {
                return valid;
            }

        }

    }

    // End Проверка инпута

    // Сбор данных с формы

    /*

        Внутренний метод
        - - - - -
        Сбор данныых со всех инпутов формы, у которых присутствует имя (дефолтное или кастомное), и их запись

    */

    __setData(inputInfo, formInfo) {

        if (!checkType(inputInfo, "object") || !checkType(formInfo, "object")) {
            return false;
        }

        let name = inputInfo.params.name;
        let type = inputInfo.params.type;
        let value = inputInfo.params.value;
        let texts = inputInfo.texts;
        let data = formInfo.data;

        if (type === "checkbox" || type === "radio") {

            let otherInputs = formInfo.elems.inputs;
            let values = (type === "checkbox") ? [] : null;

            for (let otherInput of otherInputs) {

                let otherInputEl = otherInput.el;
                let otherInputName = otherInput.params.name;
                let otherInputType = attr(otherInputEl, "type");
                let otherInputValue = otherInputEl.value;

                if (name === otherInputName && type === otherInputType && otherInputEl.checked) {
                    if (otherInputType === "checkbox") {
                        values.push(otherInputValue);
                    } else if (otherInputType === "radio") {
                        values = otherInputValue;
                    }
                }

            }

            data[name] = values;

        } else {

            if (value === texts.success || value === texts.error || value === texts.errorReg || value === texts.errorMin || value === texts.errorMax) {
                data[name] = "";
            } else {
                data[name] = value;
            }

        }

        // helpFuncs.set.formData(formInfo.params.name, data, this.$info.formsInfo);

    }

    // End Сбор данных с формы

    // Сбор и запись ошибок

    /*

        Внутренний метод
        - - - - -
        Сбор и запись ошибок у инпута в зависимости от различных параметров

        Использует методы: __setState __setText

    */

    __setErrors(inputInfo, formInfo, mode) {

        if (!checkType(inputInfo, "object") || !checkType(formInfo, "object") || !checkType(mode, "string")) {
            return false;
        }

        let input = inputInfo.el;
        let params = inputInfo.params;
        let name = params.name;
        let type = params.type;
        let value = params.value;
        let validate = params.validate;
        let texts  = inputInfo.texts;
        let inputErrors = inputInfo.errors;
        let errors = formInfo.params.errors;
        let setError = function() {

            inputErrors.error = true;
            errors.push({
                el: input
            });

        };

        if (type === "checkbox" || type === "radio") {

            let min = (type === "checkbox") ? attr(input, attrs.minCheck) : null;
            let values = (type === "checkbox") ? [] : null;

            for (let otherInput of formInfo.elems.inputs) {

                let otherInputEl = otherInput.el;
                let otherInputName = otherInput.params.name;
                let otherInputType = attr(otherInputEl, "type");
                let otherInputValue = otherInputEl.value;

                if (name === otherInputName && type === otherInputType && otherInputEl.checked) {

                    if (otherInputType === "checkbox" && validate) {
                        values.push(otherInputValue);
                    } else if (otherInputType === "radio") {
                        values = otherInputValue;
                    }

                }

            }

            if (min) {

                if (values.length < min) {
                    setError();
                } else if (input.checked || validate) {
                    setError();
                }

            } else {

                if (type === "checkbox") {

                    if (values.length > 0 && (input.checked || validate)) {
                        setError();
                    } else if (values.length === 0 && validate) {
                        setError();
                    }

                } else if (type === "radio") {

                    // if (values && (input.checked || validate)) {
                    //     setError();
                    // } else if (!values) {
                    //     setError();
                    // }

                }

            }

        } else {

            if (!value && validate) {
                setError();
            } else if (value && validate) {

                let min = params.min;
                let max = params.max;
                let checkPattern = function() {

                    let pattern = inputInfo.regExp.pattern;

                    if (pattern) {

                        let regRules = pattern.split(", ");
                        let regExp = new RegExp(regRules[0], regRules[1]);

                        if (!regExp.test(value)) {
                            inputErrors.error = true;
                            inputErrors.errorRegExp = true;
                            errors.push({
                                el: input
                            });
                        }

                    }

                };

                if ((min || max) && (value !== texts.success && value !== texts.error && value !== texts.errorReg && value !== texts.errorMin && value !== texts.errorMax)) {

                    let valueLength = value.length;
                    let setTypeError = function(type) {

                        if (checkType(type, "string")) {
                            inputErrors["error" + type] = true;
                            errors.push({
                                el: input
                            });
                        }

                    };

                    if (min && max) {

                        if (valueLength < min) {
                            setTypeError("Min");
                        } else if (valueLength > max) {
                            setTypeError("Max");
                        } else {
                            checkPattern();
                        }

                    } else if (min && !max) {

                        if (valueLength < min) {
                            setTypeError("Min");
                        } else {
                            checkPattern();
                        }

                    } else if (!min && max) {

                        if (valueLength > max) {
                            setTypeError("Max");
                        } else {
                            checkPattern();
                        }

                    }

                } else {

                    if (value === texts.success || value === texts.error || value === texts.errorReg || value === texts.errorMin || value === texts.errorMax) {
                        setError();
                    } else {
                        checkPattern();
                    }

                }

            }

        }

        if (mode === "validate") {
            this.__setState(inputInfo, formInfo);
            this.__setText(inputInfo, formInfo);
        }

    }

    // End Сбор и запись ошибок

    // Установка состояния для инпута

    /*

        Внутренний метод
        - - - - -
        Установка состояния для инпута в зависимости от наличия ошибок

        Использует вспомогательные функции: get.currentElem

    */

    __setState(inputInfo, formInfo, clear) {

        if (!checkType(inputInfo, "object") || !checkType(formInfo, "object")) {
            return false;
        }

        let currentElem = helpFuncs.get.currentElem(inputInfo, formInfo);
        let $classes = this.$info.params.classes;
        let $styles = this.$styles;
        let checkCustomClass = ($classes.success && $classes.error) ? true : false;
        let errors = inputInfo.errors;

        if (errors && !clear) {

            if (errors.error || errors.errorMin || errors.errorMax || errors.errorReg) {

                if (checkCustomClass) {
                    applyClasses(currentElem, [$classes.success], "remove");
                    applyClasses(currentElem, [$classes.error], "add");
                } else {
                    applyStyle(currentElem, $styles.success, "remove");
                    applyStyle(currentElem, $styles.error, "add");
                }

            } else {

                if (checkCustomClass) {
                    applyClasses(currentElem, [$classes.error], "remove");
                    applyClasses(currentElem, [$classes.success], "add");
                } else {
                    applyStyle(currentElem, $styles.error, "remove");
                    applyStyle(currentElem, $styles.success, "add");
                }

            }

        } else if (clear) {

            if (checkCustomClass) {
                applyClasses(currentElem, [$classes.success, $classes.error], "remove");
            } else {
                applyStyle(currentElem, $styles.success, "remove");
                applyStyle(currentElem, $styles.error, "remove");
            }

        }

    }

    // End Установка состояние для инпута

    // Запись текста для инпута

    /*

        Внутренний метод
        - - - - -
        Запись текста для инпута в зависимости от ошибок, и имеющихся текстов для инпута

        Использует вспомогательные функции: get.currentElem, get.textPlace

    */

    __setText(inputInfo, formInfo) {

        if (!checkType(inputInfo, "object") || !checkType(formInfo, "object")) {
            return false;
        }

        let currentElem = helpFuncs.get.currentElem(inputInfo, formInfo);
        let textPlace = (currentElem.classList.contains(this.$info.elemsClasses.warnBlocks)) ? "innerText" : null;
        let errors = inputInfo.errors;
        let texts = inputInfo.texts;

        if (!textPlace) {
            textPlace = helpFuncs.get.textPlace(inputInfo.params);
        }

        if (getObjectLength(errors)) {

            if (errors.errorRegExp) {
                currentElem[textPlace] = texts.errorReg;
            } else {

                for (let i in errors) {
                    if (texts[i]) {
                        currentElem[textPlace] = texts[i];
                    }
                }

            }

        } else if (textPlace === "innerText") {

            if (texts.success) {
                currentElem[textPlace] = texts.success;
            } else {
                currentElem[textPlace] = "";
            }

        }

    }

    // End Запись текста для инпута

    // Очистка формы

    /*

        Публичный метод.
        - - - - -
        Очистка указанной формы, очищает параметры формы связанные с ошибками, данными и прохождением проверки

        Использует методы: clearInput
        Использует вспомогательные функции: get.formInfo

    */

    clearForm(form) {

        if (!form) {
            return false;
        }

        let currentForm;

        if (typeof form === "string") {
            currentForm = helpFuncs.get.formInfo(form, this.$info.formsInfo);
        } else if (typeof form === "object") {
            currentForm = form;
        }

        if (checkType(currentForm, "object") && currentForm.params.events) {

            for (let inputInfo of currentForm.elems.inputs) {
                this.clearInput(inputInfo, currentForm, false, true);
            }

            currentForm.data = {};
            currentForm.params.errors = [];
            currentForm.params.valid = false;

        }

    }

    // End Очистка формы

    // Очистка инпута

    /*

        Публичный метод.
        - - - - -
        Очистка указанного инпута, очищает все его параметры связанные с ошибками и данными в нем
        Если вызывается методом очистки формы, то стирает все значения

        Использует методы: __setState
        Использует вспомогательные функции: get.currentInputForm, get.currentElem, get.textPlace

    */

    clearInput(input, form, totalInput, total = false) {

        if (!input || !form) {
            return false;
        }

        let $module = this;
        let currentInput = helpFuncs.get.currentInputForm(this, input, form).currentInput;
        let currentForm = helpFuncs.get.currentInputForm(this, input, form).currentForm;

        if (!checkType(currentInput, "object") || !checkType(currentForm, "object") || !currentForm.params.events) {
            return false;
        }

        let defaultText = (currentInput.texts.default) ? currentInput.texts.default : "";
        let currentElem = helpFuncs.get.currentElem(currentInput, currentForm);
        let textPlace = (currentElem.classList.contains(this.$info.elemsClasses.warnBlocks)) ? "innerText" : null;
        let texts = currentInput.texts;
        let value = currentInput.el.value;
        let clear = function() {

            $module.__setState(currentInput, currentForm, true);
            currentInput.errors = {};
            currentInput.params.value = null;

            if (textPlace === "innerText") {
                defaultText = "";
            }

            if (totalInput) {
                currentElem[textPlace] = "";
            } else {
                currentElem[textPlace] = defaultText;
            }

        };

        if (!textPlace) {
            textPlace = helpFuncs.get.textPlace(currentInput.params);
        }

        if (total) {
            clear();
        } else if (!currentInput.params.value || (value === texts.error || value === texts.errorReg || value === texts.errorMin || value === texts.errorMax) || !value) {
            clear();
        }

    }

    // End Очистка инпута

    // Деактивирует работу с формой

    /*

        Публичный метод.
        - - - - -
        Запрещает любые взаимодействия с указанной формой

        Использует вспомогательные функции: get.formInfo

    */

    disableForm(formName) {

        if (!checkType(formName, "string")) {
            return false;
        }

        let formInfo = helpFuncs.get.formInfo(formName, this.$info.formsInfo);

        if (checkType(formInfo, "object")) {
            formInfo.params.events = false;
        }

    }

    // End Деактивирует работу с формой

    // Активирует работу с формой

    /*

        Публичный метод.
        - - - - -
        Разрещает взаимодействия с указанной формой

        Использует вспомогательные функции: get.formInfo

    */

    enableForm(formName) {

        if (!checkType(formName, "string")) {
            return false;
        }

        let formInfo = helpFuncs.get.formInfo(formName, this.$info.formsInfo);

        if (checkType(formInfo, "object")) {
            formInfo.params.events = true;
        }

    }

    // End Активирует работу с формой

    // Добавление пользовательских функций

    /*

        Публичный метод.
        - - - - -
        Добавление пользовательских функций для различных событий и типов, в зависимости от переданных параметров.
        Позволяет записывать определенные функции только для определенных попап окон.

        1. funcs - функция, или массив с функциями
        2. event - тип события
        3. type - момент когда исполнять функцию (after или before)
        4. formsName - имя формы для которого предназначена функция или массив имен

        Использует вспомогательный функции: get.formsName

    */

    addFuncs(params) {

        if (!checkType(params, "object")) {
            return false;
        }

        let funcs = params.funcs;
        let event = params.event;
        let type = params.type;
        let formsName = helpFuncs.get.formsName(params.formsName);
        let $checkType = checkType(type, "string");

        if (funcs && checkType(event, "string")) {

            let $funcs = this.$info.funcs;

            if (checkType(funcs, "function")) {

                if (formsName) {
                    $checkType ? $funcs[event][type].push([funcs, formsName]) : $funcs[event].push([funcs, formsName])
                } else {
                    $checkType ? $funcs[event][type].push(funcs) : $funcs[event].push(funcs);
                }

            } else if (checkType(funcs, "array")) {

                for (let func of funcs) {

                    if (checkType(func, "function")) {
                        if (formsName) {
                            $checkType ? $funcs[event][type].push([func, formsName]) : $funcs[event].push([func, formsName]);
                        } else {
                            $checkType ? $funcs[event][type].push(func) : $funcs[event].push(func);
                        }
                    }

                }

            }

        }

    }

    // End Добавление пользовательских функций

    // Исполнение пользовательских функций

    /*

        Внутренний метод
        - - - - -
        Исполнение пользовательских функций для различных событий и типов, в зависимости от переданных параметров.
        Может исполнять определенные функции только для определенных попап окон.

        1. event - тип события
        2. type - момент когда исполнять функцию (after или before)
        3. formName - имя попап окна для которого предназначена функция

    */

    __applyFuncs(event, type, formName) {

        let $funcs = this.$info.funcs;
        let array = type ? $funcs[event][type] : $funcs[event];

        if (!array || array.length === 0) {
            return false;
        }

        for (let item of array) {

            let dataFormInfo = helpFuncs.get.formInfo(formName, this.$info.formsInfo);
            let formInfo = {
                data: dataFormInfo.data,
                el: dataFormInfo.el,
                elems: dataFormInfo.elems,
                params: dataFormInfo.params
            };

            if (item.length === 2) {

                for (let form of item[1]) {

                    if (form === formName) {

                        let func = item[0];

                        func(formInfo);

                    }

                }

            } else {
                item(formInfo);
            }

        }

    }

    // End Исполнение пользовательских функций

};