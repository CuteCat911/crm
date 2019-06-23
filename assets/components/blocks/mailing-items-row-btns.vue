<template>
    <row-btns :box="true">
        <row-btn title="Запланировать новую рассылку"
                 :link="{name: 'newMailingItem'}"
        ></row-btn>
        <row-btn title="Удалить"
                 :disabled="checkDisabled"
        ></row-btn>
        <row-btn title="Редактировать"
                 :disabled="checkDisabled"
                 :click-func="editMailingsItems"
        ></row-btn>
    </row-btns>
</template>

<script>

    import {mapState} from "vuex";
    import {btnsEvents} from "../../js/modules/btns-events";

    import rowBtns from "../mixins/row-btns";
    import rowBtn from "../mixins/row-btn";

    export default {
        name: "mailing-items-row-btns",
        computed: {
            ...mapState("mailingsItems", {
                selected: state => state.selected
            }),
            checkDisabled() {
                return !this.selected.length;
            }
        },
        methods: {
            editMailingsItems: btnsEvents.getEvent("editMailingsItems")
        },
        components: {
            rowBtns,
            rowBtn
        }
    }

</script>