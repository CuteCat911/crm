import axios from "axios";
import {checkType} from "../../js/general/check-type";
import {Structure} from "../../js/modules/structures/structure";
import {serialize} from "../../js/general/serialize";
import {getInputsData} from "../../js/modules/get-inputs-data";
import {convertString} from "../../js/general/convert-string";

export const MailingItem = {
    namespaced: true,
    state: {
        id: null,
        createdTime: null,
        updatedTime: null,
        sendTime: null,
        nowSend: null,
        status: null,
        theme: null,
        mailing: null,
        selectedEmails: null,
        emailsCount: 30,
        search: "",
        clients: {
            pages: {
                total: null,
                current: 1
            },
            list: [],
            listData: null,
            preloader: false
        }
    },
    getters: {
        all: state => {
            return state;
        },
        id: state => {
            return state.id;
        },
        createdTime: state => {
            return state.createdTime;
        },
        updatedTime: state => {
            return state.updatedTime;
        },
        sendTime: state => {
            return state.sendTime;
        },
        nowSend: state => {
            return state.nowSend;
        },
        status: state => {
            return state.status;
        },
        theme: state => {
            return state.theme;
        },
        mailing: state => {
            return state.mailing;
        },
        selectedEmails: state => {
            return state.emails;
        },
        emailsCount: state => {
            return state.emailsCount;
        },
        search: state => {
            return state.search;
        },
        clients: state => {
            return state.clients;
        }
    },
    mutations: {
        id: (state, id) => {

            if (!checkType(id, "number")) {
                if (DEV) console.error();
                return false;
            }

            state.id = id;

        },
        createdTime: (state, time) => {

            if (!checkType(time, "string")) {
                if (DEV) console.error();
                return false;
            }

            state.createdTime = time;

        },
        updatedTime: (state, time) => {

            if (!checkType(time, "string")) {
                if (DEV) console.error();
                return false;
            }

        },
        sendTime: (state, time) => {

            if (!checkType(time, "object")) {
                if (DEV) console.error();
                return false;
            }

            state.sendTime = time;

        },
        nowSend: (state, status) => {

            if (!checkType(status, "boolean")) {
                if (DEV) console.error();
                return false;
            }

            state.nowSend = status;

        },
        status: (state, status) => {

            if (!checkType(status, "number")) {
                if (DEV) console.error();
                return false;
            }

            state.status = status;

        },
        theme: (state, theme) => {

            if (!checkType(theme, "object")) {
                if (DEV) console.error();
                return false;
            }

            state.theme = theme;

        },
        mailing: (state, mailing) => {

            if (!checkType(mailing, "object")) {
                if (DEV) console.error();
                return false;
            }

            state.mailing = mailing;

        },
        mailings: (state, mailings) => {

            if (!checkType(mailings, "array")) {
                if (DEV) console.error();
                return false;
            }

            state.mailing.selectList = mailings;

        },
        selectedEmails: (state, emails) => {

            if (!checkType(emails, "object")) {
                if (DEV) console.error();
                return false;
            }

            state.selectedEmails = emails;

        },
        addSelectedEmail: (state, id) => {

            if (!checkType(id, "number")) {
                if (DEV) console.error();
                return false;
            }

            state.selectedEmails.value.push(id);

        },
        removeSelectedEmail: (state, index) => {

            if (!checkType(index,"number")) {
                if (DEV) console.error();
                return false;
            }

            state.selectedEmails.value.splice(index, 1);

        },
        emailsCount: (state, count) => {

            if (!checkType(count, "number")) {
                if (DEV) console.error();
                return false;
            }

            state.emailsCount = count;

        },
        search: (state, search) => {

            if (!checkType(search, "string")) {
                if (DEV) console.error();
                return false;
            }

            state.search = search;

        },
        clients: (state, data) => {

            if (!checkType(data, "object")) {
                if (DEV) console.error();
                return false;
            }

            let {name, value} = data;

            switch (name) {
                case "list":
                    if (!checkType(value, "array")) return false;
                    state.clients[name] = value;
                    break;
                case "listData":
                    if (!checkType(value, "object") || !value instanceof WeakMap) return false;
                    state.clients[name] = value;
                    break;
                case "preloader":
                    if (!checkType(value, "boolean")) return false;
                    state.clients[name] = value;
                    break;
            }

        },
        clientsPages: (state, data) => {

            if (!checkType(data, "object") || !checkType(data.name, "string") || !checkType(data.value, "number")) {
                if (DEV) console.error();
                return false;
            }

            state.clients.pages[data.name] = data.value;

        }
    },
    actions: {
        setData: ({state, commit, dispatch, rootGetters}, data) => {

            if (!checkType(data, "object") || !data instanceof Map) {
                if (DEV) console.error();
                return false;
            }

            for (let item of data) {
                let [id, value] = item;
                commit(id, value);
            }

            Structure.getSomeData(rootGetters["api/mailings"].get)
                .then(response => {
                    commit("mailings", response.data.mailings);
                });
            dispatch("setClients");

        },
        setClientsListData: ({state, commit}, data) => {

            if (!checkType(data, "array")) {
                if (DEV) console.error();
                return false;
            }

            let $data = new WeakMap();

            for (let i in state.clients.list) {
                let item = state.clients.list[i];
                $data.set(item, data[i]);
            }

            commit("clients", {name: "listData", value: $data});

        },
        setClients: ({state, commit, dispatch, rootGetters}) => {

            commit("clients", {name: "preloader", value: true});

            Structure.getSomeData(rootGetters["api/clients"].emails ,{
                page: state.clients.pages.current,
                countOnPage: state.emailsCount,
                search: state.search
            })
                .then(response => {

                    let {clients, clientsData, totalPages} = response.data;

                    commit("clients", {name: "list", value: clients});
                    dispatch("setClientsListData", clientsData);
                    commit("clientsPages", {name: "total", value: totalPages});

                })
                .finally(() => {
                    commit("clients", {name: "preloader", value: false});
                });

        },
        saveNew: ({state, rootGetters}) => {

            let request = rootGetters["api/mailingItem"].new;

            return new Promise((resolve, reject) => {

                axios({
                    method: request.method,
                    url: request.url,
                    data: serialize(request.method, getInputsData(state, true)),
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}
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
                        if (DEV) console.error();
                        reject(error);
                    });

            });

        },
        update: ({state, rootGetters}) => {

            let request = rootGetters["api/mailingItem"].update;

            return new Promise((resolve, reject) => {

                axios({
                    method: request.method,
                    url: convertString(request.url, {id: state.id}),
                    data: serialize(request.method, getInputsData(state, true)),
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}
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
                        if (DEV) console.error();
                        reject(error);
                    })

            });

        }
    }
};