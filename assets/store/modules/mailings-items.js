import {checkType} from "../../js/general/check-type";

export const MailingsItems = {
    namespaced: true,
    state: {
        items: [],
        itemsData: null,
        preloader: false,
        selected: [],
        page: 1,
        countOnPage: 100
    },
    getters: {
        items: state => {
            return state.items;
        },
        itemsData: state => {
            return state.itemsData;
        },
        preloader: state => {
            return state.preloader;
        },
        selected: state => {
            return state.selected;
        },
        page: state => {
            return state.page;
        },
        countOnPage: state => {
            return state.countOnPage;
        }
    },
    mutations: {
        items: (state, items) => {

            if (!checkType(items, "array")) {
                if (DEV) console.error();
                return false;
            }

            state.items = items;

        },
        itemsData: (state, data) => {

            if (!checkType(data, "object") || !data instanceof WeakMap) {
                if (DEV) console.error();
                return false;
            }

            state.itemsData = data;

        },
        preloader: (state, status) => {

            if (!checkType(status, "boolean")) {
                if (DEV) console.error();
                return false;
            }

            state.preloader = status;

        },
        selected: (state, items) => {

            if (!checkType(items, "array")) {
                if (DEV) console.error();
                return false;
            }

        },
        addSelectedItem: (state, id) => {

            if (!checkType(id, "number")) {
                if (DEV) console.error();
                return false;
            }

            if (!state.selected.includes(id)) state.selected.push(id);

        },
        removeSelectedItem: (state, index) => {

            if (!checkType(index, "number")) {
                if (DEV) console.error();
                return false;
            }

            state.selected.splice(index, 1);

        },
        page: (state, page) => {

            if (!checkType(page, "number")) {
                if (DEV) console.error();
                return false;
            }

            state.page = page;

        },
        countOnPage: (state, count) => {

            if (!checkType(count, "number")) {
                if (DEV) console.error();
                return false;
            }

            state.countOnPage = count;

        }
    },
    actions: {
        setItemsData: ({state, commit}, data) => {

            if (!checkType(data, "array")) {
                if (DEV) console.error();
                return false;
            }

            let $data = new WeakMap();

            for (let i in state.items) $data.set(state.items[i], data[i]);

            commit("itemsData", $data);

        }
    }
};