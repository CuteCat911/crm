import Vue from "vue";
import Vuex from "vuex";

import {checkType} from "../js/general/check-type";

// Modules

import {Api} from "./modules/api";
import {Endpoints} from "./modules/endpoints";
import {User} from "./modules/user";
import {Clients} from "./modules/clients";
import {Client} from "./modules/client";
import {Mailing} from "./modules/mailing";
import {MailingsItems} from "./modules/mailings-items";
import {MailingItem} from "./modules/mailing-item";

// End Modules

Vue.use(Vuex);

export const Store = new Vuex.Store({
    strict: process.env.NODE_ENV !== "production",
    modules: {
        api: Api,
        endpoints: Endpoints,
        user: User,
        clients: Clients,
        client: Client,
        mailing: Mailing,
        mailingsItems: MailingsItems,
        mailingItem: MailingItem
    },
    state: {
        preloader: true,
        openedPopups: []
    },
    getters: {
        preloader: state => {
            return state.preloader;
        },
        openedPopups: state => {
            return state.openedPopups;
        }
    },
    mutations: {
        preloader: (state, status) => {

            if (!checkType(status, "boolean")) {
                if (DEV) console.error();
                return false;
            }

            state.preloader = status;

        },
        openedPopups: (state, popups) => {

            if (!checkType(popups, "array")) {
                if (DEV) console.error();
                return false;
            }

            state.openedPopups = popups;

        },
        openPopup: (state, popupName) => {

            if (!checkType(popupName, "string")) {
                if (DEV) console.error();
                return false;
            }

            state.openedPopups.push(popupName);

            if (getComputedStyle(document.body).overflow === "visible") {
                document.body.style.overflow = "hidden";
            }

        },
        closePopup: (state, popupName) => {

            if (checkType(popupName, "string")) {

                let popupIndex = state.openedPopups.indexOf(popupName);
                if (popupIndex !== -1) state.openedPopups.splice(popupIndex, 1);

            } else {
                state.openedPopups.pop();
            }

            if (state.openedPopups.length === 0) {
                document.body.style.overflow = "";
            }

        },
        updateInputValue: (state, data) => {

            if (!checkType(data, "object")) {
                if (DEV) console.error();
                return false;
            }

            data.input.value = data.newValue;

        },
        addItemToInputArray: (state, data) => {

            if (!checkType(data, "object")) {
                if (DEV) console.error();
                return false;
            }

            let {array, index, newItem} = data;

            if (!checkType(array, "array") || !checkType(index, "number") || !checkType(newItem, "object")) {
                if (DEV) console.error();
                return false;
            }

            newItem.orderIndex.value = index + 1;
            array.splice(index + 1, 0, newItem);

        },
        removeItemToInputArray: (state, data) => {

            if (!checkType(data, "object")) {
                if (DEV) console.error();
                return false;
            }

            let {array, index, newItem} = data;

            if (!checkType(array, "array") || !checkType(index, "number")) {
                if (DEV) console.error();
                return false;
            }

            if (array.length === 1) {

                if (!checkType(newItem, "object")) {
                    if (DEV) console.error();
                    return false;
                }

                array.splice(index, 0, newItem);
                array.splice(index - 1, 1);

            } else {
                array.splice(index, 1);
            }

        },
        setInputErrorStatus: (state, data) => {

            if (!checkType(data, "object")) {
                if (DEV) console.error();
                return false;
            }

            let {status, input, errorType} = data;

            if (!checkType(status, "boolean") || !checkType(input, "object")) {
                if (DEV) console.error();
                return false;
            }

            if (status) {
                input.error.status = true;
                input.success = false;

                if (checkType(errorType, "string")) {
                    input.error.message = input.error.texts[errorType] ? input.error.texts[errorType] : null;
                }

            } else {
                input.error.status = false;
                input.error.message = null;
                input.success = true;
            }

        }
    }
});