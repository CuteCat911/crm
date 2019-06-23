<template>
    <div class="page">
        <div class="box box--page">
            <div class="page__title-wrapper">
                <h1 class="page__title">Планирование новой рассылки</h1>
            </div>
            <new-mailing-item-row-btns></new-mailing-item-row-btns>
            <edit-mailing-item></edit-mailing-item>
        </div>
        <div class="box box--page">
            <mailing-item-counterparties-emails></mailing-item-counterparties-emails>
        </div>
    </div>
</template>

<script>

    import {mapState, mapMutations, mapActions} from "vuex";
    import {structures} from "../../js/modules/structures";

    import newMailingItemRowBtns from "../blocks/new-mailing-item-row-btns";
    import editMailingItem from "../blocks/edit-mailing-item";
    import mailingItemCounterpartiesEmails from "../blocks/mailing-item-counterparties-emails";

    export default {
        name: "new-mailing-item-page",
        computed: {
            ...mapState("mailingItem", {
                mailingItem: state => state
            })
        },
        beforeMount() {

            this.setMailingItemData(structures.structure("mailingItem"));
            this.setPreloaderStatus(false);

        },
        methods: {
            ...mapMutations({
                setPreloaderStatus: "preloader"
            }),
            ...mapActions("mailingItem", {
                setMailingItemData: "setData"
            })
        },
        components: {
            newMailingItemRowBtns,
            editMailingItem,
            mailingItemCounterpartiesEmails
        }
    }

</script>