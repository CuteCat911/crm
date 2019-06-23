import {checkType} from "./check-type";
import {findElemsClass, findFirstClass} from "./find";
import {attr} from "./attr";
import {getWindowScroll, windowScroll} from "./window-scroll";
import {applyStyle} from "./apply-style";
import {windowResize} from "./window-resize";

export let SlideSidebar = class SlideSidebar {

    #data = {
        elems: {
            sidebarWrapper: null,
            sidebar: null,
            content: null
        },
        classes: {
            sidebarWrapper: null,
            sidebar: null,
            content: null
        },
        sidebarsInfo: []
    };
    #system = {
        indent: {
            top: 10,
            bottom: 10
        },
        minWidth: null,
        windowWidth: null,
        contentHeight: null
    };
    #attrs = {
        indent: {
            top: "data-indent-top",
            bottom: "data-indent-bottom"
        }
    };
    #styles = {
        fixed: {
            top: {
                marginTop: "",
                position: "fixed",
                top: "",
                width: ""
            },
            bottom: {
                position: "fixed",
                bottom: "",
                width: ""
            }
        },
        static: {
            marginTop: "",
            position: "static",
            top: "",
            bottom: "",
            width: ""
        }
    };

    constructor(params) {

        if (!checkType(params, "object")) {
            if (DEV) console.error();
            return {fallInstall: true};
        }

        let elems = this.#data.elems;

        this.#__setData(params);
        this.#__setSystem(params);

        if (!elems.sidebarWrapper || !elems.sidebar || !elems.content) {
            if (DEV) console.error();
            return {fallInstall: true};
        }

        this.#__setSidebarsInfo();
        this.#__scroll();

        windowScroll(() => {
            this.#__scroll();
        });

        windowResize(() => {
            this.#__setSidebarsInfo();
            if (this.#system.windowWidth <= this.#system.minWidth) this.#__disable();
        });

    }

    #__setData = params => {

        let {sidebarWrapper, sidebar, content} = params;
        let elems = this.#data.elems;
        let classes = this.#data.classes;
        let checkSidebarWrapper = checkType(sidebarWrapper, "string");
        let checkSidebar = checkType(sidebar, "string");
        let checkContent = checkType(content, "string");

        classes.sidebarWrapper = checkSidebarWrapper ? sidebarWrapper : null;
        classes.sidebar = checkSidebar ? sidebar : null;
        classes.content = checkContent ? content : null;
        elems.sidebarWrapper = checkSidebarWrapper ? findElemsClass(sidebarWrapper, document) : null;
        elems.sidebar = checkSidebar ? findElemsClass(sidebar, document) : null;
        elems.content = checkContent ? findFirstClass(content, document) : null;

    };

    #__setSystem = params => {

        let {indent, minWidth} = params;
        let system = this.#system;

        system.indent.top = (indent && checkType(indent.top, "number")) ? indent.top : 10;
        system.indent.bottom = (indent && checkType(indent.bottom, "number")) ? indent.bottom : 10;
        system.minWidth = (checkType(minWidth, "number") && minWidth > 0) ? minWidth : null;

    };

    #__setSizes = () => {
        this.#system.windowWidth = window.innerWidth;
        this.#system.contentHeight = this.#data.elems.content.offsetHeight;
    };

    #__setSidebarsInfo = () => {

        let elems = this.#data.elems;

        this.#data.sidebarsInfo = [];
        this.#__setSizes();

        for (let i in elems.sidebarWrapper) {

            let wrapper = elems.sidebarWrapper[i];
            let sidebar = findFirstClass(this.#data.classes.sidebar, wrapper);

            if (!checkType(wrapper, "object") || !checkType(sidebar, "object")) {
                if (DEV) console.error();
                continue;
            }

            let sidebarData = {
                wrapper,
                sidebar,
                params: {
                    indent: {
                        top: null,
                        bottom: null
                    },
                    margin: {
                        top: null
                    },
                    width: null,
                    height: null,
                    offset: null,
                    position: {
                        top: "active",
                        bottom: null
                    },
                    lastScroll: 0
                }
            };

            for (let j in this.#system.indent) {

                let size = attr(sidebar, this.#attrs.indent[j]);

                if (size && checkType(+size, "number")) {
                    sidebarData.params.indent[j] = +size;
                } else {
                    sidebarData.params.indent[j] = this.#system.indent[j];
                }

            }

            this.#data.sidebarsInfo.push(sidebarData);

        }

    };

    #__checkStyle = (elem, style, value) => {

        if (!checkType(elem, "object") || !checkType(style, "string") || !checkType(value, "string")) {
            if (DEV) console.error();
            return false;
        }

        return getComputedStyle(elem)[style] === value;

    };

    #__scroll = () => {

        let elems = this.#data.elems;
        let system = this.#system;
        let minWidth = system.minWidth;
        let fixedTop = this.#styles.fixed.top;
        let fixedBottom = this.#styles.fixed.bottom;
        let $static = this.#styles.static;

        if (!(minWidth && system.windowWidth > minWidth || !minWidth)) {
            if (DEV) console.error();
            return false;
        }

        this.#__setSizes();

        let scroll = getWindowScroll();
        let windowHeight = window.innerHeight;
        let startLine = elems.content.getBoundingClientRect().top + scroll;
        let contentHeight = system.contentHeight;

        for (let info of this.#data.sidebarsInfo) {

            let sidebar = info.sidebar;
            let params = info.params;
            let checkStyle = (value) => {

                if (!checkType(value, "string")) {
                    if (DEV) console.error();
                    return false;
                }

                return this.#__checkStyle(sidebar, "position", value);

            };

            params.margin.top = parseFloat(window.getComputedStyle(sidebar).marginTop);
            params.width = sidebar.offsetWidth;
            params.height = sidebar.offsetHeight;
            params.offset = sidebar.getBoundingClientRect().top + scroll;

            if (system.contentHeight < params.height) {
                if (DEV) console.error();
                continue;
            }

            info.wrapper.style.height = contentHeight + "px";

            let marginTop = params.margin.top;
            let top = params.indent.top;
            let bottom = params.indent.bottom;
            let width = params.width;
            let height = params.height;
            let offset = params.offset;


            if (height > contentHeight && windowHeight < minWidth) {
                if (DEV) console.error();
                continue;
            }

            fixedTop.top = top + "px";
            fixedTop.width = width + "px";
            fixedBottom.bottom = bottom + "px";
            fixedBottom.width = width + "px";

            if (scroll > params.lastScroll) {

                if (height + top + bottom <= windowHeight) {

                    if ((scroll >= startLine - top) && !checkStyle("fixed")) {
                        applyStyle(sidebar, fixedTop, "add");
                    }

                    if ((scroll + windowHeight >= startLine + contentHeight - top + (windowHeight - height)) && !checkStyle("static")) {
                        $static.marginTop = contentHeight - height + "px";
                        applyStyle(sidebar, $static, "add");
                    }

                } else {

                    if ((scroll >= startLine + height + bottom - windowHeight) && (marginTop === 0) && !checkStyle("fixed")) {
                        params.position.bottom = "active";
                        applyStyle(sidebar, fixedBottom, "add");
                    }

                    if ((scroll + windowHeight >= startLine + contentHeight + bottom) && (marginTop === 0) && !checkStyle("static")) {
                        params.position.bottom = null;
                        $static.marginTop = contentHeight - height + "px";
                        applyStyle(sidebar, $static, "add");
                    }

                    if ((scroll >= offset - top) && (params.position.top === "active") && !checkStyle("static")) {
                        params.position.top = null;
                        $static.marginTop = offset - startLine + "px";
                        applyStyle(sidebar, $static, "add");
                    }

                    if ((scroll >= offset + height + bottom - windowHeight) && (scroll + windowHeight < startLine + contentHeight) && (marginTop >= 1) && !checkStyle("fixed")) {
                        params.position.bottom = "active";
                        fixedBottom.marginTop = "";
                        applyStyle(sidebar, fixedBottom, "add");
                    }

                }

            } else {

                if (height + top + bottom <= windowHeight) {

                    if ((scroll <= startLine - top) && !checkStyle("static")) {
                        $static.marginTop = "";
                        applyStyle(sidebar, $static, "add");
                    }

                    if ((scroll + windowHeight <= startLine + contentHeight - top + (windowHeight - height)) && (scroll > startLine + top) && !checkStyle("fixed")) {
                        applyStyle(sidebar, fixedTop, "add");
                    }

                } else {

                    if ((scroll + top <= offset) && !checkStyle("fixed")) {
                        params.position.top = "active";
                        applyStyle(sidebar, fixedTop, "add");
                    }
                    if ((scroll + top <= startLine) && !checkStyle("static")) {
                        params.position.top = null;
                        $static.marginTop = "";
                        applyStyle(sidebar, $static, "add");
                    }

                    if ((params.position.bottom === "active") && !checkStyle("static")) {
                        params.position.bottom = null;
                        $static.marginTop = offset - startLine + "px";
                        applyStyle(sidebar, $static, "add");
                    }

                }

            }

            params.lastScroll = scroll;

        }

    };

    #__disable = () => {
        this.#styles.static.marginTop = "";
        for (let info of this.#data.sidebarsInfo) applyStyle(info.sidebar, this.#styles.static, "add");
    };

    get getAttrs() {
        return this.#attrs;
    }

    get getSidebarsInfo() {
        return this.#data.sidebarsInfo;
    }

    getSidebarInfo = (id) => {

        if (!id) {
            if (DEV) console.error();
            return false;
        }

        for (let i in this.#data.sidebarsInfo) {

            let info = this.#data.sidebarsInfo[i];

            if (checkType(id, "object")) {
                if (info.wrapper === id || info.sidebar === id) return info;
            } else if (checkType(id, "number")) {
                if (i === id) return info;
            }

        }

        return null;

    };

    update = () => {
        this.#__setData(params);
        this.#__setSystem(params);
        this.#__setSidebarsInfo();
    };

};