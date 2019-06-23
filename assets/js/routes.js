import actionsPage from "../components/pages/actions";

export const Routes = [
    {
        path: "/login",
        name: "login",
        components: {
            content: () => import("../components/pages/login")
        }
    },
    {
        path: "/",
        name: "actions",
        components: {
            aside: "",
            asideBtns: "",
            content: actionsPage
        }
    },
    {
        path: "/clients",
        name: "clients",
        components: {
            aside: () => import("../components/blocks/clients-aside"),
            asideBtns: () => import("../components/blocks/clients-aside-btns"),
            content: () => import("../components/pages/clients")
        }
    },
    {
        path: "/client/new",
        name: "newClient",
        components: {
            asideBtns: () => import("../components/blocks/new-client-aside-btns"),
            content: () => import("../components/pages/new-client")
        }
    },
    {
        path: "/client/:id/view",
        name: "viewClient",
        components: {
            aside: "",
            asideBtns: () => import("../components/blocks/view-client-aside-btns"),
            content: () => import("../components/pages/view-client")
        }
    },
    {
        path: "/client/:id/edit",
        name: "editClient",
        components: {
            asideBtns: () => import("../components/blocks/edit-client-aside-btns"),
            content: () => import("../components/pages/edit-client")
        }
    },
    {
        path: "/mailings-types",
        name: "mailingsTypes",
        components: {
            aside: "",
            asideBtns: "",
            content: () => import("../components/pages/mailings-types")
        }
    },
    {
        path: "/mailing/new",
        name: "newMailing",
        components: {
            asideBtns: () => import("../components/blocks/new-client-aside-btns"),
            content: () => import("../components/pages/new-mailing")
        }
    },
    {
        path: "/mailings-items",
        name: "mailingsItems",
        components: {
            aside: "",
            asideBtns: "",
            content: () => import("../components/pages/mailings-items")
        }
    },
    {
        path: "/mailing-item/new",
        name: "newMailingItem",
        components: {
            asideBtns: "",
            content: () => import("../components/pages/new-mailing-item")
        }
    },
    {
        path: "/mailing-item/:id/edit",
        name: "editMailingItem",
        components: {
            asideBtns: "",
            content: () => import("../components/pages/edit-mailing-item")
        }
    }
];