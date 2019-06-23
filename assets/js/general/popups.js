import {checkType} from "./check-type";
import {findElemsClass, findElemsClasses, findFirstClass, findFirstTag} from "./find";
import {applyStyle} from "./apply-style";
import {attr} from "./attr";
import {findCurrentParent} from "./find-current-parent";

export let Popups = class Popups {

    // TODO data, system

    #attrs = {
        open: "data-open-popup",
        close: "data-close-popup",
        popup: "data-popup"
    };
    #data = {
        popups: null,
        btns: {
            open: null,
            close: null
        },
        wrapper: null,
        overlay: null,
        lap: null,
        html: findFirstTag("html", document),
        fixed: {
            margin: null,
            padding: null
        }
    };
    #system = {
        classes: {
            elems: {
                popups: null,
                btns: {
                    open: null,
                    close: null
                },
                wrapper: null
            },
            state: {
                open: null,
                close: null
            }
        },
        dynamic: false,
        mode: null,
        indent: {
            top: 0,
            bottom: 0
        },
        overlay: {
            hide: false
        },
        window: {
            width: null,
            height: null
        },
        html: {
            width: null
        },
        clickCoords: {
            x: 0,
            y: 0
        },
        popup: {
            timeout: 300
        },
        timeout: 300,
        widthDiff: null,
        opened: [],
        closed: false
    };
    #funcs = {
        open: {
            after: [],
            before: []
        },
        close: {
            after: [],
            before: []
        },
        scrollTop: {
            after: [],
            before: []
        }
    };
    #styles = {
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
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",
                backgroundColor: "#000000",
                willChange: "opacity",
                overflow: "hidden",
                opacity: 0,
                cursor: "default",
                transition: "opacity 0.3s ease",
                zIndex: 0
            },
            open: {
                opacity: 1
            },
            close: {
                opacity: 0
            }
        },
        lap: {
            default: {
                position: "absolute",
                width: 0,
                height: 0,
                backgroundColor: "#000000",
                borderRadius: "50%",
                willChange: "width, height, transform, opacity",
                transform: "translate(-50%, -50%) scale(0)",
                transition: "width 0.3s ease, height 0.3s ease, opacity 0s 0.3s ease, transform 0.3s ease",
                opacity: 0,
                zIndex: 0
            },
            open: {
                top: null,
                left: null,
                width: null,
                height: null,
                transform: "translate(-50%, -50%) scale(1)",
                transition: "width 0.3s ease, height 0.3s ease, opacity 0s 0s ease, transform 0.3s ease",
                opacity: 1
            },
            close: {
                width: 0,
                height: 0,
                transform: "translate(-50%, -50%) scale(0)",
                transition: "width 0.3s ease, height 0.3s ease, opacity 0s 0.3s ease, transform 0.3s ease",
                opacity: 0
            },
            reOpen: {
                width: null,
                height: null
            }
        },
        popup: {
            default: {
                position: "absolute",
                left: "50%",
                willChange: "opacity",
                transform: "translateX(-50%)",
                transition: "opacity 0.3s ease, z-index 0.3s ease",
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

    constructor(params) {

        if (!checkType(params, "object") || !checkType(params.popups, "string") || !checkType(params.wrapper, "string")) {
            if (DEV) console.error();
            return {fallInstall: true};
        }

        this.#__setData(params);
        this.#__setSystem(params);
        this.#__setStyles(params);
        this.findElems();

        if (!this.#data.wrapper) {
            if (DEV) console.error();
            return {fallInstall: true};
        }

        this.#__init();
        this.#__btnClick("open", this.open);
        this.#__btnClick("close", this.close);
        this.#__overlayClose();

    }

    #__getNumberTransitionTime = time => {

        if (!checkType(time, "string")) {
            if (DEV) console.error();
            return false;
        }

        let strLength = time.length;
        let lastLetter = time[strLength - 1];
        let preLastLetter = time[strLength - 2];

        time = Math.abs(+parseFloat(time));

        if (preLastLetter !== "m" && lastLetter === "s") time *= 1000;

        return time;

    };

    #__setData = params => {

        let {fixed} = params;
        let data = this.#data;

        data.fixed.margin = (fixed && checkType(fixed.margin, "array")) ? findElemsClasses(fixed.margin, document) : null;
        data.fixed.padding = (fixed && checkType(fixed.padding, "array")) ? findElemsClasses(fixed.padding, document) : null;

    };

    #__setSystem = params => {

        let {popups, btns, wrapper, dynamic, mode, openClass, closeClass, indent, popup, overlay} = params;
        let system = this.#system;
        let classes = system.classes;

        classes.elems.popups = popups;
        classes.elems.btns.open = (btns && checkType(btns.open, "string")) ? btns.open : null;
        classes.elems.btns.close = (btns && checkType(btns.close, "string")) ? btns.close: null;
        classes.elems.wrapper = wrapper;
        system.mode = checkType(mode, "string") ? mode : null;
        classes.state.open = checkType(openClass, "string") ? openClass : null;
        classes.state.close = checkType(closeClass, "string") ? closeClass : null;
        system.indent.top = (indent && checkType(indent.top, "number")) ? indent.top : null;
        system.indent.top = (indent && checkType(indent.bottom, "number")) ? indent.bottom : null;
        system.overlay.hide = (overlay && checkType(overlay.hide, "boolean")) ? overlay.hide : false;
        system.dynamic = checkType(dynamic, "boolean") ? dynamic : false;
        system.popup.timeout = (popup && checkType(popup.transitionTime, "string")) ? this.#__getNumberTransitionTime(popup.transitionTime) : 300;
        system.timeout = (overlay && checkType(overlay.transitionTime, "string")) ? this.#__getNumberTransitionTime(overlay.transitionTime) : 300;

    };

    #__setStyles = params => {

        let {overlay, popup} = params;
        let $styles = this.#styles;

        if (overlay) {
            $styles.overlay.default.backgroundColor = (overlay && checkType(overlay.color, "string")) ? overlay.color : "#000000";
            $styles.overlay.default.cursor = overlay && overlay.hide ? "pointer" : "default";
            $styles.overlay.default.transition = (overlay && checkType(overlay.transitionTime, "string")) ? "opacity " + overlay.transitionTime + " ease" : "opacity 0.3s ease";
            $styles.overlay.open.opacity = (overlay && (overlay.opacity >= 0 && overlay.opacity < 1)) ? overlay.opacity : 1;
            $styles.lap.default.backgroundColor = (overlay && checkType(overlay.color, "string")) ? overlay.color : "#000000";
            $styles.lap.default.transition = (overlay && checkType(overlay.transitionTime, "string")) ? "width " + overlay.transitionTime + " ease, height " + overlay.transitionTime + " ease, opacity 0s " + overlay.transitionTime + " ease, transform " + overlay.transitionTime + " ease" : "width 0.3s ease, height 0.3s ease, opacity 0s 0.3s ease, transform 0.3s ease";
            $styles.lap.open.transition = (overlay && checkType(overlay.transitionTime, "string")) ? "width " + overlay.transitionTime + " ease, height " + overlay.transitionTime + " ease, opacity 0s 0s ease, transform " + overlay.transitionTime + " ease" : "width 0.3s ease, height 0.3s ease, opacity 0s 0s ease, transform 0.3s ease";
            $styles.lap.close.transition = (overlay && checkType(overlay.transitionTime, "string")) ? "width " + overlay.transitionTime + " ease, height " + overlay.transitionTime + " ease, opacity 0s " + overlay.transitionTime + " ease, transform " + overlay.transitionTime + " ease" : "width 0.3s ease, height 0.3s ease, opacity 0s 0.3s ease, transform 0.3s ease";
        }

        $styles.popup.default.transition = (popup && checkType(popup.transitionTime, "string")) ? "opacity " + popup.transitionTime + " ease, z-index " + popup.transitionTime + " ease" : "opacity 0.3s ease, z-index 0.3s ease";

    };

    #__findWrapper = () => {

        let wrapper = findFirstClass(this.#system.classes.elems.wrapper, document);
        this.#data.wrapper = wrapper ? wrapper : null;

    };

    #__findPopups = () => {

        let elems = findElemsClass(this.#system.classes.elems.popups, document);
        this.#data.popups = elems ? elems : null;
        this.#__initPopups();

    };

    #__findBtns = (type) => {

        if (!checkType(type, "string")) {
            if (DEV) console.error();
            return false;
        }

        let elems = this.#system.classes.elems.btns[type] ? findElemsClass(this.#system.classes.elems.btns[type], document) : null;
        this.#data.btns[type] = elems ? elems : null;

    };

    #__init = () => {

        let data = this.#data;
        let styles = this.#styles;

        applyStyle(data.wrapper, styles.wrapper.default, "add");

        data.overlay = document.createElement("div");
        applyStyle(data.overlay, styles.overlay.default, "add");

        if (this.#system.mode === "lap") {
            data.lap = document.createElement("div");
            applyStyle(data.lap, styles.lap.default, "add");
            data.overlay.appendChild(data.lap);
            data.overlay.style.backgroundColor = "transparent";
        }

        data.wrapper.appendChild(data.overlay);
        this.#__initPopups();

    };

    #__initPopups = () => {

        let popups = this.#data.popups;

        if (!popups) {
            if (DEV) console.error();
            return false;
        }

        let closeClass = this.#system.classes.state.close;

        for (let popup of popups) {

            if (checkType(closeClass, "string")) {
                popup.classList.add(closeClass);
            } else {
                applyStyle(popup, this.#styles.popup.default, "add");
            }

            popup.style.display = "block";

        }

    };

    #__setClickCoords = coords => {

        if (!checkType(coords, "object")) {
            if (DEV) console.error();
            return false;
        }

        this.#system.clickCoords.y = checkType(coords.y, "number") ? coords.y : null;
        this.#system.clickCoords.x = checkType(coords.x, "number") ? coords.x : null;

    };

    #__setWindowSizes = () => {

        let system = this.#system;

        system.window.width = window.innerWidth;
        system.window.height = window.innerHeight;
        system.html.width = this.#data.html.offsetWidth;
        system.widthDiff = system.window.width - system.html.width;

    };

    #__setCurrentPopupPosition = popup => {

        if (!checkType(popup, "object")) {
            if (DEV) console.error();
            return false;
        }

        let system = this.#system;
        let popupHeight = popup.offsetHeight;

        if (!system.classes.state.open) {

            if (popupHeight >= system.window.height) {
                popup.style.marginBottom = system.indent.bottom + "px";
                popup.style.top = system.indent.top + "px";
            } else {
                popup.style.top = "50%";
                popup.style.transform = "translate(-50%, -50%)";
            }

        }

    };

    #__setLapSize = () => {

        let system = this.#system;
        let lapStyle = this.#styles.lap;
        let windowWidth = system.window.width;
        let windowHeight = system.window.height;
        let setSize = (size) => {

            if (!checkType(size, "number")) {
                if (DEV) console.error();
                return false;
            }

            size += "px";
            lapStyle.open.width = size;
            lapStyle.open.height = size;
            lapStyle.reOpen.width = size;
            lapStyle.reOpen.height = size;

        };

        lapStyle.open.top = system.clickCoords.y + "px";
        lapStyle.open.left = system.clickCoords.x + "px";

        if (windowWidth >= windowHeight) {
            setSize(windowWidth * 4);
        } else {
            setSize(windowHeight * 4);
        }

    };

    #__applyStyleForFixedElems = (type, mode) => {

        if (!checkType(type, "string") || !checkType(mode, "string")) {
            if (DEV) console.error();
            return false;
        }

        let elems = this.#data.fixed;

        this.#styles.fixed[type][type + "Right"] = this.#system.widthDiff + "px";

        if (!elems[type]) {
            if (DEV) console.error();
            return false;
        }

        for (let array of elems[type]) {
            for (let elem of array) {
                applyStyle(elem, this.#styles.fixed[type], mode);
            }
        }

    };

    #__setCurrentZIndex = popup => {

        if (!checkType(popup, "object")) {
            if (DEV) console.error();
            return false;
        }

        let opened = this.#system.opened;
        let openedLength = opened.length;

        if (openedLength === 0) {
            popup.style.zIndex = 2;
        } else {
            popup.style.zIndex = parseInt(getComputedStyle(opened[openedLength - 1]).zIndex) + 2;
        }

    };

    #__closePopup = popup => {

        if (!checkType(popup, "object")) {
            if (DEV) console.error();
            return false;
        }

        let data = this.#data;
        let system = this.#system;
        let styles = this.#styles;
        let openClass = system.classes.state.open;
        let closeClass = system.classes.state.close;

        if (system.opened.length === 1) {

            applyStyle(document.body, styles.body.open, "remove");
            system.closed = true;
            applyStyle(data.overlay, styles.overlay.close, "add");
            this.#__applyStyleForFixedElems("margin","remove");
            this.#__applyStyleForFixedElems("padding","remove");

            if (system.mode === "lap") applyStyle(data.lap, styles.lap.close, "add");

            setTimeout(() => {
                applyStyle(data.wrapper, styles.wrapper.close, "add");
                system.closed = false;
            }, system.timeout);

        }

        if (checkType(openClass, "string") && checkType(closeClass, "string")) {
            popup.classList.remove(openClass);
            popup.classList.add(closeClass);
        } else {
            applyStyle(popup, styles.popup.close, "add");
        }

        setTimeout(() => {
            popup.style.height = 0;
        }, system.popup.timeout);

        system.opened.pop();

    };

    #__scrollToTop = () => {

        let opened = this.#system.opened;
        let openedLength = opened.length;

        if (openedLength === 0) return false;

        let openPopupName = attr(opened[openedLength - 1], this.#attrs.popup);

        this.#__applyFuncs("scrollTop", "before", openPopupName);
        this.#data.wrapper.scrollTop = 0;
        this.#__applyFuncs("scrollTop", "after", openPopupName);

    };

    #__btnClick = (type, func) => {

        if (!checkType(type, "string") || !checkType(func, "function")) {
            if (DEV) console.error();
            return false;
        }

        let btns = this.#data.btns;
        let system = this.#system;
        let classes = system.classes;
        let click = (elem, e) => {

            if (!checkType(elem, "object") || !checkType(e, "object")) {
                if (DEV) console.error();
                return false;
            }

            let popupName = attr(elem, this.#attrs[type]);

            if (!checkType(popupName, "string")) return false;

            let reOpen = attr(elem, this.#attrs.open);

            e.preventDefault();

            if (type === "close") {
                func(popupName, reOpen);
            } else if (type === "open") {

                if (system.mode === "lap") this.#__setClickCoords({y: e.clientY, x: e.clientX});

                func(popupName);

            }

        };

        if (system.dynamic) {

            document.addEventListener("click", (e) => {

                let currentClass = classes.elems.btns[type];

                if (!checkType(currentClass, "string")) return false;

                let elem = e.target;

                if (elem.classList.contains(currentClass)) {
                    click(elem, e);
                } else {
                    let parent = findCurrentParent(elem, currentClass);
                    if (parent) click(parent, e);
                }

            });

        } else if (btns[type]) {
            for (let btn of btns[type]) {
                btn.addEventListener("click", (e) => {
                    click(btn, e);
                });
            }
        }

    };

    #__overlayClose = () => {

        let overlay = this.#data.overlay;

        if (!overlay || !this.#system.overlay.hide) return false;

        overlay.addEventListener("click", () => {
            if (!this.#system.closed) this.close();
        });

    };

    #__applyFuncs = (event, type, popupName) => {

        if (!checkType(event, "string") || !checkType(popupName, "string")) {
            if (DEV) console.error();
            return false;
        }

        let funcs = this.#funcs;
        let array = checkType(type, "string") ? funcs[event][type] : funcs[event];

        if (!array || array.length === 0) return false;

        for (let item of array) {

            if (item.length === 2) {

                for (let popup of item[1]) {

                    if (popup !== popupName) continue;
                    let func = item[0];
                    func();

                }

            } else {
                item();
            }

        }

    };

    get getAttrs() {
        return this.#attrs;
    }

    get getElems() {
        return this.#data.elems;
    }

    findElems = (type) => {

        if (checkType(type, "string")) {

            switch (type) {
                case "wrapper":
                    this.#__findWrapper();
                    break;
                case "popups":
                    this.#__findPopups();
                    break;
                case "btnsOpen":
                    this.#__findBtns("open");
                    break;
                case "btnsClose":
                    this.#__findBtns("close");
                    break;
            }

        } else {

            this.#__findWrapper();
            this.#__findPopups();
            this.#__findBtns("open");
            this.#__findBtns("close");

        }

    };

    open = (popupName, clickCoords = false) => {

        if (!checkType(popupName, "string")) {
            if (DEV) console.error();
            return false;
        }

        let data = this.#data;
        let system = this.#system;
        let styles = this.#styles;
        let openClass = system.classes.state.open;
        let closeClass = system.classes.state.close;

        if (checkType(clickCoords, "object")) this.#__setClickCoords(clickCoords);

        for (let popup of data.popups) {

            let $popupName = attr(popup, this.#attrs.popup);

            if ($popupName !== popupName) continue;

            this.#__applyFuncs("open", "before", popupName);
            popup.style.height = "";
            this.#__setWindowSizes();

            if (system.opened.length === 0) {

                applyStyle(document.body, styles.body.open, "add");
                applyStyle(data.wrapper, styles.wrapper.open, "add");
                applyStyle(data.overlay, styles.overlay.open, "add");
                this.#__applyStyleForFixedElems("margin", "add");
                this.#__applyStyleForFixedElems("padding", "add");

                if (system.mode === "lap") {
                    this.#__setLapSize();
                    applyStyle(data.lap, styles.lap.open, "add");
                }

            }

            this.#__setCurrentPopupPosition(popup);

            if (checkType(openClass, "string") && checkType(closeClass, "string")) {
                popup.classList.remove(closeClass);
                popup.classList.add(openClass);
            } else {
                applyStyle(popup, styles.popup.open, "add");
            }

            this.#__setCurrentZIndex(popup);

            if (system.opened.includes(popup)) system.opened.push(popup);

            setTimeout(() => {
                this.#__applyFuncs("open", "after", popupName);
            }, system.popup.timeout);

        }

    };

    close = (popupName, reOpen) => {

        let data = this.#data;
        let system = this.#system;

        if (checkType(popupName, "string")) {

            for (let popup of data.popups) {

                let $popupName = attr(popup, this.#attrs.popup);

                if (popupName === $popupName && !checkType(reOpen, "string") && system.opened.length !== 0) {

                    this.#__applyFuncs("close", "before", popupName);
                    this.#__closePopup(popup);

                    setTimeout(() => {
                        this.#__applyFuncs("close", "after", popupName);
                    }, system.popup.timeout);

                } else if (checkType(reOpen, "string")) {

                    if (popupName === $popupName) {

                        let openClass = system.classes.state.open;
                        let closeClass = system.classes.state.close;

                        this.#__applyFuncs("close", "before", popupName);

                        if (checkType(openClass, "string") && checkType(closeClass, "string")) {
                            popup.classList.remove(openClass);
                            popup.classList.add(closeClass);
                        } else {
                            applyStyle(popup, this.#styles.popup.close, "add");
                        }

                        setTimeout(() => {
                            this.#__applyFuncs("close", "after", popupName);
                        }, system.popup.timeout);

                        system.opened.pop();

                    } else if (reOpen === $popupName) {

                        this.open($popupName);
                        this.#__scrollToTop();

                    }

                }

            }

        } else {

            let lastOpenPopup = system.opened[system.opened.length - 1];
            let popupName = attr(lastOpenPopup, this.#attrs.popup);

            this.#__applyFuncs("close", "before", popupName);
            this.#__closePopup(lastOpenPopup);

            setTimeout(() => {
                this.#__applyFuncs("close", "after", popupName);
            }, system.popup.timeout);

        }

    };

    addFuncs = params => {

        if (!checkType(params, "object")) {
            if (DEV) console.error();
            return false;
        }

        let {funcs, event, type, popupsName} = params;

        if (!funcs || !checkType(event, "string")) {
            if (DEV) console.error();
            return false;
        }

        let $checkType = checkType(type, "string");
        let $funcs = this.#funcs;

        if (checkType(funcs, "function")) {

            if (popupsName) {
                $checkType ? $funcs[event][type].push([funcs, popupsName]) : $funcs[event].push([funcs, popupsName]);
            } else {
                $checkType ? $funcs[event][type].push(funcs) : $funcs[event].push(funcs);
            }

        } else if (checkType(funcs, "array")) {

            for (let func of funcs) {

                if (!checkType(func, "function")) continue;

                if (popupsName) {
                    $checkType ? $funcs[event][type].push([func, popupsName]) : $funcs[event].push([func, popupsName]);
                } else {
                    $checkType ? $funcs[event][type].push(func) : $funcs[event].push(func);
                }

            }

        }

    };

};