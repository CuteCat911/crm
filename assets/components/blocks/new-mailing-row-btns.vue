<template>
    <row-btns>
        <row-btn title="Сохранить"
                 :click-func="save"
        ></row-btn>
        <row-btn title="Сохранить и создать"></row-btn>
        <row-btn title="Отмена"
        ></row-btn>
    </row-btns>
</template>

<script>

    import {btnsEvents} from "../../js/modules/btns-events";

    import rowBtns from "../mixins/row-btns";
    import rowBtn from "../mixins/row-btn";

    export default {
        name: "new-mailing-row-btns",
        methods: {
            save: btnsEvents.getEvent("saveNewMailing")
        },
        components: {
            rowBtns,
            rowBtn
        }
    }

</script>