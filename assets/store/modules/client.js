import axios from "axios";

import {checkType} from "../../js/general/check-type";
import {serialize} from "../../js/general/serialize";
import {getInputsData} from "../../js/modules/get-inputs-data";
import {convertString} from "../../js/general/convert-string";

export const Client = {
    namespaced: true,
    state: {
        id: null,
        createdTime: null,
        updatedTime: null,
        name: null,
        description: null,
        priority: null,
        source: null,
        groupType: null,
        city: null,
        postIndex: null,
        address: null,
        emails: null,
        phones: null,
        sites: null,
        socials: null,
        contactPersons: null
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
        name: state => {
            return state.name;
        },
        description: state => {
            return state.description;
        },
        priority: state => {
            return state.priority;
        },
        source: state => {
            return state.source;
        },
        groupType: state => {
            return state.groupType;
        },
        city: state => {
            return state.city;
        },
        postIndex: state => {
            return state.postIndex;
        },
        address: state => {
            return state.address;
        },
        emails: state => {
            return state.emails;
        },
        phones: state => {
            return state.phones;
        },
        sites: state => {
            return state.sites;
        },
        socials: state => {
            return state.socials;
        },
        contactPersons: state => {
            return state.contactPersons;
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

            state.updatedTime = time;

        },
        name: (state, name) => {

            if (!checkType(name, "object")) {
                if (DEV) console.error();
                return false;
            }

            state.name = name;

        },
        description: (state, description) => {

            if (!checkType(description, "object")) {
                if (DEV) console.error();
                return false;
            }

            state.description = description;

        },
        priority: (state, priority) => {

            if (!checkType(priority, "object")) {
                if (DEV) console.error();
                return false;
            }

            state.priority = priority;

        },
        source: (state, source) => {

            if (!checkType(source, "object")) {
                if (DEV) console.error();
                return false;
            }

            state.source = source;

        },
        groupType: (state, groupType) => {

            if (!checkType(groupType, "object")) {
                if (DEV) console.error();
                return false;
            }

            state.groupType = groupType;

        },
        city: (state, city) => {

            if (!checkType(city, "object")) {
                if (DEV) console.error();
                return false;
            }

            state.city = city;

        },
        postIndex: (state, postIndex) => {

            if (!checkType(postIndex, "object")) {
                if (DEV) console.error();
                return false;
            }

            state.postIndex = postIndex;

        },
        address: (state, address) => {

            if (!checkType(address, "object")) {
                if (DEV) console.error();
                return false;
            }

            state.address = address;

        },
        emails: (state, emails) => {

            if (!checkType(emails, "object")) {
                if (DEV) console.error();
                return false;
            }

            state.emails = emails;

        },
        phones: (state, phones) => {

            if (!checkType(phones, "object")) {
                if (DEV) console.error();
                return false;
            }

            state.phones = phones;

        },
        sites: (state, sites) => {

            if (!checkType(sites, "object")) {
                if (DEV) console.error();
                return false;
            }

            state.sites = sites;

        },
        socials: (state, socials) => {

            if (!checkType(socials, "object")) {
                if (DEV) console.error();
                return false;
            }

            state.socials = socials;

        },
        contactPersons: (state, persons) => {

            if (!checkType(persons, "object")) {
                if (DEV) console.error();
                return false;
            }

            state.contactPersons = persons;

        }
    },
    actions: {
        setData: ({state, commit}, data) => {

            if (!checkType(data, "object") || !data instanceof Map) {
                if (DEV) console.error();
                return false;
            }

            for (let item of data) {
                let [id, value] = item;
                commit(id, value);
            }

        },
        saveNew: ({state, rootGetters}) => {

            let request = rootGetters["api/client"].new;

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
                        if (DEV) console.error(error);
                        reject(error);
                    });

            });

        },
        remove: ({state, rootGetters}, id = false) => {

            if (!checkType(state.id, "number") && !checkType(id, "number")) {
                if (DEV) console.error();
                return false;
            }

            let request = rootGetters["api/client"].remove;

            id = state.id ? state.id : id;

            return new Promise((resolve, reject) => {

                axios({
                    method: request.method,
                    url: convertString(request.url, {id}),
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
                        if (DEV) console.error(error);
                        reject(error);
                    });

            });


        },
        update: ({state, rootGetters}) => {

            let request = rootGetters["api/client"].update;

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
                        if (DEV) console.error(error);
                        reject(error);
                    });

            });

        }
    }
};