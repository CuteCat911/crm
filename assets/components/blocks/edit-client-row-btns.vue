<template>
    <row-btns>
        <row-btn title="Просмотр"
                 :link="{name: 'viewClient', params: {id: $route.params.id}}"
        ></row-btn>
        <row-btn title="Сохранить"
                 :click-func="update"
        ></row-btn>
        <row-btn title="Сохранить и создать"></row-btn>
        <row-btn title="Удалить"
                 :click-func="remove"
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
        name: "edit-client-row-btns",
        methods: {
            update: btnsEvents.getEvent("updateClient"),
            remove: btnsEvents.getEvent("removeClient")
        },
        components: {
            rowBtns,
            rowBtn
        }
    }

</script>s