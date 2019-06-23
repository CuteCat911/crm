export const Api = {
    namespaced: true,
    state: {
        user: {
            login: {
                method: "post",
                url: "/api/user/login"
            }
        },
        clients: {
            get: {
                method: "post",
                url: "/api/clients/get"
            },
            emails: {
                method: "post",
                url: "/api/clients/get/emails"
            }
        },
        client: {
            new: {
                method: "post",
                url: "/api/client/new"
            },
            remove: {
                method: "post",
                url: "/api/client/{id}/remove"
            },
            update: {
                method: "post",
                url: "/api/client/{id}/update"
            }
        },
        mailing: {
            new: {
                method: "post",
                url: "/api/mailing/new"
            }
        },
        mailings: {
            get: {
                method: "post",
                url: "/api/mailings/get"
            }
        },
        mailingItem: {
            new: {
                method: "post",
                url: "/api/mailing-item/new"
            },
            update: {
                method: "post",
                url: "/api/mailing-item/{id}/update"
            },
            sendNowMails: {
                method: "post",
                url: "/api/mailing-item/{id}/send-mails/now"
            },
            sendScheduledMails: {
                method: "post",
                url: "/api/mailing-item/{id}/send-mails/scheduled"
            }
        },
        mailTemplates: {
            get: {
                method: "post",
                url: "/api/mail-templates/get"
            }
        }
    },
    getters: {
        user: state => {
            return state.user;
        },
        clients: state => {
            return state.clients;
        },
        client: state => {
            return state.client;
        },
        mailing: state => {
            return state.mailing;
        },
        mailings: state => {
            return state.mailings;
        },
        mailingItem: state => {
            return state.mailingItem;
        },
        mailTemplates: state => {
            return state.mailTemplates;
        }
    }
};