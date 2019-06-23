import {checkType} from "./check-type";

/*

    Description
    - - - - - -
    Функция нахождения элементов на странице по классу.
    Если хоть один элемент будет найден, то вернется массив с ним, если нет, то ничего

    Принимает параметры:
        1. elemsClass (string) (обязательный) - класс элементов, по которому будет идти поиск
        2. lookPlace (object) (обязательный) - элемент, в котором будет происходить поиск

*/

export let findElemsClass = (elemsClass, lookPlace) => {

    if (!checkType(elemsClass, "string") || !checkType(lookPlace, "object")) {
        if (DEV) console.error("Invalid variable type ($elemsClass or $lookPlace). Type required $elemsClass = 'string', $lookPlace = 'object'. Type received $elemsClass = '%s', $lookPlace = '%s'.", typeof elemsClass, typeof lookPlace);
        return false;
    }

    let array = lookPlace.getElementsByClassName(elemsClass);

    if (array.length > 0) {
        return Array.prototype.slice.call(array);
    } else {
        return false;
    }

};

/*

    Description
    - - - - - -
    Функция нахождения первого элемента на странице по классу. Реализована для замены использования id.
    Если элемент будет найден, то функция вернет его

    Принимает параметры:
        1. elemClass (string) (обязательный) - класс элемента, по которому будет идти поиск
        2. lookPlace (object) (обязательный) - элемент, в котором будет происходить поиск

*/

export let findFirstClass = (elemClass, lookPlace) => {

    if (!checkType(elemClass, "string") || !checkType(lookPlace, "object")) {
        if (DEV) console.error("Invalid variable type ($elemClass or $lookPlace). Type required $elemClass = 'string', $lookPlace = 'object'. Type received $elemClass = '%s', $lookPlace = '%s'.", typeof elemClass, typeof lookPlace);
        return false;
    }

    let elem = lookPlace.getElementsByClassName(elemClass)[0];

    if (elem) {
        return elem;
    } else {
        return false;
    }

};

/*

    Description
    - - - - - -
    Функция нахождения элементов сразу по нескольким классам.
    Если хоть один элемент будет найден, то функция вернет массив с отдельными массивами для каждого класса элементами

    Принимает параметры:
        1. elemsClasses (array) (обязательный) - массив, с классами элементов
        2. lookPlace (object) (обязательный) - элемент, в котором будет происходить поиск

*/

export let findElemsClasses = (elemsClassesArray, lookPlace) => {

    if (!checkType(elemsClassesArray, "array") || !checkType(lookPlace, "object")) {
        if (DEV) console.error("Invalid variable type ($elemsClassesArray or $lookPlace). Type required $elemsClassesArray = 'array (object)', $lookPlace = 'object'. Type received $elemsClassesArray = '%s', $lookPlace = '%s'.", typeof elemsClassesArray, typeof lookPlace);
        return false;
    }

    let array = [];

    for (let item of elemsClassesArray) {

        if (!checkType(item, "string")) {
            if (DEV) console.error("Array element isn't a string");
            return false;
        }

        let arrayClass = lookPlace.getElementsByClassName(item);

        if (arrayClass.length > 0) {
            array.push(Array.prototype.slice.call(arrayClass));
        }

    }

    if (array.length > 0) {
        return array;
    } else {
        return false;
    }

};

/*

    Description
    - - - - - -
    Функция нахождения элементов на странице по тегу.
    Если хоть один элемент будет найден, то вернется массив с ним, если нет, то ничего

    Принимает параметры:
        1. elemsTag (string) (обязательный) - тег элементов, по которому будет идти поиск
        2. lookPlace (object) (обязательный) - элемент, в котором будет происходить поиск

*/

export let findElemsTag = (elemsTag, lookPlace) => {

    if (!checkType(elemsTag, "string") || !checkType(lookPlace, "object")) {
        if (DEV) console.error("Invalid variable type ($elemsTag or $lookPlace). Type required $elemsTag = 'string', $lookPlace = 'object'. Type received $elemsTag = '%s', $lookPlace = '%s'.", typeof elemsTag, typeof lookPlace);
        return false;
    }

    let array = lookPlace.getElementsByTagName(elemsTag);

    if (array.length > 0) {
        return Array.prototype.slice.call(array);
    } else {
        return false;
    }

};

/*

    Description
    - - - - - -
    Функция нахождения первого элемента на странице по тегу. Реализована для замены использования id.
    Если элемент будет найден, то функция вернет его

    Принимает параметры:
        1. elemTag (string) (обязательный) - тег элемента, по которому будет идти поиск
        2. lookPlace (object) (обязательный) - элемент, в котором будет происходить поиск

*/

export let findFirstTag = (elemTag, lookPlace) => {

    if (!checkType(elemTag, "string") || !checkType(lookPlace, "object")) {
        if (DEV) console.error("Invalid variable type ($elemTag or $lookPlace). Type required $elemTag = 'string', $lookPlace = 'object'. Type received $elemTag = '%s', $lookPlace = '%s'.", typeof elemTag, typeof lookPlace);
        return false;
    }

    let elem = lookPlace.getElementsByTagName(elemTag)[0];

    if (elem) {
        return elem;
    } else {
        return false;
    }

};

/*

    Description
    - - - - - -
    Функция нахождения элементов сразу по нескольким тегам.
    Если хоть один элемент будет найден, то функция вернет массив с отдельными массивами для каждого тега элементами

    Принимает параметры:
        1. elemsTagsArray (array) (обязательный) - массив, с тегами элементов
        2. lookPlace (object) (обязательный) - элемент, в котором будет происходить поиск

*/

export let findElemsTags = (elemsTagsArray, lookPlace) => {

    if (!checkType(elemsTagsArray, "array") || !checkType(lookPlace, "object")) {
        if (DEV) console.error("Invalid variable type ($elemsTagsArray or $lookPlace). Type required $elemsTagsArray = 'array (object)', $lookPlace = 'object'. Type received $elemsTagsArray = '%s', $lookPlace = '%s'.", typeof elemsTagsArray, typeof lookPlace);
        return false;
    }

    let array = [];

    for (let item of elemsTagsArray) {

        if (!checkType(item, "string")) {
            if (DEV) console.error("Array element isn't a string");
            return false;
        }

        let arrayTag = lookPlace.getElementsByTagName(item);

        if (arrayTag.length > 0) {
            array.push(Array.prototype.slice.call(arrayTag));
        }

    }

    if (array.length > 0) {
        return array;
    }

};

