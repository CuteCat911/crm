import {checkType} from "./check-type";
import {getWindowScroll, getDocumentHeight} from "./window-scroll";

export let scrollTo = function(position, fps = 60, speed = 1) {

    if (!checkType(position, "number")) {
        return false;
    }

    let windowHeight = window.innerHeight;
    let documentHeight = getDocumentHeight();
    let scroll = getWindowScroll();
    let direction = scroll <= position ? "bottom" : "top";
    let scrollBy;

    if (!checkType(fps, "number") && +fps < 10) {
        fps = 60;
    }

    if (direction === "bottom") {
        scrollBy = position / fps;
    } else if (direction === "top") {
        scrollBy = (getWindowScroll() - position) / fps;
    }

    let scroller = setInterval(function() {

        scroll = getWindowScroll();

        if (direction === "bottom") {

            if ((scrollBy > scroll - position) && (windowHeight + scroll < documentHeight)) {
                window.scrollBy(0, scrollBy * speed);
            } else {
                window.scrollTo(0, position);
                clearInterval(scroller);
            }

        } else if (direction === "top") {

            if ((scrollBy > position - scroll) && (scroll > 0)) {
                window.scrollBy(0, -scrollBy * speed);
            } else {
                window.scrollTo(0, position);
                clearInterval(scroller);
            }

        }

    }, 1000 / fps);

    window.addEventListener("wheel", function() {
        clearInterval(scroller);
    });

    window.addEventListener("touchstart", function() {
        clearInterval(scroller);
    });

};