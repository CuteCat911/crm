<template>
    <row-btns>
        <row-btn title="Редактировать"
                 :link="{name: 'editClient', params: {id: $route.params.id}}"
        ></row-btn>
        <row-btn title="Добавить нового клиента"
                 :link="{name: 'newClient'}"
        ></row-btn>
        <row-btn title="Удалить"
                 :click-func="remove"
        ></row-btn>
        <row-btn title="Все клиенты"
                 :link="{name: 'clients'}"
        ></row-btn>
    </row-btns>
</template>

<script>

    import {btnsEvents} from "../../js/modules/btns-events";

    import rowBtns from "../mixins/row-btns";
    import rowBtn from "../mixins/row-btn";

    export default {
        name: "view-client-row-btns",
        components: {
            rowBtns,
            rowBtn
        },
        methods: {
            remove: btnsEvents.getEvent("removeClient")
        }
    }

</script>