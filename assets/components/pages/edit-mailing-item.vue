<template>
    <div class="page">
        <div class="box box--page">
            <div class="page__title-wrapper">
                <h1 class="page__title"></h1>
            </div>
            <edit-mailing-item-row-btns></edit-mailing-item-row-btns>
            <edit-mailing-item v-if="mailingItem.id"></edit-mailing-item>
        </div>
        <div class="box box--page">
            <mailing-item-counterparties-emails></mailing-item-counterparties-emails>
        </div>
    </div>
</template>

<script>

    import {mapState, mapMutations, mapActions} from "vuex";
    import {convertString} from "../../js/general/convert-string";
    import {checkType} from "../../js/general/check-type";
    import {structures} from "../../js/modules/structures";

    import editMailingItemRowBtns from "../blocks/edit-mailing-item-row-btns";
    import editMailingItem from "../blocks/edit-mailing-item";
    import mailingItemCounterpartiesEmails from "../blocks/mailing-item-counterparties-emails";

    export default {
        name: "edit-mailing-item-page",
        computed: {
            ...mapState("endpoints", {
                endpoint: state => state.editMailingItem
            }),
            ...mapState("mailingItem", {
                mailingItem: state => state
            })
        },
        beforeMount() {

            this.checkQuery();
            this.$root.getEndpointData({
                server: {
                    method: this.endpoint.method,
                    url: convertString(this.endpoint.url, this.$route.params)
                },
                funcs: {
                    success: this.setData
                }
            });

        },
        methods: {
            ...mapMutations({
                setPreloaderStatus: "preloader"
            }),
            ...mapMutations("mailingItem", {
                setEmailsCount: "emailsCount",
                setSearch: "search",
                setClientsPagesData: "clientsPages"
            }),
            ...mapActions("mailingItem", {
                setMailingItemData: "setData"
            }),
            setData(data) {

                if (!checkType(data, "object") || !checkType(data.data, "object")) {
                    if (DEV) console.error();
                    return false;
                }

                data = data.data;
                this.setMailingItemData(structures.structure("mailingItem", data.mailingItem));
                this.setPreloaderStatus(false);

            },
            checkQuery() {

                let {count, search, clientsPage} = this.$route.query;

                if (checkType(+count, "number")) this.setEmailsCount(+count);
                if (checkType(search, "string")) this.setSearch(search);
                if (checkType(+clientsPage, "number")) this.setClientsPagesData({name: "current", value: +clientsPage});

            }
        },
        components: {
            editMailingItemRowBtns,
            editMailingItem,
            mailingItemCounterpartiesEmails
        }
    }

</script>