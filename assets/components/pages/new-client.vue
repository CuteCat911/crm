<template>
    <div class="page box box--page">
        <div class="page__title-wrapper">
            <h1 class="page__title">Анкета нового клиента</h1>
            <new-client-row-btns></new-client-row-btns>
        </div>
        <edit-counterparty :data="client"></edit-counterparty>
    </div>
</template>

<script>

    import {mapState, mapMutations, mapActions} from "vuex";
    import {structures} from "../../js/modules/structures";

    import newClientRowBtns from "../blocks/new-client-row-btns";
    import editCounterparty from "../blocks/edit-counterparty";

    export default {
        name: "new-client-page",
        computed: {
            ...mapState("client", {
                client: state => state
            })
        },
        beforeMount() {

            this.setClientData(structures.structure("counterparty", {type: "client"}));
            this.setPreloaderStatus(false);

        },
        methods: {
            ...mapMutations({
                setPreloaderStatus: "preloader"
            }),
            ...mapActions("client", {
                setClientData: "setData"
            })
        },
        components: {
            newClientRowBtns,
            editCounterparty
        }
    }

</script>