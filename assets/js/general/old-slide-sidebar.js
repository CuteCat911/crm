import {checkType} from "./check-type";
import {findFirstClass, findElemsClass} from "./find";
import {attr} from "./attr";
import {getWindowScroll, windowScroll} from "./window-scroll";
import {applyStyle} from "./apply-style";
import {windowResize} from "./window-resize";

const attrs = {
    indent: {
        top: "data-indent-top",
        bottom: "data-indent-bottom"
    }
};

const helpFuncs = {
    checkStyle(elem, style, value) {

        if (!checkType(elem, "object") || !checkType(style, "string") || !checkType(value, "string")) {
            return false;
        }

        return getComputedStyle(elem)[style] === value;

    }
};

export let OldSlideSidebar = class {

    constructor(params) {

        if (checkType(params.sidebarWrapper, "string") && checkType(params.sidebar, "string") && checkType(params.content, "string")) {

            let $module = this;

            let sidebarWrapper = findElemsClass(params.sidebarWrapper, document);
            let sidebar = findElemsClass(params.sidebar, document);
            let content = findFirstClass(params.content, document);

            this.$info = {
                classes: {
                    sidebarWrapper: params.sidebarWrapper,
                    sidebar: params.sidebar,
                    content: params.content
                },
                elems: {
                    sidebarWrapper: (sidebarWrapper) ? sidebarWrapper : null,
                    sidebar: (sidebar) ? sidebar : null,
                    content: (content) ? content : null
                },
                sidebarsInfo: {},
                params: {
                    indent: {
                        top: (checkType(params.indentTop, "number")) ? params.indentTop : 10,
                        bottom: (checkType(params.indentBottom, "number")) ? params.indentBottom : 10
                    },
                    minWidth: (params.minWidth > 0) ? params.minWidth : null,
                    system: {
                        windowWidth: null,
                        contentHeight: null
                    }
                }
            };

            this.$attrs = attrs;

            this.$styles = {
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

            if (sidebarWrapper && sidebar && content) {

                this.__getSidebarsInfo();
                windowScroll(function() {
                    $module.__scroll();
                });
                windowResize(function() {

                    $module.__getSidebarsInfo();
                    let $params = $module.$info.params;

                    if ($params.windowWidth <= $params.minWidth) {
                        $module.__disable();
                    }

                });

            }

        }

    }

    get attrs() {
        return this.$attrs;
    }

    get sidebarsInfo() {
        return this.$info.sidebarsInfo;
    }

    __getSidebarsInfo() {

        let $elems = this.$info.elems;
        let $params = this.$info.params;
        let $sidebarsInfo = this.$info.sidebarsInfo;

        this.__setSizes();

        for (let i in $elems.sidebarWrapper) {

            let $wrapper = $elems.sidebarWrapper[i];

            $sidebarsInfo[i] = {
                wrapper: $wrapper,
                sidebar: findFirstClass(this.$info.classes.sidebar, $wrapper),
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
                        top: null,
                        bottom: null
                    },
                    lastScroll: 0
                }
            };

            let sidebar = $sidebarsInfo[i].sidebar;

            if (sidebar) {

                for (let j in $params.indent) {

                    let size = attr(sidebar, attrs.indent[j]);

                    if (checkType(+size, "number")) {
                        $sidebarsInfo[i].params.indent[j] = +size;
                    } else {
                        $sidebarsInfo[i].params.indent[j] = $params.indent[j];
                    }

                }

            }

        }

    }

    __setSizes() {
        this.$info.params.system.windowWidth = window.innerWidth;
        this.$info.params.system.contentHeight = this.$info.elems.content.offsetHeight;
    }

    __scroll() {

        let $elems = this.$info.elems;
        let $params = this.$info.params;
        let $sidebarsInfo = this.$info.sidebarsInfo;
        let $fixedTop = this.$styles.fixed.top;
        let $fixedBottom = this.$styles.fixed.bottom;
        let $static = this.$styles.static;

        if (!($params.minWidth && $params.system.windowWidth > $params.minWidth || !$params.minWidth)) {
            return false;
        }

        let scroll = getWindowScroll();
        let windowHeight = window.innerHeight;
        let startLine = $elems.content.getBoundingClientRect().top + scroll;

        for (let i in $sidebarsInfo) {

            let info = $sidebarsInfo[i];
            let sidebar = info.sidebar;
            let params = info.params;
            let contentHeight = $params.system.contentHeight;
            let checkStyle = function(value) {

                if (checkType(value, "string")) {
                    return helpFuncs.checkStyle(sidebar, "position", value);
                }

            };

            params.margin.top = parseFloat(window.getComputedStyle(sidebar).marginTop);
            params.width = sidebar.offsetWidth;
            params.height = sidebar.offsetHeight;
            params.offset = sidebar.getBoundingClientRect().top + scroll;

            if ($params.system.contentHeight > params.height) {

                info.wrapper.style.height = contentHeight + "px";

                let marginTop = params.margin.top;
                let top = params.indent.top;
                let bottom = params.indent.bottom;
                let width = params.width;
                let height = params.height;
                let offset = params.offset;

                if (height < contentHeight || windowHeight > $params.minWidth) {

                    $fixedTop.top = top + "px";
                    $fixedTop.width = width + "px";
                    $fixedBottom.bottom = bottom + "px";
                    $fixedBottom.width = width + "px";

                    if (scroll > params.lastScroll) {

                        if (height <= windowHeight) {

                            if ((scroll >= startLine - top) && !checkStyle("fixed")) {
                                applyStyle(sidebar, $fixedTop, "add");
                            }

                            if ((scroll + windowHeight >= startLine + contentHeight - top + (windowHeight - height)) && !checkStyle("static")) {
                                $static.marginTop = contentHeight - height + "px";
                                applyStyle(sidebar, $static, "add");
                            }

                        } else {

                            if ((scroll >= startLine + height + bottom - windowHeight) && (marginTop === 0) && !checkStyle("fixed")) {
                                params.position.bottom = "active";
                                applyStyle(sidebar, $fixedBottom, "add");
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
                                $fixedBottom.marginTop = "";
                                applyStyle(sidebar, $fixedBottom, "add");
                            }

                        }

                    } else {

                        if (height <= windowHeight) {

                            if ((scroll <= startLine - top) && !checkStyle("static")) {
                                $static.marginTop = "";
                                applyStyle(sidebar, $static, "add");
                            }

                            if ((scroll + windowHeight <= startLine + contentHeight - top + (windowHeight - height)) && (scroll > startLine + top) && !checkStyle("fixed")) {
                                applyStyle(sidebar, $fixedTop, "add");
                            }

                        } else {

                            if ((scroll + top <= offset) && !checkStyle("fixed")) {
                                params.position.top = "active";
                                applyStyle(sidebar, $fixedTop, "add");
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

            }

        }

    }

    __disable() {

        let $sidebarsInfo = this.$info.sidebarsInfo;

        for (let i in $sidebarsInfo) {
            this.$styles.static.marginTop = "";
            applyStyle($sidebarsInfo[i].sidebar, this.$styles.static, "add");
        }

    }

};