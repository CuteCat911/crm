/*

    Description
    - - - - - -
    Функция, проверяющая на стороне клиента, с мобильного ли браузера пользователь зашел на сайт.
    Работает не со 100% гарантией. Желательно использовать другие методы определения браузера.
    Если мобильный браузер то вернет true, если нет, то false

*/

export let inspectMobile = () => {

    let browser = navigator.userAgent;
    let mobileBrowsers = ["Android", "iPhone", "iPad", "iPod", "BlackBerry", "Opera Mini", "IEMobile"];

    return mobileBrowsers.some(item => {
        return new RegExp(item).test(browser);
    });

};