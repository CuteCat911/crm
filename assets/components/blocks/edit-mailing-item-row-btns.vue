<template>
    <row-btns>
        <row-btn title="Просмотр"></row-btn>
        <row-btn title="Сохранить"
                 :click-func="update"
        ></row-btn>
        <row-btn title="Сохранить и создать"></row-btn>
        <row-btn title="Удалить"></row-btn>
        <row-btn title="Отмена"></row-btn>
    </row-btns>
</template>

<script>

    import rowBtns from "../mixins/row-btns";
    import rowBtn from "../mixins/row-btn";
    import {btnsEvents} from "../../js/modules/btns-events";

    export default {
        name: "edit-mailing-item-row-btns",
        methods: {
            update: btnsEvents.getEvent("updateMailingItem")
        },
        components: {
            rowBtns,
            rowBtn
        }
    }

</script>