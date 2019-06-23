export const Endpoints = {
    namespaced: true,
    state: {
        clients: {
            method: "post",
            url: "/endpoint/clients"
        },
        editClient: {
            method: "post",
            url: "/endpoint/client/{id}/edit"
        },
        viewClient: {
            method: "post",
            url: "/endpoint/client/{id}/view"
        },
        mailingsItems: {
            method: "post",
            url: "/endpoint/mailings-items"
        },
        editMailingItem: {
            method: "post",
            url: "/endpoint/mailing-item/{id}/edit"
        }
    },
    getters: {
        clients: state => {
            return state.clients;
        },
        editClient: state => {
            return state.editClient;
        },
        viewClient: state => {
            return state.viewClient;
        },
        mailingsItems: state => {
            return state.mailingsItems;
        },
        editMailingItem: state => {
            return state.editMailingItem;
        }
    }
};