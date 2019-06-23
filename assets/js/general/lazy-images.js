import {checkType} from "./check-type";
import {findElemsClass, findFirstTag} from "./find";
import {attr} from "./attr";
import {failedClass, loadedClass} from "./state-classes";

export let LazyImages = class LazyImages {

    #data = {
        images: {
            class: null,
            info: []
        }
    };
    #attrs = {
        styleImage: "data-style-image",
        image: {
            src: "data-image-src",
            alt: "data-image-alt"
        },
        picture: {
            sources: "data-picture-sources"
        }
    };
    #system = {
        indent: {
            top: 0,
            bottom: 0
        },
        preloader: {
            // TODO Preloader
            active: false
        },
        observers: {
            top: {
                observer: null,
                options: {
                    rootMargin: null,
                    threshold: 1
                }
            },
            bottom: {
                observer: null,
                options: {
                    rootMargin: null,
                    threshold: 0
                }
            }
        },
        maxTry: 3
    };

    constructor(params) {

        if (!checkType(params, "object") || !checkType(params.images, "string")) {
            if (DEV) console.error();
            return {fallInstall: true};
        }

        this.#__setData(params);
        this.#__initObservers();
        this.findImages();

    }

    #__setData = params => {

        let $images = this.#data.images;
        let $indent = this.#system.indent;

        $images.class = params.images;

        if (checkType(params.indent, "object")) {
            $indent.top = checkType(params.indent.top, "number") ? params.indent.top : 0;
            $indent.bottom = checkType(params.indent.bottom, "number") ? params.indent.bottom : 0;
        }

        this.#system.maxTry = checkType(params.maxTry, "number") ? params.maxTry : 3;

    };

    #__observeCallback = entries => {

        let observers = this.#system.observers;

        for (let entry of entries) {

            if (!entry.isIntersecting) continue;

            let info = this.#__getCurrentInfo(entry.target);

            if (!info.loaded) {

                this.#__loadImage(info);

                if (info.try >= this.#system.maxTry) {
                    observers.top.observer.unobserve(info.elem);
                    observers.bottom.observer.unobserve(info.elem);
                }

            } else {
                observers.top.observer.unobserve(info.elem);
                observers.bottom.observer.unobserve(info.elem);
            }

        }

    };

    #__initObservers = () => {

        let indent = this.#system.indent;
        let observers = this.#system.observers;

        observers.top.options.rootMargin = (indent.top * -1) + "px 0px 0px";
        observers.bottom.options.rootMargin = indent.bottom + "px 0px 0px";
        observers.top.observer = new IntersectionObserver(this.#__observeCallback, observers.top.options);
        observers.bottom.observer = new IntersectionObserver(this.#__observeCallback, observers.bottom.options);

    };

    #__setSourcesInfo = (info, sources) => {

        if (!checkType(info, "object") || !checkType(sources, "string")) {
            if (DEV) console.error();
            return false;
        }

        let sourcesArray = sources.match(new RegExp("{+[^{}]+}", "gm"));

        for (let source of sourcesArray) {

            let items = source.replace(new RegExp("{|}", "gm"), "").split(", ");
            let sourceInfo = {};

            for (let item of items) {
                let paths = item.split("=");
                sourceInfo[paths[0]] = paths[1];
            }

            info.sources.push(sourceInfo);

        }

    };

    #__getCurrentInfo = image => {

        if (!checkType(image, "object")) {
            if (DEV) console.error();
            return false;
        }

        for (let info of this.#data.images.info) if (info.elem === image) return info;

    };

    #__setImageInfo = (image) => {

        if (!checkType(image, "object")) {
            if (DEV) console.error();
            return false;
        }

        let info = {
            type: null,
            elem: image,
            loaded: false,
            topOffset: null,
            height: null,
            src: null,
            alt: null,
            sources: [],
            try: 0
        };
        let styleImage = attr(image, this.#attrs.styleImage);
        let src = attr(image, this.#attrs.image.src);
        let alt = attr(image, this.#attrs.image.alt);
        let sources = attr(image, this.#attrs.picture.sources);
        let observers = this.#system.observers;

        if (styleImage) {
            info.type = "style";
        } else if (sources) {
            info.type = "picture";
            this.#__setSourcesInfo(info, sources);
        } else if (src) {
            info.type = "image";
        }

        info.src = (info.type === "style") ? styleImage : src;
        info.alt = alt ? alt : "";
        observers.top.observer.observe(info.elem);
        observers.bottom.observer.observe(info.elem);

        return info;

    };

    #__updateImage = info => {

        if (!checkType(info, "object")) {
            if (DEV) console.error();
            return false;
        }

        switch (info.type) {
            case "style":

                info.elem.style.backgroundImage = "url(" + info.src + ")";

                break;
            case "image":

                attr(info.elem, "src", info.src);
                attr(info.elem, "alt", info.alt);

                break;
            case "picture":

                let checkImage = findFirstTag("img", info.elem);
                let image = checkImage ? checkImage : document.createElement("img");

                for (let source of info.sources) {

                    let sourceElem = document.createElement("source");

                    for (let i in source) {
                        attr(sourceElem, i, source[i]);
                    }

                    info.elem.appendChild(sourceElem);

                }

                attr(image, "src", info.src);
                attr(image, "alt", info.alt);
                info.elem.appendChild(image);

                break;
        }

        info.loaded = true;
        info.elem.classList.add(loadedClass);

    };

    #__failedImage = info => {

        if (!checkType(info, "object")) {
            if (DEV) console.error();
            return false;
        }

        info.loaded = false;
        info.try++;

        switch (info.type) {
            case "style":
                break;
            case "image":
                break;
            case "picture":
                break;
        }

        info.elem.classList.add(failedClass);

    };

    #__loadImage = info => {

        if (!checkType(info, "object")) {
            if (DEV) console.error();
            return false;
        }

        let module = this;
        let img = document.createElement("img");

        img.onload = () => {
            module.#__updateImage(info);
        };
        img.onerror = () => {
            module.#__failedImage(info);

        };

        img.src = info.src;

    };

    get getAttrs() {
        return this.#attrs;
    }

    get getImagesInfo() {
        return this.#data.images.info;
    }

    findImages = () => {

        let $images = this.#data.images;
        let allImages = findElemsClass($images.class, document);

        if (!allImages) {
            if (DEV) console.error();
            return false;
        }

        if (!$images.info.length) {

            for (let image of allImages) {
                let imageInfo = this.#__setImageInfo(image);
                if (imageInfo) $images.info.push(imageInfo);
            }

        } else {

            for (let image of allImages) {

                let match = false;

                for (let item of $images.info) if (item.elem === image) match = true;

                if (!match) {
                    let imageInfo = this.#__setImageInfo(image);
                    if (imageInfo) $images.info.push(imageInfo);
                }

            }

            for (let i in $images.info) {

                let match = false;
                
                for (let image of allImages) if (image === $images.info[i].elem) match = true;

                if (!match) $images.info.splice(i, 1);

            }

        }

    };

    getImageInfo = id => {

        if (!id) {
            if (DEV) console.error();
            return false;
        }

        for (let i in this.#data.images.info) {

            let info = this.#data.images.info[i];

            if (checkType(id, "object")) {
                if (info.elem === id) return info;
            } else if (checkType(id, "string")) {
                if (info.src === id) return info;
            } else if (checkType(id, "number")) {
                if (i === id) return info;
            }

        }

        return null;

    };

};