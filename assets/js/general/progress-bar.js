import {checkType} from "./check-type";
import {findFirstClass} from "./find";
import {getWindowScroll, windowScroll} from "./window-scroll";

export let ProgressBar = class ProgressBar {

    #data = {
        classes: {
            progress: null,
            observable: null
        },
        elems: {
            progress: null,
            observable: null
        }
    };
    #system = {
        filling: "width",
        observable: {
            top: null,
            bottom: null,
            height: null
        },
        progress: null
    };
    #funcs = [];

    constructor(params) {

        if (!checkType(params, "object")) {
            if (DEV) console.error();
            return {fallInstall: true};
        }

        let elems = this.#data.elems;

        this.#__setData(params);
        this.#__setSystem(params);
        this.findElems();

        if (!checkType(elems.progress, "object") || !checkType(elems.observable, "object")) {
            if (DEV) console.error();
            return {fallInstall: true};
        }

        this.#__scroll();
        windowScroll(() => {
            this.#__scroll();
        });

    };

    #__setData = params => {

        let {progress, observable} = params;
        let classes = this.#data.classes;

        classes.progress = checkType(progress, "string") ? progress : null;
        classes.observable = checkType(observable, "string") ? observable : null;

    };

    #__setSystem = params => {

        let {filling} = params;

        this.#system.filling = checkType(filling, "string") ? filling : "width";

    };

    #__applyFuncs = () => {
        for (let item of this.#funcs) {
            item(this.#system.progress);
        }
    };

    #__scroll = () => {

        let elems = this.#data.elems;
        let system = this.#system;
        let scroll = getWindowScroll();
        let windowHeight = window.innerHeight;
        let observableCoords = elems.observable.getBoundingClientRect();
        let observableData = system.observable;

        observableData.top = observableCoords.top + scroll;
        observableData.bottom = observableCoords.bottom + scroll;
        observableData.height = elems.observable.offsetHeight;

        if (scroll > observableData.top && scroll < observableData.bottom) {

            system.progress = ((scroll - observableData.top) / (observableData.height - windowHeight)) * 100;

            this.#__applyFuncs();

            if (system.progress >= 100) {
                elems.progress.style[system.filling] = "100%";
            } else {
                elems.progress.style[system.filling] = system.progress + "%";
            }

        } else if (scroll < observableData.top) {
            elems.progress.style[system.filling] = "";
        }

    };

    findElems = () => {

        let data = this.#data;

        data.elems.progress = findFirstClass(data.classes.progress, document);
        data.elems.observable = findFirstClass(data.classes.observable, document);

    };

    addFuncs = funcs => {

        if (!funcs) {
            if (DEV) console.error();
            return false;
        }

        if (checkType(funcs, "array")) {

            for (let func of funcs) {

                if (!checkType(func, "function")) continue;
                this.#funcs.push(func);

            }

        } else if (checkType(funcs, "function")) {
            this.#funcs.push(funcs);
        }

    };

};