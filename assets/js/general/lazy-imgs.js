/*

    Description
    - - - - - -
    Плагин реализующий отложенную подгрузку изображений различных типов.

    Принимает параметры:
        1. imgs (string) (обязательный) - класс изображений, которые должны подгружаться по мере просмотра страницы пользователем
        2. indent:
            2.1 top (number) (не обязательный) - расстояние в пикселях, до элемента сверху, когда начинать подгрузку изображения. Дефолтное значение 0
            2.2 bottom (number) (не обязательный) - расстояние в пикселях, до элемента снизу, когда начинать подгрузку изображения. Дефолтное значение 0
        3. preloader:
            3.1 active (boolean) (не обязательный) - включает или выключает работу прелоадера. Дефолтное значение false
            3.2 type (string) (не обязательный) - тип подключаемого прелоадера
                Значение type:
                    3.2.1 default - дефолтные настройки прелоудера
                    3.2.2 custom - кастомные классы элементов прелоудера, которые задаются в параметры preloader.blockClass и preloader.indicatorClass
                    3.2.3 element - полностью кастомный элемент прелоудера, которые передается в параметр preloader.el
            3.3 el (object) (не обязательный) - кастомный элемент прелоудера, не будет работать если не включен preloader.type = "element"
            3.4 blockClass (string) (не обязательный) - кастомный класс блока прелоудера, не будет работать если не включен preloader.type = "custom"
            3.5 indicatorClass (string) (не обязательный) - кастомный класс индикатора прелоудера, не будет работать если не включен preloader.type = "custom"

    Пример объекта с параметрами:
        {
            imgs: "js-lazy-img",
            indent: {
                top: 60,
                bottom: 60
            },
            preloader: {
                active: true,
                type: "default"
            }
        }

    Используемые атрибуты:
        1. data-style-img - адрес изображения, которое вставится через стили css в background-images
        2. data-img - адрес изображения, которое вставится стандартным способом через тег img
        3. data-alt - описание для изображения, которое будет добавлено тегу img, в атрибут alt
        4. data-picture - при наличии включает поддержку тега picturу, добавляет его и дает возможность задать
        5. data-picture-rules - задает правила source для тега picture, не будет работать если нет data-picture
            Пример значения атрибута data-picture-rules: "media=(max-width: 1024px) ? srcset=/img/img1.jpg, /img/img1.jpg 2x; media=(max-width: 640px) ? srcset=/img/img2.jpg, /img/img2.jpg 2x"
            где через ";" указываются отдельные правила для тегов source
            через " ? " задаются параметры со значениями указанными через знак "="

    Публичные методы:
        1. attrs (getter) - возвращает объект с названиями используемых плагином атрибутов
        2. imgsInfo (getter) - возвращает объект со всей информацией по всем изображениям плагина
        3. findImgs - нахождение всех изображений, вызывается обычно после динамического добавления изображения (при помощи ajax)
  
    // Note
        1. Чтобы изображения работали при отключенном js, нужно использовать тег noscript и в него класть уже верстку, которая будет отображаться при отключенном js.
        2. Все изображения загружаются один раз
        3. При испоьзовании метода findImgs, все изображения будут подгружатсья по-новому, но те которые уже были загружены, будут браться из кэша.
        4. Если указан прелоадер, то для всех изображений перед загрузкой он будет добавлен и исчезнет только после загрузки изображения.

*/

import {checkType} from "./check-type";
import {findElemsClass} from "./find";
import {loader} from "./loader";
import {applyClasses} from "./apply-classes";
import {windowScroll} from "./window-scroll";
import {getXmlHttp} from "./ajax";
import {attr} from "./attr";

// Объект с используемыми плагином атрибутами

/*

    1. style.img - адрес изображения для вставки его через стили бэкграундом
    2. img.img - адрес изображения для вставки его через стандартный img
    3. picture.active - наличие у элемента подключает работу тега picture. (Использовать только со стандартным img)
    4. picture.rules - указание правил для внутренних тегов source у picture

*/

const attrs = {
    style: {
        img: "data-style-img"
    },
    img: {
        img: "data-img",
        alt: "data-alt"
    },
    picture: {
        active: "data-picture",
        rules: "data-picture-rules"
    }
};

// End Объект с используемыми плагином атрибутами

// Вспомогательные функции

const helpFuncs = {
    request: {
        load(url) {

            /*

                Создание запроса для загрузки изображения в промисе,
                что позволяет повесить отложенные обработчики на успешный и ошибочный ответ сервера.
                В функцию передается адрес изображения.

            */

            if (!checkType(url, "string")) {
                return false;
            }

            return new Promise(function(resolve, reject) {

                let request = getXmlHttp();

                request.open("GET", url);
                request.onload = function() {

                    if (request.status == 200) {
                        resolve();
                    } else {
                        reject();
                    }

                };
                request.onerror = function() {
                    reject();
                };
                request.send(null);

            });

        }
    },
    create: {
        preloader(module) {

            /*

                Создание элемента с прелоудером при помощи сторонней функции loader.create

            */

            if (!checkType(module, "object")) {
                return false;
            }

            let $preloader = module.$info.options.preloader;

            if (!$preloader.active || $preloader.type == "element") {
                return false;
            }

            let params;

            if ($preloader.type == "custom") {
                params = {
                    blockClasses: [$preloader.classes.block],
                    indicatorClasses: [$preloader.classes.indicator]
                };
            }

            $preloader.el = loader.creare("local", params);

        },
        sourses(img, info) {

            /*

                Создает ресурсы для тега picture а основе полученных данных.
                Так же после их создания, добавляет эти ресурсы в тег picture.

            */

            if (!checkType(img, "object") || !checkType(info, "object")) {
                return false;
            }

            let rules = attr(img, attrs.picture.rules);

            if (!rules) {
                return false;
            }

            rules = rules.split("; ");

            if (!checkType(rules, "array")) {
                return false;
            }

            for (let i in rules) {

                let params = rules[i].split(" ? ");
                let sourse = info.sourses[i];

                sourse = {el: document.createElement("source")};

                for (let param of params) {

                    let parts = param.split("=");

                    attr(sourse.el, parts[0], parts[1]);

                }

                info.el.appendChild(sourse.el);

            }

        },
        newImg(params) {

            /*

                Создание элемента с изображением и запись этого элемента для дальнейшего использования.
                На место куда будет подгружено изображение ставится прелоадер.

            */

            let preloader = params.preloader;
            let img = params.img;
            let type = params.type;
            let info = params.info;

            if (!checkType(preloader, "object") || !checkType(img, "object") || !checkType(type, "string") || !checkType(info, "object")) {
                return false;
            }

            helpFuncs.add.preloader(img, type, preloader);
            info.el = document.createElement(info.tag);
            applyClasses(info.el, info.classes, "add");

        }
    },
    set: {
        classes(elem, classesArray, jsClass) {

            /*

                Сбор и запись в массив всех классов элемента, кроме класса подключения плагина.

            */

            if (!checkType(elem, "object") || !checkType(classesArray, "array") || !checkType(jsClass, "string")) {
                return false;
            }

            for (let $class of elem.classList) {
                if ($class != jsClass) {
                    classesArray.push($class);
                }
            }

        }
    },
    add: {
        preloader(img, type, preloader) {

            /*

                Добавление прелоадера к элементу в зависимости от его типа.

            */

            if (!checkType(img, "object") || !checkType(type, "string") || !checkType(preloader, "object")) {
                return false;
            }

            if (type == "style") {
                img.appendChild(preloader.cloneNode(true));
            } else if (type == "img") {
                img.parentNode.appendChild(preloader.cloneNode(true));
            }

        },
        newImg(info) {

            /*

                Добавление нового элемента с изображением, и проставление у него всех атрибутов.
                Так же добавление в него тега picture если это стандартный img и добавление тега picture включено.

            */

            if (!checkType(info, "object")) {
                return false;
            }

            let parent = info.block.parentNode;
            let img = info.img;
            let picture = info.info.picture;

            if (img.type == "style") {
                img.el.style.backgroundImage = "url(" + img.url + ")"
            } else if (img.type == "img") {
                attr(img.el, "src", img.url);
                attr(img.el, "alt", info.info.alt);
            }

            if (picture.active) {
                picture.el.appendChild(img.el);
                parent.replaceChild(picture.el, info.block);
            } else {
                parent.replaceChild(img.el, info.block);
            }

        }
    },
    scroll(module) {

        /*

            Отслеживание скролла пользователя и сравнение его с позицией подгружаемых изображений.
            Когда изображение появляется в поле видимости или в области отступов, вызывается метод его подгрузки.

        */

        if (!checkType(module, "object")) {
            return false;
        }

        let $imgs = module.$info.imgs;
        let $params = module.$info.params;
        let $indent = $params.indent;

        if (!$imgs.elems) {
            return false;
        }

        $params.windowHeight = window.innerHeight;

        for (let i in $imgs.info) {

            let $imgInfo = $imgs.info[i];
            let $sizes = $imgInfo.params.system.sizes;

            $sizes.top = $imgInfo.block.getBoundingClientRect().top;
            $sizes.height = $imgInfo.block.offsetHeight;

            if (!$imgInfo.params.system.load && ($sizes.top - $params.windowHeight - $indent.top <= 0) && ($sizes.top + $sizes.height + $indent.bottom >= 0)) {
                module.__loadImg($imgInfo);
            }

        }

    }
};

// End Вспомогательные функции

export let LazyImgs = class {

    constructor(params) {

        if (checkType(params.imgs, "string")) {

            let $module = this;

            // Сокращения для параметров

            let $pIndent = params.indent;
            let $pPreloader = params.preloader;

            // End Сокращения для параметров

            // Объект со всеми параметрами плагина

            /*

                1. imgs - вся информация по изображениям, класс подключения плагина, массив со всеми эллементами и информация по каждому изображению
                2. params - изменяемые параметры плагина, так же в себя включают настройки прелоадера

            */

            this.$info = {
                imgs: {
                    class: params.imgs,
                    elems: findElemsClass(params.imgs, document),
                    info: {}
                },
                params: {
                    windowHeight: null,
                    indent: {
                        top: ($pIndent && checkType($pIndent.top, "number")) ? $pIndent.top : 0,
                        bottom: ($pIndent && checkType($pIndent.bottom, "number")) ? $pIndent.bottom : 0
                    },
                    preloader: {
                        active: ($pPreloader && checkType($pPreloader.active, "boolean")) ? true : false,
                        type: ($pPreloader && checkType($pPreloader.type, "string")) ? $pPreloader.type : null,
                        el: ($pPreloader && $pPreloader.type == "element" && checkType($pPreloader.el, "object")) ? $pPreloader.el : null,
                        classes: {
                            block: ($pPreloader && $pPreloader.type == "custom" && checkType($pPreloader.blockClass, "string")) ? $pPreloader.blockClass : null,
                            indicator: ($pPreloader && $pPreloader.type == "custom" && checkType($pPreloader.indicatorClass, "string")) ? $pPreloader.indicatorClass : null
                        }
                    }
                }
            };

            // End Объект со всеми параметрами плагина

            // Запись атрибутов в плагин

            this.$attrs = attrs;

            // End Запись атрибутов в плагин

            let applyScroll = function() {
                helpFuncs.scroll($module);
            };

            // Вызов всех методов и функций отвечающих за работу плагина

            helpFuncs.create.preloader(this);
            this.__getInfoImgs();
            applyScroll();
            windowScroll(applyScroll);

            // End Вызов всех методов и функций отвечающих за работу плагина

        }

    }

    // Геттер возвращающий все используемые плагином атрибуты

    get attrs() {
        return this.$attrs;
    }

    // End Геттер возвращающий все используемые плагином атрибуты

    // Геттер возвращающий всю информацию по изображениям

    get imgsInfo() {
        return this.$info.imgs.info;
    }

    // End Геттер возвращающий всю информацию по изображениям

    // Нахождение изображений

    /*

        Публичный метод.
        - - - - -
        Нахождение всех изображений, которые необходимы для работы плагина. Так же этот метод используется
        для поиска новых изображений, подгруженных ajax-ом.

        Использует методы: __getinfoImgs
        Использует вспомогательные функции: scroll

    */

    findImgs() {

        let $imgs = this.$info.imgs;

        $imgs.elems = findElemsClass($imgs.class, document);
        this.__getInfoImgs();
        helpFuncs.scroll(this);

    }

    // End Нахождение изображений

    // Нахождение и запись всей информации по изображениям

    /*

        Внутренний метод
        - - - - -
        Сбор и запись всей информации по изображениям, которая требуется плагину для работы.
        Так же создание новых элементов с изображениями, для дальнейшей вставки их в документ и подгрузки в них изображений.

        Использует вспомогательные функции: create.sourses, set.classes, create.newImg

    */

    __getInfoImgs() {

        let $module = this;
        let $imgs = this.$info.imgs;
        let $imgsInfo = $imgs.info;

        if (!imgs.elems) {
            return false;
        }

        for (let i in $imgs.elems) {

            let $img = $imgs.elems[i];
            let $imgAttrs = {
                styleImg: attr($img, attrs.style.img),
                img: attr($img, attrs.img.img),
                alt: attr($img, attrs.img.alt),
                picture: {
                    active: attr($img, attrs.picture.active)
                }
            };

            $imgsInfo[i] = {
                block: $img,
                img: {
                    el: null,
                    tag: null,
                    url: null,
                    classes: []
                },
                params: {
                    system: {
                        type: null,
                        load: false,
                        sizes: {
                            top: null,
                            height: null
                        }
                    }
                },
                info: {
                    styleImg: ($imgAttrs.styleImg) ? $imgAttrs.styleImg : null,
                    img: ($imgAttrs.img) ? $imgAttrs.img : null,
                    alt: ($imgAttrs.alt) ? $imgAttrs.alt : null,
                    picture: {
                        active: ($imgAttrs.picture.active) ? true : null,
                        el: ($imgAttrs.picture.active) ? document.createElement("picture") : null,
                        sourses: {}
                    }
                }
            };

            let info = $imgsInfo[i];
            let img = info.img;
            let system = info.params.system;
            let imgInfo = info.info;

            if (imgInfo.styleImg) {

                img.tag = "span";
                system.type = "style";

            } else if (imgInfo.img) {

                img.tag = "img";
                system.type = "img";

                if (imgInfo.picture.active) {
                    helpFuncs.create.sourses($img, imgInfo.picture);
                }

            }

            helpFuncs.set.classes($img, img.classes, $imgs.class);
            helpFuncs.create.newImg({
                preloader: $module.params.preloader.el,
                img: $img,
                type: $system.type,
                info: img
            });

        }

    }

    // End Нахождение и запись всей информации по изображениям

    // Подгрузка изображения

    /*

        Внутренний метод
        - - - - -
        Подгрузка изображения, когда оно становится в поле зрения пользователя.
        Так же выставление статуса и его запись для дальнейшего испольования плагином.
        Изображения которые уже были загружены, не будут больше загружатся.

        Принимает параметром информацию по изображению.

        Использует вспомогательные функции: request.load, add.newImg

    */

    __loadImg(info) {

        if (!checkType(info, "object")) {
            return false;
        }

        let url = info.info.styleImg || info.info.img;
        let request = helpFuncs.request.load(url);

        info.img.url = url;

        if (!request) {
            return false;
        }

        info.params.system.load = "loading";
        request.then(
            function() {
                helpFuncs.add.newImg(info);
                params.load = true;
            },
            function() {
                params.load = "error";
            }
        );

    }

    // End Подгрузка изображения

};