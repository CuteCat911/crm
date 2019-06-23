import {checkType} from "../../js/general/check-type";
import {Mailing as $Mailing} from "../../js/modules/structures/mailing";
import axios from "axios";
import {serialize} from "../../js/general/serialize";
import {getInputsData} from "../../js/modules/get-inputs-data";
import {Structure} from "../../js/modules/structures/structure";
import {Store} from "../store";

export const Mailing = {
    namespaced: true,
    state: {
        id: null,
        createdTime: null,
        updatedTime: null,
        name: null,
        description: null,
        template: null,
        structure: null,
        archive: null
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
        template: state => {
            return state.template;
        },
        structure: state => {
            return state.structure;
        },
        archive: state => {
            return state.archive;
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

            if (!checkType(time,"string")) {
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
        template: (state, template) => {

            if (!checkType(template, "object")) {
                if (DEV) console.error();
                return false;
            }

            state.template = template;

        },
        templates: (state, templates) => {

            if (!checkType(templates, "array")) {
                if (DEV) console.error();
                return false;
            }

            state.template.selectList = templates;

        },
        structure: (state, structure) => {

            if (!checkType(structure, "object")) {
                if (DEV) console.error();
                return false;
            }

            state.structure = structure;

        },
        archive: (state, archive) => {

            if (!checkType(archive, "object")) {
                if (DEV) console.error();
                return false;
            }

            state.archive = archive;

        }
    },
    actions: {
        setData: ({state, commit, rootGetters}, data) => {

            if (!checkType(data, "object") || !data instanceof Map) {
                if (DEV) console.error();
                return false;
            }

            for (let item of data) {
                let [id, value] = item;
                commit(id, value);
            }

            Structure.getSomeData(rootGetters["api/mailTemplates"].get)
                .then(response => {
                    commit("templates", response.data.templates);
                });

        },
        saveNew: ({state, rootGetters}) => {

            let request = rootGetters["api/mailing"].new;

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

        }
    }
};