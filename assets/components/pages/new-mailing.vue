<template>
    <div class="page box box--page">
        <div class="page__title-wrapper">
            <h1 class="page__title">Новая рассылка</h1>
            <new-mailing-row-btns></new-mailing-row-btns>
        </div>
        <mailing-edit :data="mailing"></mailing-edit>
    </div>
</template>

<script>

    import {mapState, mapMutations, mapActions} from "vuex";
    import {structures} from "../../js/modules/structures";

    import newMailingRowBtns from "../blocks/new-mailing-row-btns";
    import mailingEdit from "../blocks/mailing-edit";

    export default {
        name: "new-mailing-page",
        computed: {
            ...mapState("mailing", {
                mailing: state => state
            })
        },
        beforeMount() {

            this.setMailingData(structures.structure("mailing"));
            this.setPreloaderStatus(false);

        },
        methods: {
            ...mapMutations({
                setPreloaderStatus: "preloader"
            }),
            ...mapActions("mailing", {
                setMailingData: "setData"
            })
        },
        components: {
            newMailingRowBtns,
            mailingEdit
        }
    }

</script>