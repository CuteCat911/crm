<template>
    <row-btns>
        <row-btn title="Сохранить клиента"
                 :click-func="save"
        ></row-btn>
        <row-btn title="Сохранить и создать"
                 :click-func="saveAndCreate"
        ></row-btn>
        <row-btn title="Отмена"
                 :link="{name: 'clients'}"
        ></row-btn>
    </row-btns>
</template>

<script>

    import {btnsEvents} from "../../js/modules/btns-events";

    import rowBtns from "../mixins/row-btns";
    import rowBtn from "../mixins/row-btn";

    export default {
        name: "new-client-row-btns",
        methods: {
            save: btnsEvents.getEvent("saveNewClient"),
            saveAndCreate: btnsEvents.getEvent("saveAndCreateNewClient")
        },
        components: {
            rowBtns,
            rowBtn
        }
    }

</script>