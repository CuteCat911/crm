<template>
    <aside-btns>
        <aside-btn title="Редактировать"
                   icon="edit"
                   :link="{name: 'editClient', params: {id: $route.params.id}}"
        ></aside-btn>
        <aside-btn title="Добавить нового клиента"
                   icon="plus"
                   :link="{name: 'newClient'}"
        ></aside-btn>
        <aside-btn title="Удалить"
                   icon="minus"
                   :click-func="remove"
        ></aside-btn>
        <aside-btn title="Все клиенты"
                   icon="cancel"
                   :link="{name: 'clients'}"
        ></aside-btn>
    </aside-btns>
</template>

<script>

    import {btnsEvents} from "../../js/modules/btns-events";

    import asideBtns from "../mixins/aside-btns";
    import asideBtn from "../mixins/aside-btn";

    export default {
        name: "view-client-aside-btns",
        components: {
            asideBtns,
            asideBtn
        },
        methods: {
            remove: btnsEvents.getEvent("removeClient")
        }
    }

</script>