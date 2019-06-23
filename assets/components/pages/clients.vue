<template>
    <div class="page page--clients">
        <clients-row-btns></clients-row-btns>
        <clients-pagination></clients-pagination>
        <div class="items-list items-list--clients box">
            <local-preloader v-if="preloader"
                             :show="preloader"
            ></local-preloader>
            <template v-else>
                <div class="items-list__empty-text" v-if="!clients.length">Нет клиентов</div>
                <div class="items-list__list" v-else>
                    <template v-if="displayType === 1">
                        <counterparty-wide v-for="id in clients"
                                           :key="id.id"
                                           type="client"
                                           :data="clientsData.get(id)"
                        ></counterparty-wide>
                    </template>
                    <template v-else-if="displayType === 2"></template>
                </div>
            </template>
        </div>
        <clients-pagination></clients-pagination>
    </div>
</template>

<script>

    import {mapState, mapMutations, mapActions} from "vuex";
    import {checkType} from "../../js/general/check-type";

    import clientsRowBtns from "../blocks/clients-row-btns";
    import clientsPagination from "../blocks/clients-pagination";
    import localPreloader from "../elements/local-preloader";
    import counterpartyWide from "../elements/counterparty-wide";

    export default {
        name: "clients-page",
        computed: {
            ...mapState("endpoints", {
                endpoint: state => state.clients
            }),
            ...mapState("clients", {
                clients: state => state.items,
                clientsData: state => state.itemsData,
                pages: state => state.pages,
                preloader: state => state.preloader,
                displayType: state => state.displayType,
                search: state => state.search
            })
        },
        beforeMount() {

            this.checkQuery();
            this.$root.getEndpointData({
                server: {
                    method: this.endpoint.method,
                    url: this.endpoint.url,
                    data: {
                        page: this.pages.current,
                        countOnPage: this.pages.countOn,
                        search: this.search
                    }
                },
                funcs: {
                    success: this.setData
                }
            });
            this.setSelected([]);

        },
        methods: {
            ...mapMutations({
                setPreloaderStatus: "preloader"
            }),
            ...mapMutations("clients", {
                setClients: "items",
                setSelected: "selected",
                setPagesData: "pages",
                setSearch: "search"
            }),
            ...mapActions("clients", {
                setClientsData: "setItemsData",
            }),
            setData(data) {

                if (!checkType(data, "object") || !checkType(data.data, "object")) {
                    if (DEV) console.error();
                    return false;
                }

                data = data.data;
                this.setPagesData({name: "total", value: data.totalPages});
                this.setClients(data.clients);
                this.setClientsData(data.clientsData);
                this.setPreloaderStatus(false);

            },
            checkQuery() {

                let {page, count, search} = this.$route.query;

                if (checkType(+page, "number")) this.setPagesData({name: "current", value: +page});
                if (checkType(+count, "number")) this.setPagesData({name: "countOn", value: +count});
                if (checkType(search, "string")) this.setSearch(search);

            }
        },
        components: {
            clientsRowBtns,
            clientsPagination,
            localPreloader,
            counterpartyWide
        }
    }

</script>