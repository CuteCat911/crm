<template>
    <counterparties-emails :emails-count="itemsCount"
                           :set-emails-count="setItemsCount"
                           :search="search"
                           :set-search="setItemsSearch"
    >
        <template slot="clients">
            <counterparty-emails title="Клиенты">

                <template slot="pagination">
                    <pages :current-page="clients.pages.current"
                           :total-pages="clients.pages.total ? clients.pages.total : 1"
                           :set-page="setClientsPage"
                    ></pages>
                </template>
                <template slot="empty-text" v-if="!clients.list.length">Нет клиентов</template>
                <template slot="list" v-else>
                    <local-preloader :show="clients.preloader"
                                     v-if="clients.preloader"
                    ></local-preloader>
                    <template v-else>
                        <counterparty-emails-item v-for="item in clients.list"
                                                  :key="item.id"
                                                  :data="clients.listData.get(item)"
                                                  :selected-emails="selectedEmails"
                                                  :set-email="setClientEmail"
                        >
                        </counterparty-emails-item>
                    </template>
                </template>

            </counterparty-emails>
        </template>
    </counterparties-emails>
</template>

<script>

    import {mapState, mapMutations, mapActions} from "vuex";
    import {checkType} from "../../js/general/check-type";
    import {setNewQuery} from "../../js/modules/set-new-query";

    import counterpartiesEmails from "../mixins/counterparties-emails";
    import counterpartyEmails from "../mixins/counterparty-emails";
    import pages from "../elements/pages";
    import localPreloader from "../elements/local-preloader";
    import counterpartyEmailsItem from "../mixins/counterparty-emails-item";

    export default {
        name: "mailing-item-counterparties-emails",
        computed: {
            ...mapState("mailingItem", {
                selectedEmails: state => state.selectedEmails.value,
                itemsCount: state => state.emailsCount,
                clients: state => state.clients,
                search: state => state.search
            })
        },
        methods: {
            ...mapMutations("mailingItem", {
                setEmailsCount: "emailsCount",
                setSearch: "search",
                setClientsPagesData: "clientsPages",
                addSelectedEmail: "addSelectedEmail",
                removeSelectedEmail: "removeSelectedEmail"
            }),
            ...mapActions("mailingItem", {
                setClientsEmails: "setClients"
            }),
            setItemsCount(count) {

                if (!checkType(count, "number")) {
                    if (DEV) console.error();
                    return false;
                }

                this.setEmailsCount(count);
                this.setClientsPagesData({name: "current", value: 1});
                this.$router.push({
                    query: setNewQuery(this.$route.query, {
                        count,
                        clientsPage: this.clients.pages.current
                    })
                });
                this.setClientsEmails();

            },
            setItemsSearch(value) {

                if (!checkType(value, "string")) {
                    if (DEV) console.error();
                    return false;
                }

                this.setSearch(value);
                this.setClientsPagesData({name: "current", value: 1});
                this.$router.push({
                    query: setNewQuery(this.$route.query, {
                        search: this.search,
                        clientsPage: this.clients.pages.current
                    })
                });
                this.setClientsEmails();

            },
            setClientsPage(page) {

                if (!checkType(page, "number")) {
                    if (DEV) console.error();
                    return false;
                }

                this.setClientsPagesData({name: "current", value: page});
                this.$router.push({
                    query: setNewQuery(this.$route.query, {
                        clientsPage: this.clients.pages.current
                    })
                });
                this.setClientsEmails();

            },
            setClientEmail(id) {

                if (!checkType(id, "number")) {
                    if (DEV) console.error();
                    return false;
                }

                this.selectedEmails.includes(id) ? this.removeSelectedEmail(this.selectedEmails.indexOf(id)) : this.addSelectedEmail(id);

            }
        },
        components: {
            counterpartiesEmails,
            counterpartyEmails,
            pages,
            localPreloader,
            counterpartyEmailsItem
        }
    }

</script>