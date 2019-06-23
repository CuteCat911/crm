import {checkType} from "../../js/general/check-type";

export const User = {
    namespaced: true,
    state: {
        id: null,
        createdTime: null,
        updatedTime: null,
        login: null,
        roles: null,
        sessionTime: null,
        lastActionTime: null,
        name: null,
        lastName: null,
        patronymic: null,
        position: null
    },
    getters: {
        id: state => {
            return state.id;
        },
        createdTime: state => {
            return state.createdTime;
        },
        updatedTime: state => {
            return state.updatedTime;
        },
        login: state => {
            return state.login;
        },
        roles: state => {
            return state.roles;
        },
        sessionTime: state => {
            return state.sessionTime;
        },
        lastActionTime: state => {
            return state.lastActionTime;
        },
        name: state => {
            return state.name;
        },
        lastName: state => {
            return state.lastName;
        },
        patronymic: state => {
            return state.patronymic;
        },
        position: state => {
            return state.position;
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
        login: (state, login) => {

            if (!checkType(login, "string")) {
                if (DEV) console.error();
                return false;
            }

            state.login = login;

        },
        roles: (state, roles) => {

            if (!checkType(roles, "object")) {
                if (DEV) console.error();
                return false;
            }

            state.roles = roles;

        },
        sessionTime: (state, time) => {

            if (!checkType(time, "number")) {
                if (DEV) console.error();
                return false;
            }

            state.sessionTime = time;

        },
        lastActionTime: (state, time) => {

            if (!checkType(time, "string")) {
                if (DEV) console.error();
                return false;
            }

            state.lastActionTime = time;

        },
        name: (state, name) => {

            if (!checkType(name, "object")) {
                if (DEV) console.error();
                return false;
            }

            state.name = name;

        },
        lastName: (state, lastName) => {

            if (!checkType(lastName, "object")) {
                if (DEV) console.error();
                return false;
            }

            state.lastName = lastName;

        },
        patronymic: (state, patronymic) => {

            if (!checkType(patronymic, "object")) {
                if (DEV) console.error();
                return false;
            }

            state.patronymic = patronymic;

        },
        position: (state, position) => {

            if (!checkType(position, "object")) {
                if (DEV) console.error();
                return false;
            }

            state.position = position;

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

        }
    }
};