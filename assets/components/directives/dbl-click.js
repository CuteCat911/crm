import {checkType} from "../../js/general/check-type";

const data = {
    delay: 200,
    clicks: 0,
    timer: null
};

export default {
    bind(el, binding) {

        let funcs = binding.value;

        if (funcs.length !== 2) {
            if (DEV) console.error();
            return false;
        }

        let clickFunc = funcs[0];
        let dblClickFunc = funcs[1];

        if (!checkType(dblClickFunc, "function")) {
            if (DEV) console.error();
            return false;
        }

        let handler = (e) => {
            el.__vueDblClick__.callback(e);
        };

        el.__vueDblClick__= {
            handler,
            callback() {

                data.clicks++;

                if (data.clicks === 1) {

                    data.timer = setTimeout(() => {

                        if (checkType(clickFunc, "function")) clickFunc();
                        data.clicks = 0;

                    }, data.delay);

                } else {

                    clearTimeout(data.timer);
                    dblClickFunc();
                    data.clicks = 0;

                }

            }
        };

        el.addEventListener("click", handler);

    },
    update(el, binding) {

        let funcs = binding.value;

        if (funcs.length !== 2) {
            if (DEV) console.error();
            return false;
        }

        let clickFunc = funcs[0];
        let dblClickFunc = funcs[1];

        el.__vueDblClick__.callback = () => {

            data.clicks++;

            if (data.clicks === 1) {

                data.timer = setTimeout(() => {

                    if (checkType(clickFunc, "function")) clickFunc();
                    data.clicks = 0;

                }, data.delay);

            } else {

                clearTimeout(data.timer);
                dblClickFunc();
                data.clicks = 0;

            }

        };

    },
    unbind(el) {
        el.removeEventListener("click", el.__vueDblClick__.handler);
        delete el.__vueDblClick__;
    }
};