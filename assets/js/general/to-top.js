import {checkType} from "./check-type";
import {findElemsClass} from "./find";
import {findCurrentParent} from "./find-current-parent";
import {scrollTo} from "./scroll-to";
import {windowScroll, getWindowScroll} from "./window-scroll";
import {hideClass} from "./state-classes";

const helpFuncs = {
    get: {
        currentIndent(indent) {

            if (checkType(indent, "string")) {

                let parts = indent.split("X");

                if (parts[0] === "screen") {

                    let factor = (parts[1] > 1) ? parts[1] : 1;

                    return window.innerHeight * factor;

                }

            } else if (checkType(indent, "number")) {
                return indent;
            }

        }
    }
};

export let ToTop = class {

    constructor(params) {

        if (checkType(params.elems, "string")) {

            let $module = this;

            this.$info = {
                elemsClass: params.elems,
                elems: findElemsClass(params.elems, document),
                params: {
                    fps: (checkType(params.fps, "number") && params.fps >= 10) ? params.fps : 60,
                    speed: (checkType(params.speed, "number")) ? params.speed : 1,
                    dynamic: (checkType(params.dynamic, "boolean")) ? true : false,
                    hide: {
                        active: (checkType(params.hide, "boolean")) ? true : false,
                        indent: (checkType(params.hide, "boolean") && (checkType(params.hideIndent, "string") || +params.hideIndent > 0)) ? params.hideIndent : "screen"
                    }
                }
            };

            let $info = this.$info;

            $info.params.hide.indent = helpFuncs.get.currentIndent($info.params.hide.indent);

            if ($info.elems && !$info.params.dynamic) {

                for (let elem of $info.elems) {
                    elem.addEventListener("click", function() {
                        $module.__scroll();
                    });
                }

            } else if ($info.params.dynamic) {

                document.addEventListener("click", function(e) {

                    let elem = e.target;

                    if (elem.classList.contains($info.elemsClass)) {
                        $info.elems = findElemsClass($info.elemsClass, document);
                        $module.__scroll();
                    } else {

                        let parent = findCurrentParent(elem, $info.elemsClass);

                        if (parent) {
                            $info.elems = findElemsClass($info.elemsClass, document);
                            $module.__scroll();
                        }

                    }

                });

            }

            this.__hide();
            windowScroll(function() {
                $module.__hide();
            });

        }

    }

    __scroll() {
        scrollTo(0, this.$info.params.fps, this.$info.params.speed);
    }

    __hide() {

        let $elems = this.$info.elems;
        let $hide = this.$info.params.hide;

        if (!$elems || !$hide.active) {
            return false;
        }

        let scroll = getWindowScroll();

        if (!$hide.indent) {
            return false;
        }

        for (let $elem of $elems) {

            if (scroll >= $hide.indent) {
                $elem.classList.remove(hideClass);
            } else {
                $elem.classList.add(hideClass);
            }

        }

    }

};