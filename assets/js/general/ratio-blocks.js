import {checkType} from "./check-type";
import {findElemsClass} from "./find";
import {attr} from "./attr";
import {windowResize} from "./window-resize";

export let RatioBlocks = class RatioBlocks {

    #data = {
        class: null,
        elems: null,
        info: []
    };
    #attrs = {
        ratio: "data-ratio",
        priority: "data-priority",
        adjust: "data-adjust",
        font: "data-font-proportional"
    };

    constructor(blocks) {

        if (!checkType(blocks, "string")) {
            if (DEV) console.error();
            return {fallInstall: true};
        }

        this.#__setData(blocks);
        this.#__findElems();
        this.#__setBlocksInfo();
        this.applyResize();

        windowResize(() => {
            this.#__setBlocksInfo();
            this.applyResize();
        });

    }

    #__setData = data => {
        this.#data.class = data;
    };

    #__findElems = () => {
        this.#data.elems = findElemsClass(this.#data.class, document);
    };

    #__setBlocksInfo = () => {

        let data = this.#data;

        data.info = [];

        if (!data.elems) return false;

        for (let block of data.elems) {

            let blockInfo = {
                elem: block,
                params: {
                    ratio: null,
                    priority: "width",
                    adjust: "false",
                    font: null
                }
            };

            for (let i in blockInfo.params) {

                let value = attr(block, this.#attrs[i]);
                if (!value) continue;
                blockInfo.params[i] = value;

            }

            data.info.push(blockInfo);

        }

    };

    #__setCurrentSize = (params) => {

        if (!checkType(params, "object")) {
            if (DEV) console.error();
            return false;
        }

        let {elem, adjust, size, minSize, currentSize} = params;

        if (!checkType(elem, "object") || !checkType(adjust, "string") || !checkType(size, "string") || !checkType(minSize, "string") || !checkType(currentSize, "string")) {
            if (DEV) console.error();
            return false;
        }

        if (adjust === "true") {
            elem.style[minSize] = currentSize;
        } else if (adjust === "false") {
            elem.style[size] = currentSize;
        }

    };

    #__getCurrentFontSize = (font, currentSize) => {

        if (!checkType(font, "string") || !checkType(currentSize, "number")) {
            if (DEV) console.error();
            return false;
        }

        let ratio = font.split(":");
        return currentSize / (ratio[0] / ratio[1]);

    };

    #__setSize = info => {

        if (!checkType(info, "object")) {
            if (DEV) console.error();
            return false;
        }

        let {elem, params: {ratio, priority, adjust, font}} = info;

        if (!elem || !ratio) {
            if (DEV) console.error();
            return false;
        }

        let currentSize = null;
        let wantedSize = null;

        ratio = ratio.split(":");

        if (priority === "width") {
            currentSize = elem.offsetWidth;
            wantedSize = currentSize * ratio[1] / ratio[0];
        } else if (priority === "height") {
            currentSize = elem.offsetHeight;
            wantedSize = currentSize * ratio[0] / ratio[1];
        }

        if (!checkType(wantedSize, "number")) {
            if (DEV) console.error();
            return false;
        }

        if (priority === "width") {
            this.#__setCurrentSize({
                elem,
                adjust,
                size: "height",
                minSize: "minHeight",
                currentSize: wantedSize + "px"
            });
        } else if (priority === "height") {
            this.#__setCurrentSize({
                elem,
                adjust,
                size: "width",
                minSize: "minWidth",
                currentSize: wantedSize + "px"
            });
        }

        if (font) elem.style.fontSize = this.#__getCurrentFontSize(font, currentSize);

    };

    get getAttrs() {
        return this.#attrs;
    };

    get getBlocksInfo() {
        return this.#data.info;
    };

    findElems = () => {

        this.#__findElems();

        if (!this.#data.elems) {
            if (DEV) console.error();
            return {fallInstall: true};
        }

        this.#__setBlocksInfo();

    };

    applyResize = block => {

        if (checkType(block, "object")) {
            this.#__setSize(this.getBlockInfo(block));
        } else {

            if (!this.#data.info) return false;

            for (let info of this.#data.info) {
                this.#__setSize(info);
            }

        }

    };

    getBlockInfo = id => {

        if (!id) {
            if (DEV) console.error();
            return false;
        }

        for (let i in this.#data.info) {

            let info = this.#data.info[i];

            if (checkType(id, "object")) {
                if (info.elem === id) return info;
            } else if (checkType(id, "number")) {
                if (i === id) return info;
            }

        }

        return null;

    };

};