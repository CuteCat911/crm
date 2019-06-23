<template>
    <div class="page">
        <mailings-sub-header></mailings-sub-header>
        <mailings-items-row-btns></mailings-items-row-btns>
        <div class="items-list items-list--mailing-items box">
            <preview-mailing-item v-for="mailingItem of mailingsItems"
                                  :key="mailingItem.id"
                                  :data="mailingsItemsData.get(mailingItem)"
            ></preview-mailing-item>
        </div>
    </div>
</template>

<script>

    import {mapState, mapMutations, mapActions} from "vuex";
    import {checkType} from "../../js/general/check-type";

    import mailingsSubHeader from "../blocks/mailings-sub-header";
    import mailingsItemsRowBtns from "../blocks/mailing-items-row-btns";
    import previewMailingItem from "../elements/preview-mailing-item";

    export default {
        name: "mailings-items-page",
        computed: {
            ...mapState("endpoints", {
                endpoint: state => state.mailingsItems
            }),
            ...mapState("mailingsItems", {
                mailingsItems: state => state.items,
                mailingsItemsData: state => state.itemsData,
                page: state => state.page,
                countOnPage: state => state.countOnPage
            })
        },
        beforeMount() {

            this.$root.getEndpointData({
                server: {
                    method: this.endpoint.method,
                    url: this.endpoint.url,
                    data: {
                        page: this.page,
                        countOnPage: this.countOnPage
                    }
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
            ...mapMutations("mailingsItems", {
                setMailingsItems: "items"
            }),
            ...mapActions("mailingsItems", {
                setMailingsItemsData: "setItemsData"
            }),
            setData(data) {

                if (!checkType(data, "object") || !checkType(data.data, "object")) {
                    if (DEV) console.error();
                    return false;
                }


                data = data.data;
                this.setMailingsItems(data.mailingsItems);
                this.setMailingsItemsData(data.mailingsItemsData);
                this.setPreloaderStatus(false);

            }
        },
        components: {
            mailingsSubHeader,
            mailingsItemsRowBtns,
            previewMailingItem
        }
    }

</script>