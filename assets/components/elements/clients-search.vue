<template>
    <aside-search title="Поиск клиентов"
                  :value="search"
                  :search="searchFunc"
    ></aside-search>
</template>

<script>

    import {mapState, mapMutations, mapActions} from "vuex";

    import asideSearch from "../mixins/aside-search";
    import {checkType} from "../../js/general/check-type";
    import {setNewQuery} from "../../js/modules/set-new-query";

    export default {
        name: "clients-search",
        computed: {
            ...mapState("clients", {
                search: state => state.search,
                page: state => state.pages.current
            })
        },
        methods: {
            ...mapMutations("clients", {
                setSearch: "search",
                setPagesData: "pages"
            }),
            ...mapActions("clients", {
                setNewClients: "setNewClients"
            }),
            searchFunc(value) {

                if (!checkType(value, "string")) {
                    if (DEV) console.error();
                    return false;
                }

                this.setSearch(value);
                this.setPagesData({name: "current", value: 1});
                this.$router.push({
                    query: setNewQuery(this.$route.query, {
                        search: this.search,
                        page: this.page
                    })
                });
                this.setNewClients();

            }
        },
        components: {
            asideSearch
        }
    }

</script>