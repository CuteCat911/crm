<template>
    <div class="page">
        <mailings-sub-header></mailings-sub-header>
        <mailings-types-row-btns></mailings-types-row-btns>
    </div>
</template>

<script>

    import {mapMutations} from "vuex";

    import mailingsSubHeader from "../blocks/mailings-sub-header";
    import mailingsTypesRowBtns from "../blocks/mailings-types-row-btns";

    export default {
        name: "mailings-types-page",
        beforeMount() {
            this.setPreloaderStatus(false);
        },
        methods: {
            ...mapMutations({
                setPreloaderStatus: "preloader"
            })
        },
        components: {
            mailingsSubHeader,
            mailingsTypesRowBtns
        }
    }

</script>