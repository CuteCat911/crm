import axios from "axios";
import {checkType} from "../../js/general/check-type";
import {serialize} from "../../js/general/serialize";

export const Clients = {
    namespaced: true,
    state: {
        items: [],
        itemsData: null,
        preloader: false,
        selected: [],
        pages: {
            total: null,
            current: 1,
            countOn: 30
        },
        search: "",
        filters: {},
        displayType: 1,
        cancel: null
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
        pages: state => {
            return state.pages;
        },
        search: state => {
            return state.search;
        },
        filters: state => {
            return state.filters;
        },
        displayType: state => {
            return state.displayType;
        },
        cancel: state => {
            return state.cancel;
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
        selected: (state, clients) => {

            if (!checkType(clients, "array")) {
                if (DEV) console.error();
                return false;
            }

            state.selected = clients;

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
        pages: (state, data) => {

            if (!checkType(data, "object") || !checkType(data.name, "string") || !checkType(data.value, "number")) {
                if (DEV) console.error();
                return false;
            }

            state.pages[data.name] = data.value;

        },
        search: (state, value) => {

            if (!checkType(value, "string")) {
                if (DEV) console.error();
                return false;
            }

            state.search = value;

        },
        displayType: (state, type) => {

            if (!checkType(type, "number")) {
                if (DEV) console.error();
                return false;
            }

            state.displayType = type;

        },
        cancel: (state, value) => {
            state.cancel = value;
        }
    },
    actions: {
        getItems: ({state, commit, rootGetters}) => {

            let request = rootGetters["api/clients"].get;

            return new Promise((resolve, reject) => {

                if (state.cancel) state.cancel();

                axios({
                    method: request.method,
                    url: request.url,
                    data: serialize(request.method, {
                        page: state.pages.current,
                        countOnPage: state.pages.countOn,
                        search: state.search
                    }),
                    headers: {"Content-Type": "application/x-www-form-urlencoded"},
                    cancelToken: new axios.CancelToken(function executor(c) {
                        commit("cancel", c);
                    })
                })
                    .then(response => {

                        let requestData = response.data;

                        if (!requestData.success) {
                            reject(requestData);
                            return false;
                        }

                        resolve(requestData);

                    })
                    .catch(error => {
                        if (DEV) console.error(error);
                        reject(error);
                    });

            });

        },
        setItemsData: ({state, commit}, data) => {

            if (!checkType(data, "array")) {
                if (DEV) console.error();
                return false;
            }

            let $data = new WeakMap();

            for (let i in state.items) $data.set(state.items[i], data[i]);

            commit("itemsData", $data);

        },
        setNewClients: ({commit, dispatch}) => {

            commit("preloader", true);
            dispatch("getItems")
                .then(response => {

                    let {clients, clientsData, totalPages} = response.data;

                    commit("items", clients);
                    dispatch("setItemsData", clientsData);
                    commit("pages", {name: "total", value: totalPages});

                })
                .finally(() => {
                    commit("preloader", false);
                });

        }
    }
};