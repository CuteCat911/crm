<template>
    <aside-btns>
        <aside-btn
                title="Добавить нового клиента"
                icon="plus"
                :link="{name: 'newClient'}"
        ></aside-btn>
        <aside-btn
                title="Удалить"
                icon="minus"
                :disabled="checkDisabled"
                :click-func="removeClients"
        ></aside-btn>
        <aside-btn
                title="Редактировать"
                icon="edit"
                :disabled="checkDisabled"
                :click-func="editClients"
        ></aside-btn>
    </aside-btns>
</template>

<script>

    import {mapState} from "vuex";
    import {btnsEvents} from "../../js/modules/btns-events";

    import asideBtns from "../mixins/aside-btns";
    import asideBtn from "../mixins/aside-btn";

    export default {
        name: "clients-btns",
        computed: {
            ...mapState("clients", {
                selected: state => state.selected
            }),
            checkDisabled() {
                return !this.selected.length;
            }
        },
        methods: {
            removeClients: btnsEvents.getEvent("removeClients"),
            editClients: btnsEvents.getEvent("editClients")
        },
        components: {
            asideBtns,
            asideBtn
        }
    }

</script>